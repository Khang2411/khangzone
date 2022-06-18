/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { Key, ReactChild, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { fetchCategory } from "../../redux/features/category/categorySlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import styles from "../../styles/category.module.scss"
import { useRouter } from 'next/router'


export default function HomeCategory() {
    const category = useAppSelector((state) => state.category.category)
    const dispatch = useAppDispatch()
    const router = useRouter()

    useEffect(() => {
        dispatch(fetchCategory())
    }, [dispatch]);



    // function Cl() {
    //     router.push({ pathname: "/category/laptop", query: { cateid: 1 } })

    // }
    const mapCate = () => {


        return (category.map((item: any, index: Key | null | undefined) => {
            return (
                <Link href={{ pathname: `/category/${(item.name)}`, query: { cateid: item.id } }} key={index} >
                    <a>
                        <div className={styles.section_cate__item} >
                            <img src={`${process.env.NEXT_PUBLIC_API_URL}` + item.img} alt="cate_item" width={65} height={65} />
                            <div className={styles.cate_item_name}><p>{item.name}</p></div>
                        </div>
                    </a>
                </Link>
            )
        })
        )
    }
    return (
        <section className={styles.section_cate}>
            <div className={styles.section_cate__container}>
                {mapCate()}
            </div>
        </section>
    )
}