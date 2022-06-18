import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { fetchCommentByPage } from '../../redux/features/comment/commentSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import CommentItem from './CommentItem';
import { useRouter } from 'next/router'
import { RootState } from '../../redux/app/store';


function Items({ currentItems }: any) {
    return (
        <div className={""}>
            {currentItems && currentItems.map((item: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal, index: React.Key) => (
                <div key={index}>
                    <CommentItem comment={item} />
                </div>
            ))}
        </div>
    );
}
export default function CommentList() {
    const router = useRouter()

    // We start with an empty list of items.
    const dispatch = useAppDispatch();
    
    const star: any = useAppSelector((state: RootState) => state.comment.star)
    const comments = useAppSelector(state => state.comment.data)
    const last_page = useAppSelector(state => state.comment.last_page)
    const current_page = useAppSelector(state => state.comment.current_page)

    const page_count = last_page;
    const [currentItems, setCurrentItems] = useState([]);

    useEffect(() => {
        if (router.isReady) {
            let dataSend = {
                id: router.query.id,
                star:0,
                page: 1
            }
            dispatch(fetchCommentByPage(dataSend))
        }
    }, [dispatch, router.isReady, router.query.id])

    useEffect(() => {
        setCurrentItems(comments);
    }, [comments])
    useEffect(() => {
        if (router.isReady) {
            console.log(router.query.id)
        }
    }, [router.isReady, router.query.id])

    // Invoke when user click to request another page.
    const handlePageClick = (event: { selected: number; }) => {
        console.log(`User requested page number ${event.selected}`);

        if (router.isReady) {
            let dataSend = {
                id: router.query.id,
                star:star,
                page: event.selected + 1
            }
            dispatch(fetchCommentByPage(dataSend))
        }

    };


    return (
        <>
            <Items currentItems={currentItems} />
            {comments.length === 0 ? <h5 style={{textAlign:"center",padding:"2rem"}}>Chưa có đánh giá </h5> :
                <ReactPaginate
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={page_count}
                    previousLabel="<"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    forcePage={current_page - 1}
                    marginPagesDisplayed={undefined} />
            }
        </>
    );
}