/* eslint-disable @next/next/no-img-element */
import { Carousel } from "react-bootstrap";
import styles from "../../styles/banner.module.scss";
export default function Banner() {
    return (
        <section className={styles.section_banner}>
            <div className={styles.main_banner}>
                <Carousel className={styles.carousel_banner}>
                    <Carousel.Item className={styles.carousel_item}>
                        <img
                            className="d-block "
                            src="/image/banner_2.jpg"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item className={styles.carousel_item}>
                        <img
                            className="d-block "
                            src="/image/banner_3.jpg"
                            alt="Second slide"
                        />
                    </Carousel.Item>
                </Carousel>
                <div className={styles.right_banner}>
                    <img
                        className="d-block"
                        src="/image/banner_right_1.jpg"
                        alt="banner right"

                    />
                    <img
                        className="d-block"
                        src="/image/banner_right_2.jpg"
                        alt="banner right"
                    />
                </div>
            </div>
        </section>
    )
}