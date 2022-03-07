import * as React from 'react'
import ListItem from './ListItem'
import { Product } from '../interfaces'

type Props = {
  products: Product[]
}

const List = ({ products }: Props) => {
  return (  
    <div className='row'>
      {products.map((product) => (
        <div className='col-md-4 col-6 g-0 g-md-4' key={product.id}>
          <ListItem product={product} />
        </div>
      ))}
    </div>
  )
}

export default List