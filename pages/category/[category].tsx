/* eslint-disable @next/next/no-img-element */

import styles from "../../styles/categoryFilter.module.scss"

import clsx from 'clsx';
import Banner from "../../components/HomePage/Banner";
import Filter from "../../components/Category/Filter";

import { Key, useEffect } from "react";
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ProductItem from "../../components/Product/ProductItem";
import { fetchProductByCategory, fetchProductByFilter } from "../../redux/features/category/categorySlice";
import Header from "../../components/Header/Header";
import { GetServerSideProps } from "next";

export default function CategoryDetail(props: any) {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const products = useAppSelector(state => state.category.products)

    useEffect(() => {
        let data = {
            cateid: router.query.cateid,
            producer: router.query.producer,
            price: router.query.price
        }
        // dispatch(fetchProductByFilter(data))

        if (router.isReady) {
            if (router.query.cateid && !router.query.producer && !router.query.price) {
                dispatch(fetchProductByCategory(router.query.cateid))
            }
            if (router.query.producer || router.query.price) {
                let data = {
                    cateid: router.query.cateid,
                    producer: router.query.producer,
                    price: router.query.price
                }
                dispatch(fetchProductByFilter(data))
            }

        }
    }, [dispatch, router]);
    const loadProducts = () => {
        return products.map((item: any, index: Key | null | undefined) => {
            return (
                <div key={index}>
                    <ProductItem product={item}></ProductItem>
                </div>
            )
        })
    }


    useEffect(() => {
        if (router.isReady) {
            console.log(router.query)
        }




    }, [router, router.isReady, router.query.cateid]);


    return (
        <>
            <Header></Header>
            <main>
                <Banner></Banner>
                <div className={clsx("mt-5", styles.category)}>
                    <div className={styles.category__container}>
                        <div className={styles.category__container_filter}>
                            <Filter></Filter>
                        </div>
                        <div className={styles.category__container_items}>
                            <div className={clsx("mt-3 mb-3", styles.sort)}>
                                <ul>
                                    <li><a href="#">Bán chạy</a></li>
                                    <li><a href="#">Giảm nhiều</a></li>
                                    <li><a href="#">Giá thấp đến cao</a></li>
                                    <li><a href="#">Giá cao đến thấp</a></li>
                                </ul>
                            </div>
                            <div className={styles.item}>
                                {loadProducts()}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
