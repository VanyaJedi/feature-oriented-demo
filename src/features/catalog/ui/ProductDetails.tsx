import { useEffect, useRef } from 'react'
import type { Product } from '../model'

type Props = {
    product: Product
    onAdd: (product: Product) => void
    onClose: () => void
}

export function ProductDetails({ product, onAdd, onClose }: Props) {
    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const dialog = dialogRef.current
        dialog?.showModal()
        return () => { dialog?.close() }
    }, [])

    return (
        <dialog
            ref={dialogRef}
            className="product-popup"
            aria-labelledby="product-popup-title"
            aria-describedby="product-popup-description"
            onCancel={onClose}
            onClick={event => {
                if (event.target === event.currentTarget) onClose()
            }}
        >
            <div className="product-popup-content">
                <button className="popup-close" type="button" aria-label="Закрыть просмотр товара" onClick={onClose} autoFocus>×</button>
                <div className={`product-visual product-visual--${product.id}`} aria-hidden="true"><span>{product.emoji}</span></div>
                <span className="product-category">{product.category}</span>
                <h2 id="product-popup-title">{product.title}</h2>
                <p id="product-popup-description">{product.description}</p>
                <div className="product-footer">
                    <strong>{product.price.toLocaleString('ru-RU')} ₽</strong>
                    <button type="button" onClick={() => { onAdd(product); onClose() }}>Добавить в заказ</button>
                </div>
            </div>
        </dialog>
    )
}
