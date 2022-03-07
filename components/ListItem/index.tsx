import React from 'react'
import Link from 'next/link'
import styles from './ListItem.module.scss'
import { Product } from '../../interfaces'

type Props = {
  product: Product
}

const ListItem = ({ product }: Props) => (
  <div className={styles.wrap}>
    <div className={styles.inner}>
        <figure className={styles.images}>
            <img className={styles.image} src={product.images[0].src} alt={product.title} />
        </figure>
        <div className={styles.content}>
            <h4 className={styles.title}>{product.title} {product.images.length}</h4>
            <h6 className={styles.vendor}>{product.vendor}</h6>
            <div className={styles.price}>{`${product.variants[0]['price']} TL`}</div>
        </div>
    </div>
    <Link href="/products/[id]" as={`/products/${product.id}`}>
        <a className={styles.btn}>İNCELE</a>
    </Link>
</div>
)

export default ListItem