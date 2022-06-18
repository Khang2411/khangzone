import React, { Key, useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";


// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

export default function ProductDetailThumbnail(props: any) {
    useEffect(() => {
        console.log(props.detailThumbnails)
    }, [props])

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const loadDetailThumnails = () => {
        if (props.detailThumbnails) {
            return props.detailThumbnails.map((item: any, index: Key | null | undefined) => {

                return (
                    <SwiperSlide key={index}>
                        <Image src={`${process.env.NEXT_PUBLIC_API_URL}` + item.path} width="100%" height="100%" layout="responsive" />
                    </SwiperSlide>

                )
            })
        }
    }
    return (
        <>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#666",
                    "--swiper-pagination-color": "#666",
                }}
                loop={false}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                <SwiperSlide>
                    {props.thumbnail ? <Image src={`${process.env.NEXT_PUBLIC_API_URL}` + props.thumbnail} width="100%" height="100%" layout="responsive" /> : ""}
                </SwiperSlide>
                {loadDetailThumnails()}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={false}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                <SwiperSlide>
                    {props.thumbnail ? <Image src={`${process.env.NEXT_PUBLIC_API_URL}` + props.thumbnail} width="100%" height="100%" layout="responsive" /> : ""}
                </SwiperSlide>
                {loadDetailThumnails()}
            </Swiper>
        </>
    );
}
