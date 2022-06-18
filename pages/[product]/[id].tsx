/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import styles from "../../styles/detail.module.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { faGift } from '@fortawesome/free-solid-svg-icons'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import { useEffect, useState } from "react";
import { useRouter } from "next/router"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { fetchProduct } from "../../redux/features/product/productSlice"

import Comment from "../../components/Comment/Comment"
import Header from "../../components/Header/Header"
import ProductDetailThumbnail from "../../components/Product/ProductDetailThumbnail"
export default function ProductDetail() {
    const [style, setStyle] = useState({});
    const [hide, setHide] = useState(true);

    const router = useRouter()

    const product: any = useAppSelector((state) => state.product)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (router.isReady) {
            dispatch(fetchProduct((router.query.id)))
        }

    }, [dispatch, router])

    useEffect(() => {
        console.log(router)
    }, [router])

    // Tính tổng tiền
    const totalCost = (products: any) => {

        if (products.promotional_price) {   /*nếu có giá km thì giá km sẽ dc gán cho giá gốc */
            products.price = products.promotional_price;

        }
        let cartcost: any = localStorage.getItem('totalcost');

        if (cartcost !== null) {
            cartcost = parseInt(cartcost);
            localStorage.setItem("totalcost", cartcost + products.price);
        } else {
            localStorage.setItem("totalcost", products.price);
        }


    }// end hàm totalcost;
    const handleBuy = () => {
        const d: any = new Date();
        const dateTime = Date.parse(d);
        let cartitems: any = localStorage.getItem('cart')
        console.log(cartitems)
        cartitems = JSON.parse(cartitems)
        let productCart = { ...product, incart: 1 }
        console.log(productCart)

        let checkIncart = false
        if (cartitems) {
            Object.keys(cartitems).map((key) => {
                if (cartitems[key].id === productCart.id) {
                    cartitems[key].incart += 1
                    checkIncart = true; // Dùng trigger để check nếu nó = false nghĩa là kh + incart => Sp chưa có trong Storage
                }
            })
        }

        if (cartitems) {
            if (checkIncart === false) {
                cartitems = {
                    ...cartitems,
                    [dateTime]: productCart
                }
            }

        } else {
            cartitems = {
                [dateTime]: productCart,
            }
        }
        localStorage.setItem("cart", JSON.stringify(cartitems));
        totalCost(productCart)

    }

    // Btn More
    const handleClickMore = () => {
        if (hide === true) {
            setStyle({ height: "unset" })
            setHide(!hide)
        } else {
            setStyle({}) // Trả lại height nguyên bản là 500px
            setHide(!hide)
        }

    }

    return (
        <>
            <Header></Header>
            <main className={styles.detail}>
                <div className={styles.detail__container}>
                    <div className={styles.detail__container_productName}>
                        <div className={styles.detail__container_productName_name} id="name" data-vt="">
                            <h3>{product.name}</h3>
                            <span>
                                <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                                <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                            </span>
                        </div>
                        {/* <div className="img">
                            <img src={`${process.env.NEXT_PUBLIC_API_URL}` + product.thumbnail} width="380" height="380" />
                        </div> */}
                        <ProductDetailThumbnail thumbnail={product.thumbnail} detailThumbnails={product.detail_thumbnails}></ProductDetailThumbnail>
                    </div>
                    <div className={styles.detail__container_productPrice}>
                        <div className="price">
                            <h5> Giá Bán</h5>
                            <div className="area_price">
                                <strong>
                                    {product.promotional_price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.promotional_price)

                                        : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                </strong>

                                {product.promotional_price ? <s className="crossprice">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</s> : ""}
                            </div>
                        </div>
                        <div className={styles.productPrice_promo}>
                            <h5>Khuyến Mãi </h5>
                            <h6> <FontAwesomeIcon icon={faCheck} color={"green"} />&nbsp;Pin sạc dự phòng giảm 30% khi mua kèm. </h6>
                            <h6> <FontAwesomeIcon icon={faCheck} color={"green"} />&nbsp;Mua Đồng hồ thời trang giảm 40%.</h6>

                        </div>

                        <a id="mua-ngay" className={styles.productPrice_buyNow} data-type="<?= $products['sp_id'] ?>"
                            onClick={() => handleBuy()}><b>MUA NGAY</b><br /><span>Giao hàng tận nơi hoặc nhận tại siêu thị</span></a>


                    </div>

                    <div className={styles.detail__container_productAttention}>

                        <p> <FontAwesomeIcon icon={faCalendarCheck} color="#006400" />
                            &nbsp;Sản phẩm được bảo hành 12 tháng tại tất cả các chi nhánh.</p>
                        <p> <FontAwesomeIcon icon={faGift} color="#006400" />&nbsp;Sản phẩm tặng kèm bảo hành 12 tháng theo sản phẩm chính.</p>
                        <p> <FontAwesomeIcon icon={faReply} color="#006400" />&nbsp;Lỗi là đổi mới trong 1 tháng tại các chi nhánh trên toàn quốc.</p>

                    </div>

                    {/* bai viet noi dung  */}
                    <div className={styles.detail__container_productContent}>

                        <div className={styles.detail__container_content} style={style}>
                            <div dangerouslySetInnerHTML={{ __html: product.post }} />
                            <div className={styles.gradient} style={style}></div>
                        </div>
                        <a className={styles.btn_more} data-view-id="pdp_view_description_button" onClick={() => handleClickMore()}>{hide === true ? 'Xem Thêm Nội Dung' : 'Rút Gọn Nội Dung'}</a>
                    </div>

                    <div className={styles.detail__container_productIntroduce}>
                        {/* thong so ky thuat */}
                        <div className="specifications">
                            <ul className="parameter ">
                                <li>
                                    <span>Màn hình:</span>
                                    <div>18.5 inch Full HD</div>
                                </li>
                                <li>
                                    <span>Hệ điều hành:</span>
                                    <div>Window 10 Professor</div>
                                </li>
                                <li>
                                    <span>Cpu:</span>
                                    <div>Intel Core I5 Coffee House</div>
                                </li>
                                <li>
                                    <span>Ram:</span>
                                    <div>16 Gb bus 2466</div>
                                </li>
                                <li>
                                    <span>Ổ cứng:</span>
                                    <div>SSD 500GB</div>
                                </li>
                                <li>
                                    <span>Card VGA:</span>
                                    <div>Gtx 1050Ti</div>
                                </li>
                                <li>
                                    <span>Tích hợp:</span>
                                    <div>Wifi HDMI</div>
                                </li>
                                <li>
                                    <span>Trọng lượng:</span>
                                    <div>2.3kg</div>
                                </li>
                                <li>
                                    <span>Dung lượng pin:</span>
                                    <div>4 cell</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Comment></Comment>
            </main>

        </>
    )
}