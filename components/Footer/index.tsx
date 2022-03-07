import React from 'react'
import Link from 'next/link'
import styles from './Footer.module.scss'
import { useRouter } from "next/router";

const Footer = () => {
   const router = useRouter()
   return (
      <header className={styles.footer}>
         <div className='container'>
            Hello, Created By MKD 👋
         </div>
      </header>
   )
}

export default Footer