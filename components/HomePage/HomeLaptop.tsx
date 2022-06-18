/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Key } from "react";
import styles from "../../styles/home.module.scss"
import ProductItem from "../Product/ProductItem";
export default function HomeLaptop(props: any) {
    const showHomeProduct = () => {
        if (props.items) {
            return props.items.map((item: any, index: Key | null | undefined) => {
                return (
                    <div className={styles.item} key={index}>
                        <ProductItem product={item}></ProductItem>
                    </div>
                )
            })
        }
    }
    return (
        <section className={styles.home_section}>
            <div className={styles.home_section__container}>
                <span>
                    <img src="/icon/promotional.png" alt="promo" width={50} />
                    <h5>Laptop Nổi Bật Nhất</h5>
                    <a>Xem thêm</a>
                </span>
                <div className={styles.home_section__container_listItem}>
                    {showHomeProduct()}
                </div>
            </div>
        </section>
    )
}