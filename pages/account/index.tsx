import Header from '../../components/Header/Header';
import styles from "../../styles/account.module.scss"
import PersonIcon from '@mui/icons-material/Person';
import ListIcon from '@mui/icons-material/List';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from "next/link";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/app/store";
import { ChangeEvent, useEffect, useState } from "react";
export default function Account() {
    const data: any = useAppSelector((state: RootState) => state.login.data)

    const [input, setInput] = useState({ name: "", email: "", phone: "" })

    useEffect(() => {
        if (data) {
            setInput(input => ({ name: data.name, email: data.email, phone: data.address?.phone }))
        }

    }, [data])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setInput({
            ...input,
            [name]: value
        });
    }

    return (
        <>
            <Header></Header>
            <main>
                <section className={styles.account}>
                    <ul className={styles.account__list}>
                        <Link href={"/account"}><a><li><PersonIcon color="action" />Thông tin tài khoản</li></a></Link>
                        <Link href={"/order"}><a><li><ListIcon color="action" />Quản lí đơn hàng</li></a></Link>
                        <Link href={"/account/address"}><a><li><LocationOnIcon color="action" />Địa chỉ</li></a></Link>
                    </ul>
                    <div className={styles.account__information}>
                        <h6>Thông tin cá nhân</h6>
                        <div className={styles.account__information_sample}>
                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Họ tên</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" id="textName" name="name" value={input.name} onChange={(e) => handleChange(e)} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-5">
                                    <input type="email" className="form-control" id="inputEmail3" name="email" value={input.email} onChange={(e) => handleChange(e)} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">SĐT</label>
                                <div className="col-sm-5">
                                    <input type="tel" className="form-control" id="inputEmail3" name="phone" value={input.phone} onChange={(e) => handleChange(e)} />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Lưu</button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )

}