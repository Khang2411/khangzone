import styles from "../../styles/comment.module.scss"
import clsx from "clsx"
let cx = classNames.bind(styles)
import HoverRating from "../Rating/HoverRating"
import CommentList from "./CommentList"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { RootState } from "../../redux/app/store"
import { ChangeEvent, Key, MouseEvent, useEffect, useRef, useState } from "react"

import { fetchAddComment, fetchCommentByPage, pushComment, voteStar } from "../../redux/features/comment/commentSlice"
import { useRouter } from 'next/router'
import CheckIcon from '@mui/icons-material/Check';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import classNames from "classnames"
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';


export default function Comment() {
    const router = useRouter()

    const [state, setState] = useState({ comment: "" })
    const [validate, setValidate] = useState({ error: "" })
    const star: any = useAppSelector((state: RootState) => state.comment.star)
    const data: any = useAppSelector((state: RootState) => state.login.data)
    const comment = useAppSelector(state => state.comment.data)

    const dispatch = useAppDispatch()

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        setState({
            ...state,
            [name]: value
        });
    }
    const handleSend = () => {
        // for (var i = 0; i < comment.length; i++) {
        //     if (data.id === comment[i].customer_id) {
        //         alert("Bạn đã đánh giá sản phẩm này rồi")
        //         return
        //     }
        // }

        if (data === null || data === "") {
            alert("Bạn chưa đăng nhập")
            return
        }
        else if (state.comment === "") {
            alert("Vui lòng không bỏ trống nội dung đánh giá")
            return
        }
        else if (star === 0) {
            alert("Vui lòng chọn đánh giá của bạn về sản phẩm này")
            return
        } else if (multipleImage.imageBase64Array.length > 5) {  // Validate image Preview  > 5
            setValidate({ error: "Chỉ được up tối đa 5 hình" })
            return
        }
        else if (router.isReady) {
            let dataSend = {
                customer_id: data.id,
                content: state.comment,
                rating: star,
                customer:data,
                product_id:router.query.id,
                commentBase64:multipleImage.imageBase64Array
            }
            dispatch(fetchAddComment(dataSend)).unwrap().then((response:any) => {
                    dispatch(pushComment(response))
                })
        }

        if (multipleImage.imageBase64Array.length <= 5) {
            setValidate({ error: "" })
        }


    }

    // Filter By Star
    const handleFilter = (e: any) => {
        const div = e.currentTarget

        if (div.className === "comment_active__sXMUF") { // Thẻ Đang Có Active Nhấn lại thì xóa
            div.setAttribute('class', "")
            let dataSend = {
                id: router.query.id,
                star: 0
            }
            dispatch(fetchCommentByPage(dataSend)).unwrap().then(() => {
                dispatch(voteStar(0))
            })
            return
        }

        // Remove  All Active 
        const list = document.querySelectorAll("#myDIV");
        for (var i = 0; i < list.length; i++) {
            list[i].classList.remove(`${styles.active}`);
        }


        div.setAttribute('class', `${styles.active}`)

        // Lấy data-index để query

        if (router.isReady) {
            let dataSend = {
                id: router.query.id,
                star: div.getAttribute('data-index')
            }
            dispatch(fetchCommentByPage(dataSend)).unwrap().then(() => {
                dispatch(voteStar(div.getAttribute('data-index')))
            })
        }



    }
    // Preview Image
    const [multipleImage, setMultipleImage] = useState({ imageBase64Array: [], imagePreviewArray: [] })
    const uploadMultipleFiles = (e: ChangeEvent<HTMLInputElement>) => {
        var fileObj: any = [];
        var fileArray: any = [];
        fileObj.push(e.target.files)
        for (let i = 0; i < fileObj[0].length; i++) {
            fileArray.push(URL.createObjectURL(fileObj[0][i]))
        }
        var joined = multipleImage.imagePreviewArray.concat(fileArray); // chọn fil nối vô file sẵn có

        setMultipleImage({ ...multipleImage, imagePreviewArray: joined })
        readmultifiles(fileObj)
    }
    // Base 64
    function readmultifiles(files: string | any[]) {
        if (files) {
            for (var i = 0; i < files[0].length; i++) {
                var reader = new FileReader();
                var file = files[0][i];
                // console.log(file)
                reader.onload = function (file: any) {
                    // console.log(file.target.result)
                    multipleImage.imageBase64Array.push(file.target.result)
                };
                reader.readAsDataURL(file);
            }
        }

    }
    useEffect(() => {
        console.log(multipleImage.imageBase64Array)
    }, [multipleImage.imageBase64Array, multipleImage.imagePreviewArray])

    const hanleDeletePreview = (bob: any, i: Key | null | undefined) => {

        // Before, I delete Preview
        let arr = multipleImage.imagePreviewArray.filter(item => item !== bob)

        setMultipleImage({ ...multipleImage, imagePreviewArray: arr });
        // After, I deleted base64 
        multipleImage.imageBase64Array.splice(i as number, 1);
    }

    return (
        <section className={styles.comment}>
            <h5 className={styles.comment__title}>Đánh Giá & Nhận Xét Từ Khách Hàng</h5>
            <div className={styles.comment__container}>
                <div className={styles.comment__container_submitInput}>
                    <div><HoverRating></HoverRating></div>
                    <textarea placeholder="Nhận xét của bạn về sản phẩm này" className="form-control"
                        name="comment" value={state.comment} id="review_detail" rows={5} data-bv-field="comment" onChange={(e) => handleChange(e)}></textarea>
                    <button type="submit" className="btn btn-primary mb-3 mt-3 px-4 float-end" onClick={() => handleSend()}>Gửi</button>

                    <label htmlFor="img-upload"><span className={styles.input_image}><CameraAltIcon color="primary" /> Gửi ảnh</span></label>

                    <div className={styles.multiPreview} >
                        {multipleImage.imagePreviewArray.length > 0 ? (multipleImage.imagePreviewArray).map((bob: string | undefined, index: Key | null | undefined) => (
                            <div key={index} style={{ display: "inline-block", margin: "0.5rem" }}>
                                <Image src={bob} alt="preview" width="95" height="95" objectFit="cover" />
                                <CloseIcon onClick={() => hanleDeletePreview(bob, index)} />
                            </div>
                        )) : ""}
                    </div>

                    <input type="file" id="img-upload" accept="image/x-png, image/gif, image/jpeg" style={{ display: "none" }}
                        onChange={(e) => uploadMultipleFiles(e)} multiple>
                    </input>
                    <span style={{ color: "red" }}>{validate.error}</span>
                </div>
                <div className="clearfix"></div>
                <div className={styles.comment__container_filter}>
                    <div onClick={(e) => handleFilter(e)} id="myDIV" data-index="0" >
                        <span>
                            <CheckIcon color="success" fontSize="small" style={{ display: "none" }} />
                            Mới nhất
                        </span>
                    </div>
                    <div onClick={(e) => handleFilter(e)} id="myDIV" data-index="5"  >
                        <span>
                            <CheckIcon color="success" fontSize="small" style={{ display: "none" }} />
                            5
                        </span>
                    </div>
                    <div onClick={(e) => handleFilter(e)} id="myDIV" data-index="4" >
                        <span><CheckIcon color="success" fontSize="small" style={{ display: "none" }} />
                            4</span>
                    </div>
                    <div onClick={(e) => handleFilter(e)} id="myDIV" data-index="3" >
                        <span>
                            <CheckIcon color="success" fontSize="small" style={{ display: "none" }} />
                            3
                        </span>
                    </div>
                    <div onClick={(e) => handleFilter(e)} id="myDIV" data-index="2" >
                        <span>
                            <CheckIcon color="success" fontSize="small" style={{ display: "none" }} />
                            2
                        </span>
                    </div>
                    <div onClick={(e) => handleFilter(e)} id="myDIV" data-index="1" >
                        <span>
                            <CheckIcon color="success" fontSize="small" style={{ display: "none" }} />
                            1
                        </span>
                    </div>
                </div>
                <CommentList></CommentList>
            </div >
        </section >
    )
}