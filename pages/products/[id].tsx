import { GetServerSideProps } from 'next'

import { Product } from '../../interfaces'
import Layout from '../../components/Layout'
import ListDetail from '../../components/ListDetail'

type Props = {
  product?: Product
  errors?: string
}

const ProductDetail = ({ product, errors }: Props) => {
  if (errors) {
    return (
      <Layout title="Error">
        <div className='container'>
          <p>
            <span style={{ color: 'red' }}>Error:</span> {errors}
          </p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={`${product ? product.title : 'Product Detail'}`}>
      <div className='container'>
        {product && <ListDetail product={product} />}
      </div>
    </Layout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({params}) => {
  try {
    const id = params?.id
    
    const product:Product[] = await fetch(`${process.env.API}/api/products/detail`, {method: 'POST',body: JSON.stringify({id: id})}).then(res => res.json()).then(res => {
      return res.product
    })  

    return { props: { product } }
  } catch (err: any) {
    return { props: { errors: err.message } }
  }
}




export default ProductDetail
