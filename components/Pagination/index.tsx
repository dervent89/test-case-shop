import React from 'react'
import Link from 'next/link';

import styles from './Pagination.module.scss'

type Props = {
    total: number,
    perView: number,
    searchTerm: string,
    page: number
}
const Pagination = ({searchTerm, total, perView, page}:Props) => {
    let paging:any = []
    const pageCount = Math.ceil(total / perView);

    for (var p = 1; p <= pageCount; p++) {
      paging.push(<li className={`${styles.paginationItem} ${page == p && styles.paginationItemActive}`} key={p}>
        <Link href={`/products/search/${searchTerm}?page=${p}`}>
          <a>{p}</a>
        </Link>
      </li>)
    }
    return (
        <ul className={styles.pagination}>
            {paging}
        </ul>
    )
}

export default Pagination