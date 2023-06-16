export interface IData {
    name: string,
    category: string

}

export interface PIData {
    name: string,
    category: any,
    image?: string,
    price: number,
    description: string,
    id?:string,
    quantity?:number,
    _v?:number,
    product?:string,
    user?:string,
    _id?:string
  }

export interface ICart{
  product?:string,
  user?:string,
  _id?:string,
  _v?:number,
  quantity?:number | undefined,
  item:item[]

}

interface item{
  category: string,
  description: string,
  image?: string,
  name: string,
  price: number,
  _id?:string,
  _v?:number,
}

  export interface Icategory{
    category:string,
    name:string,
    _id:string,
    _v:number
  }