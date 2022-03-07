import { FC } from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

import { Product } from '../../../interfaces'
import Layout from '../../../components/Layout'
import List from '../../../components/List'
import Pagination from '../../../components/Pagination/index'

const perView:number = 10
const Products:FC<{response:{products:Product[],total: number}, searchTerm:string, page:number}> = ({ response, searchTerm ,page }) => {
  return (
    <Layout title={`"${searchTerm}" ilgili arama sonucu (${response.total})`}>
      <div className="container">
        <h1 className='mt-4 mb-4'>{`"${searchTerm}"`} ilgili arama sonucu ({response.total})</h1>
        <Pagination total={response.total} perView={perView} page={page} searchTerm={searchTerm}/>
        
        <List products={response.products} />
        
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({params,query}) => {
    try {
        const searchTerm = params?.term
        const page = query?.page || 1
        const response:Product[] = await fetch(`${process.env.API}/api/products/search`, {method: 'POST',body: JSON.stringify({term: searchTerm, perView: perView, page: page})}).then(res => res.json()).then(res => {
          return res
        })
        return { props: { response, searchTerm, page } }
    } catch (err: any) {
        return { props: { errors: err.message } }
    }
}

export default Products