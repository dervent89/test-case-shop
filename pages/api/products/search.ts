import { NextApiRequest, NextApiResponse } from 'next'
import {Product} from '../../../interfaces'

type RequestOptions = {
  method: string,
  headers: Headers
}
type VarEnvType = {
  SHOP: string|undefined,
  TOKEN: string|undefined
}
const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const env:VarEnvType = {
      TOKEN: process.env.TOKEN,
      SHOP: process.env.SHOP
    }
    var myHeaders = new Headers();
    myHeaders.append("X-Shopify-Access-Token", env.TOKEN as string);

    var requestOptions:RequestOptions = {
      method: 'GET',
      headers: myHeaders
    };
    const reqBody = JSON.parse(_req.body)
    if(reqBody.term !== '' || reqBody.term !== null){
        const page = reqBody.page
        fetch(`${process.env.SHOP}/products.json`, requestOptions)
        .then(response => response.text())
        .then(result => {
            const response = JSON.parse(result)
            const perView = reqBody.perView
            const offset = page !== 0 ? (page - 1) * perView: page * perView
            const filteredData:Product[] = response.products.filter((filterItem:Product,i:number) => filterItem.title.toLowerCase().indexOf(reqBody.term.toLowerCase()) > -1)
            const pageData = filteredData.filter((filterItem:Product,i:number) => i >= offset && i < (offset + perView) && filterItem)
                
            const responeData = {
                products: pageData,
                page: page,
                total: filteredData.length
            }
            
            res.status(200).json(responeData)
        })
        .catch(error => {
            throw new Error(error)
        });
    }else{
        throw new Error('Arama boş bırakılamaz!')
    }
      
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler