import clsx from "clsx";
import Link from "next/link";
import { Key, useEffect, useState } from "react";
import CartItem from "../../components/Cart/CartItem";

import { RootState } from "../../redux/app/store";
import { fetchSendOrder, showCartItems } from "../../redux/features/cart/cartSlice";
import { fetchHomeProduct } from "../../redux/features/home product/homeProductSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useRouter } from 'next/router'

import styles from "../../styles/cart.module.scss"
import Header from "../../components/Header/Header";
export default function Cart() {
    const cartitems: any = useAppSelector((state: RootState) => state.cart)
    const data: any = useAppSelector((state: RootState) => state.login.data)
    const dispatch = useAppDispatch()

    const [address, setAddress]: any = useState(null)
    const [total, setTotal]: any = useState(0)



    const router = useRouter()

    useEffect(() => {
        dispatch(showCartItems())
    }, [dispatch])

    useEffect(() => {
        if (data.address) {
            setAddress(data.address)
        }else{
            setAddress("")
        }
    }, [data, data.address])

    useEffect(() => {
        let cartcost: any = localStorage.getItem('totalcost');
        if (cartcost) {
            setTotal(cartcost)
        }
    }, [dispatch])


    const showCartItem = () => {
        if (cartitems) {
            return Object.values(cartitems).reverse().map((item: any, index: Key | null | undefined) => {
                return (
                    <div className={styles.item} key={index}>
                        <CartItem product={item}></CartItem>
                    </div>
                )
            })
        }
    }
    // Sự kiện Đặt hàng
    const handleOrder = () => {

        const order = { items: Object.values(cartitems), user: data, total: total }
        if (address === null || address === "") {
            router.push("/account/address")
        } else {

            dispatch(fetchSendOrder(order))
        }
    }
    useEffect(() => {
        console.log(cartitems, data)
    }, [cartitems, data])

    return (
        <div>
            <Header></Header>
            <main>
                <section className={styles.cart}>
                    <div className={clsx(styles.cart__container)}>
                        <div className={styles.cart__container_name}>
                            <h5>Giỏ Hàng</h5>
                        </div>

                        <div className={styles.cart__container_customer}>
                            <div className={styles.list_item}>
                                {!cartitems || Object.keys(cartitems).length === 0 ? "" : <div className={styles.list_item__header}>
                                    <span></span>
                                    <span>Đơn giá</span>
                                    <span>Số lượng</span>
                                    <span>Thành tiền</span>
                                </div>}
                                {showCartItem()}

                            </div>
                            
                            <div className={styles.customer}>
                                {address ? <div className={styles.customer__information}>
                                    <div className={styles.customer__information_address}>
                                        <p className="heading">
                                            <span className="text">Địa chỉ nhận hàng</span>
                                            <Link href={"/account/address"} ><a>Thay đổi</a></Link>
                                        </p>
                                        <p className={styles.customer__information_name}>
                                            <b className="name">{data.name}</b>
                                            <b className="phone">{address.phone}</b>
                                        </p>
                                        <p className="address">{address.name}, {address.ward}, {address.district}, {address.region}</p>
                                    </div>

                                    <div className={styles.customer__information_total}>
                                        <div className="prices">
                                            <p className="temporary_price">
                                                <span className="prices__text">Tạm tính: </span>
                                                <span className="prices__value">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</span></p>
                                            <p className="prices__total">
                                                <span className="prices__text">Thành tiền: </span>
                                                <span className="prices_value_final" style={{ color: "rgb(254, 56, 52)", fontSize: "17px" }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div> : ""}
                                <button type="button" className={styles.customer__information_submit} onClick={() => handleOrder()}>Tiến hành đặt hàng</button>


                            </div>

                        </div>
                    </div>

                </section>
            </main>
        </div>
    )
}