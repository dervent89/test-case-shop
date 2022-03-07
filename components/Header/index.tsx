import React, {useState} from 'react'
import Link from 'next/link'
import styles from './Header.module.scss'
import { Product } from '../../interfaces'
import { useRouter } from 'next/router'

const Header = () => {
   const router = useRouter()
   const [searchTerm, setSearchTerm] = useState<string>('')
   const [searchResult, setSearchResult] = useState<Product[]>([])
   const [searchLoading, setSearchLoading] = useState<boolean>(false)
   const [searchActive, setSearchActive] = useState<boolean>(false)

   const searchHandle = async () => {
      if(searchTerm.length > 2){
         setSearchLoading(true)
         await fetch(`/api/products/search`,{method: 'POST',body: JSON.stringify({term: searchTerm, perView: 10, page: 0})})
               .then(res => res.json())
               .then(res => {
                  setSearchResult(res.products)
                  setSearchLoading(false)
                  searchOpen()
                  return true
               })
      }else{
         setSearchResult([])
         searchClose()
      }
   }
   const searchOpen = () => {
      setSearchActive(true)
   }
   const searchClose = () => {
      setSearchActive(false)
      setSearchLoading(false)
   }
   return (
      <>
         <header className={styles.header}>
            <div className='container'>
               <nav className={styles.nav}>
                  <div className={styles.logoWrap}>
                     <Link href="/">
                        <a className={styles.logo}>
                           TEST CASE
                        </a>
                     </Link>
                  </div>
                  <div className={`${styles.search} ${searchLoading && styles.searchLoading} ${searchActive && styles.searchActive}`}>
                     <input
                        type="text"
                        className={styles.searchInput}
                        placeholder='Arama..'
                        defaultValue={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => searchResult.length > 0 && searchOpen()}
                        onKeyPress={(e) => e.code === 'Enter' && searchHandle()}
                        onKeyUp={(e) => e.code !== 'Enter' && searchHandle()}
                     />
                     <button
                        className={styles.searchButton}
                        onClick={() => searchHandle()}
                     >ARA</button>
                     {searchActive && 
                        <div className={styles.searchResult}>
                           {searchResult.length > 0 ?
                              <>
                                 <ul className={styles.searchResultList}>
                                    {
                                       searchResult.map((product:Product,i:number) => {
                                          return (
                                             <li className={styles.searchResultListItem} key={i}>
                                                <Link href="/products/[id]" as={`/products/${product.id}`}>
                                                   <a className={styles.searchResultListItemLink}>
                                                      <figure>
                                                         <img src={product.images[0].src}/>
                                                      </figure>
                                                      <div>
                                                         <span>{product.title}</span>
                                                         <em>{product.vendor}</em>
                                                      </div>
                                                   </a>
                                                </Link>
                                             </li>
                                          )
                                       })
                                    }
                                 </ul>
                                 <Link href="/products/search/[term]" shallow={true} as={`/products/search/${searchTerm}`}>
                                    <a className='p-2 d-flex justify-content-center'>Tüm sonucu görmek için tıklayınız..</a>
                                 </Link>
                              </>
                              :
                              <div className='p-2'>Sonuç bulunamadı!</div>
                           }
                        </div>
                     }
                  </div>
                  {searchActive && <div className={styles.searchOverlay} onClick={() => searchClose()}></div>}
                  <ul className={styles.menu}>
                     <li className={styles.menuItem}>
                        <Link href="/">
                           <a className={`${styles.menuItemLink} ${router.pathname === '/' ? styles.menuItemLinkActive: ''}`}>Anasayfa</a>
                        </Link>
                     </li>
                     <li className={styles.menuItem}>
                        <Link href="/products">
                           <a className={`${styles.menuItemLink} ${router.pathname === '/products' ? styles.menuItemLinkActive: ''}`}>Ürünler</a>
                        </Link>
                     </li>
                  </ul>
               </nav>
            </div>
         </header>
      </>
   )
}

export default Header