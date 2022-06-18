import styles from "../../styles/account.module.scss"
import PersonIcon from '@mui/icons-material/Person';
import ListIcon from '@mui/icons-material/List';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/app/store";
import Header from "../../components/Header/Header";
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function Address() {
    const [show, setShow] = useState(false);
    const [address, setAddress]: any = useState(null)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const data: any = useAppSelector((state: RootState) => state.login.data)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (data.address) {
            console.log(data.address.name)
            setAddress(data.address)
        }
    }, [data, data.address])

    return (
        <>

            <Header></Header>
            <main>
                <section className={styles.account}>
                    <ul className={styles.account__list}>
                        <Link href={"/account"}><a><li><PersonIcon color="action" />Thông tin tài khoản</li></a></Link>
                        <Link href={"/order"}><a><li><ListIcon color="action" />Quản lí đơn hàng</li></a></Link>
                        <Link href={"/address"}><a><li><LocationOnIcon color="action" />Địa chỉ</li></a></Link>
                    </ul>
                    <div className={styles.account__information}>
                        <div className={styles.account__information_header}>
                            <h6>Địa chỉ của tôi</h6>
                            <Button variant="primary" onClick={handleOpen}>
                                + Thêm địa chỉ mới
                            </Button>

                        </div>
                        {address ? <div className={styles.account__information_sample}>
                            <div className={styles.address}>
                                <div>
                                    <div><span style={{ fontWeight: "bolder" }}>Nguyễn Hoàng Khang</span></div>
                                    <div><span style={{ color: "rgb(120, 120, 120)" }}>Địa chỉ: </span><span>{address.name}, {address.ward}, {address.district}, {address.region}</span></div>
                                    <div><span style={{ color: "rgb(120, 120, 120)" }}>SĐT: </span><span>{address.phone}</span></div>
                                </div>
                                <div>
                                    <button>Thiết lập mặc định</button>
                                </div>

                            </div>
                        </div> : ""}

                    </div>
                </section>
            </main>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Thêm địa chỉ
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </>

    )
}