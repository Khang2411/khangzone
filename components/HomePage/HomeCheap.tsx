// /* eslint-disable @next/next/no-img-element */

import styles from "../../styles/slider.module.scss"
import clsx from 'clsx';
import Link from "next/link";
import ProductItem from "../Product/ProductItem";
import { Key } from "react";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function HomeCheap(props: any) {
    const showHomeProduct = () => {
        if (props.items) {
            return props.items.map((item: any, index: Key | null | undefined) => {
                return (
                    <div className={styles.swiper} key={index}>
                        <SwiperSlide><ProductItem product={item}></ProductItem></SwiperSlide>
                    </div>
                )
            })
        }
    }
    return (
        <>
            <Swiper style={{backgroundColor:"#fff"}}
                slidesPerView={5}
                spaceBetween={30}
                slidesPerGroup={5}
                loop={true}
                loopFillGroupWithBlank={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {showHomeProduct()}
            </Swiper>
        </>
    );
}
