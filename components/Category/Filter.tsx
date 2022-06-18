/* eslint-disable @next/next/no-img-element */
import styles from "../../styles/categoryFilter.module.scss"
import Slider from "react-slick";
import clsx from 'clsx';
import Link from "next/link";
import { Form } from "react-bootstrap";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../redux/hooks";
import { fetchProductByFilter } from "../../redux/features/category/categorySlice";

export default function Filter() {
    const router = useRouter();
    const [checked, setChecked] = useState(true)
    const dispatch = useAppDispatch()
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        let target = event.target;
        let value: any = target.value;
        let name: string = target.name;

        if (target.type === 'checkbox' && target.checked === true) {
            if (router.query[name] === undefined) {
                router.query[name] = "";
            } else {
                router.query[name] = router.query[name] + ","
            }
            router.push({
                query: { ...router.query, [name]: router.query[name] + value },
            })
        }
        else {
            // Nếu router.query[name] chỉ có 1 giá tri 
            if (router.query[name] === value) {
                router.push({
                    query: { ...router.query, [name]: (router.query[name] as any).replace(value, "") },
                })
            } else {
                router.push({
                    query: { ...router.query, [name]: (router.query[name] as any).replace("," + value, "") },
                })
                // Nếu Replace nhưng kq kh thay đổi 
                if ((router.query[name] as any).replace("," + value, "") === router.query[name]) {
                    router.push({
                        query: { ...router.query, [name]: (router.query[name] as any).replace(value + ",", "") },
                    })
                }

            }
        }
    }
    /* Xóa query khi router.query['producer'] không còn hay đang ở all*/
    useEffect(() => {
        if (router.query['producer'] === "" || router.query['producer']?.includes("all")) {
            delete router.query['producer'];
            router.push({
                query: { ...router.query }
            })
        }
        if (router.query['price'] === "" || router.query['price']?.includes("all")) {
            delete router.query['price'];
            router.push({
                query: { ...router.query }
            })
        }

    }, [router])

    /*   ------------   */

 


    return (
        <div className={styles.filter_container}>
            <div className={styles.filter_container__block}>
                <h5 className="mb-3">Hãng sản xuất</h5>
                <label>
                    <input
                        name="producer"
                        type="checkbox"
                        value="all"
                        checked={router.query.producer ? false : checked}
                        onChange={(event) => handleInputChange(event)}
                    />
                    Tất cả
                </label>

                <label>

                    <input
                        name="producer"
                        type="checkbox"
                        value="apple"
                        checked={router.query.producer?.includes("apple")}
                        onChange={(event) => handleInputChange(event)}
                    />
                    Apple
                </label>

                <label>

                    <input
                        name="producer"
                        type="checkbox"
                        value="asus"
                        checked={router.query.producer?.includes("asus")}
                        onChange={(event) => handleInputChange(event)}
                    />
                    Asus
                </label>

                <label>

                    <input
                        name="producer"
                        type="checkbox"
                        value="acer"
                        checked={router.query.producer?.includes("acer")}
                        onChange={(event) => handleInputChange(event)}
                    />
                    Acer
                </label>
            </div>
            <div className={styles.filter_container__block}>
                <h5 className="mb-3">Mức giá</h5>
                <label>
                    <input
                        name="price"
                        type="checkbox"
                        value="all"
                        checked={router.query.price ? false : checked}
                        onChange={(event) => handleInputChange(event)}
                    />
                    Tất cả
                </label>

                <label>

                    <input
                        name="price"
                        type="checkbox"
                        value="0-10000000"
                        checked={router.query.price?.includes("0-10000000")}
                        onChange={(event) => handleInputChange(event)}
                    />
                    Dưới 10 triệu
                </label>
                <label>

                    <input
                        name="price"
                        type="checkbox"
                        value="10000000-15000000"
                        checked={router.query.price?.includes("10000000-15000000")}
                        onChange={(event) => handleInputChange(event)}
                    />
                    Từ 10 - 15 triệu
                </label>

                <label>

                    <input
                        name="price"
                        type="checkbox"
                        value="15000000-20000000"
                        checked={router.query.price?.includes("15000000-20000000")}
                        onChange={(event) => handleInputChange(event)}
                    />
                    Từ 15 - 20 triệu
                </label>

                <label>

                    <input
                        name="price"
                        type="checkbox"
                        value="20000000-25000000"
                        checked={router.query.price?.includes("20000000-25000000")}
                        onChange={(event) => handleInputChange(event)}
                    />
                    Từ 20 - 25 triệu
                </label>
            </div>
        </div>
    )
}