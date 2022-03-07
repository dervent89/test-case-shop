import { NextApiRequest, NextApiResponse } from 'next'

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

    fetch(`${process.env.SHOP}/products.json`, requestOptions)
      .then(response => response.text())
      .then(result => {
        res.status(200).json(result)
      })
      .catch(error => {
        throw new Error(error)
      });

    
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler