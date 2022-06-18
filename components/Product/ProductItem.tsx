/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "../../styles/product.module.scss"
import { useRouter } from "next/router"
import { useEffect } from "react";
import CommentRating from "../Rating/CommentRating";

export default function ProductItem(props: any) {
    const router = useRouter()

    return (
        <Link href={{
            pathname: "/" + props.product.slug + "/" + props.product.id,
            // query: { id: props.product.id }
        }}>
            <a className={styles.vertion} data-s="0">
                <div className="heightlabel">
                    <label className="installment" style={{ "background": "yellow" }}><b>Trả góp 0%</b></label>
                </div>
                <img src={`${process.env.NEXT_PUBLIC_API_URL}` + props.product.thumbnail} alt="promo" width={180} />
                <p className="text" style={{ color: "#FF7F50" }}>{props.product.name}</p>
                <CommentRating star={props.product.rating}></CommentRating>
                <div className={styles.price}>
                    <strong>
                        {props.product.promotional_price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.product.promotional_price) :
                            new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.product.price)}</strong>
                    <s>{props.product.promotional_price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.product.price) : ""}</s>
                    <i>{props.product.promotion_id ? props.product.promotion_id[0].percent + '%' : ""}</i>
                </div>
            </a>
        </Link>
    )
}