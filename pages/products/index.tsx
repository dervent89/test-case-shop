import { FC } from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

import { Product } from '../../interfaces'
import Layout from '../../components/Layout'
import List from '../../components/List'

const Products:FC<{products:Product[]}> = ({ products }) => (
  <Layout title="Ürünler">
    <div className="container">
      <h1 className='mt-4 mb-4'>Ürünler</h1>
      <List products={products} />
    </div>
  </Layout>
)

export const getServerSideProps: GetServerSideProps = async () => {
  const products:Product[] = await fetch(`${process.env.API}/api/products`).then(res => res.json()).then(res => {
    return res.products
  })
  return { props: { products } }
}

export default Products