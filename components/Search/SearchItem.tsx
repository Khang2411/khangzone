import Image from 'next/image'

import styles from '../../styles/header.module.scss'
import classNames from "classnames/bind"
import { useEffect } from 'react'
import Link from 'next/link'
let cx = classNames.bind(styles)
export default function SearchItem(props: any) {
    useEffect(() => {

    }, [props])

    return (
        <Link href={{
            pathname: props.searchItem.slug,
            query: { id: props.searchItem.id }
        }}>
            <a className={cx("search")} >
                <div className={cx("search__contain")}>
                    <div className={cx("search-img")}>
                        {props.searchItem.thumbnail ?
                            <Image
                                src={`${process.env.NEXT_PUBLIC_API_URL}` + props.searchItem.thumbnail}
                                alt="search" width={50}
                                height={50}
                                layout="fixed"
                            />
                            : ""}
                    </div>
                    <div className={cx("search-infor")}>
                        <p>
                            {props.searchItem.name}
                        </p>
                        <strong className={cx("price")}> {props.searchItem.price}</strong>
                    </div>

                </div>
            </a>
        </Link >
    )
}