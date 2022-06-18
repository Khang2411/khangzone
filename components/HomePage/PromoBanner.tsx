/* eslint-disable @next/next/no-img-element */
import styles from "../../styles/promoBanner.module.scss"
export default function PromoBanner() {
    return (
        <div className={styles.promo_banner}>
            <img src="/banner/promo_banner.png" alt="background_promo" width={1277}></img>
        </div>
    )
}