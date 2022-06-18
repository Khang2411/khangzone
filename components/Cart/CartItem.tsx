import Link from "next/link";
import styles from "../../styles/cart.module.scss"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { addIncart, deleteCartItems, subtractIncart } from "../../redux/features/cart/cartSlice";
import { useAppDispatch } from "../../redux/hooks";

export default function CartItem(props: any) {
    const dispatch = useAppDispatch()

    const handleDelete = () => {
        dispatch(deleteCartItems(props.product.id))
    }
    const handleAdd = () => {
        dispatch(addIncart(props.product.id))

    }
    const handleSubtract = () => {
        dispatch(subtractIncart(props.product.id))
    }
    return (
        <>
            <div className={styles.cart_item}>
                <Link href={{
                    pathname: props.product.slug,
                    query: { id: props.product.id }
                }}>
                    <a className={styles.cart_item__name}>
                        <div >
                            <span>
                                <img src={`${process.env.NEXT_PUBLIC_API_URL}` + props.product.thumbnail} alt="promo" width={120} />
                                <p className="text" style={{ color: "#FF7F50" }}>{props.product.name}</p>
                            </span>
                        </div>
                    </a>
                </Link>
                <div className={styles.cart_item__price}>
                    <strong>
                        {props.product.promotional_price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.product.promotional_price)

                            : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.product.price)}
                    </strong>

                    {props.product.promotional_price ? <s className="crossprice">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.product.price)}</s> : ""}
                </div>
                <div className={styles.cart_item__quantity}>
                    <span> <AddCircleIcon color="action" fontSize="large" onClick={() => handleAdd()} />{props.product.incart} <RemoveCircleIcon color="action" fontSize="large" onClick={() => handleSubtract()} /></span>
                </div>
                <div className={styles.cart_item__final_price}>
                    <span>  <strong>
                        {props.product.promotional_price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.product.promotional_price*props.product.incart)
                            : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.product.price*props.product.incart)}
                    </strong></span>
                </div>
                <div className={styles.cart_item__delete}>
                    <span><DeleteIcon color="action" fontSize="large" onClick={() => handleDelete()} /></span>
                </div>
            </div>
        </>
    )
}