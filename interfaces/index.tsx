export type User = {
    id: number
    name: string
}

type VarEnvType = {
    SHOP: string|undefined,
    TOKEN: string|undefined
}
type ProductImage = {
    src: string
}
type ProductVariants = {
    id: number,
    title: string,
    price: string
}
type ProductOptions = {
    id: number,
    name: string,
    position: number,
    values: []
}
export type Product = {
    id: number,
    title: string,
    images: ProductImage[],
    vendor: string,
    variants: ProductVariants[],
    body_html: string,
    options: ProductOptions[]
}