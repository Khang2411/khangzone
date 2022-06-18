/* eslint-disable @next/next/no-img-element */
import styles from "../../styles/comment.module.scss"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons'

import { useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUpdateLikeComment, fetchUpdateUnlikeComment } from "../../redux/features/comment/commentSlice";
import CommentRating from "../Rating/CommentRating";
export default function CommentItem(props: any) {
    const inputUnlike = useRef(null);
    const dispatch = useAppDispatch();
    const comment = useAppSelector(state => state.comment.data)
    const [unlikes, setUnlikes] = useState(props.comment.unlikes)
    const [likes, setLikes] = useState(props.comment.likes)

    
    const handleClickUnlike = (): void => {
        let commentID = (inputUnlike.current as any).getAttribute("data-c")
        dispatch(fetchUpdateUnlikeComment(commentID)).unwrap()
            .then(() => {
                setUnlikes(unlikes + 1);
            })
    }
    const handleClickLike = (): void => {
        let commentID = (inputUnlike.current as any).getAttribute("data-c")
        dispatch(fetchUpdateLikeComment(commentID)).unwrap()
            .then(() => {
                setLikes(likes + 1);
            })
    }


    return (
        <div className={styles.commentArea}>
            <div className={styles.commentArea__userName}>
                <span style={{display:"inline-block"}}> <img src={props.comment.customer?.profile_photo_url} alt="avatar-profile" width={45} /></span>
                <span style={{ fontSize: "15px", padding: "12px 14px", fontWeight: "bold",display:"inline-block",verticalAlign:"top" }}>{props.comment.customer?.name}</span>
                <span><CommentRating star={props.comment.rating}></CommentRating></span>
            </div>
            <div className={styles.commentArea__content} dangerouslySetInnerHTML={{ __html:props.comment.content }}>
              
            </div>
            <div className={styles.commentArea__mood}>
                <div className={styles.commentArea__mood_like}>
                    <span onClick={() => handleClickLike()}> <FontAwesomeIcon icon={faThumbsUp} /> Thích {likes} </span>
                </div>
                <div className={styles.commentArea__mood_unlike}>
                    <span ref={inputUnlike} data-c={props.comment.id} onClick={() => handleClickUnlike()}> <FontAwesomeIcon icon={faThumbsDown} /> Kh.thích {unlikes}</span>
                </div>
            </div>
            {}
            <div className={styles.commentArea__userReply}>
                {/* <p>Ổn hả bạn</p> */}
            </div>
            <div className={styles.commentArea__adminReply}>
                <p>Ổn hả bạn</p>
            </div>
        </div>



    )
}