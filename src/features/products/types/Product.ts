export type Product = {
  id: number
  name: string
  description: string
  price: number
  stock: number
  category: string
  imageUrl: string
  createdByUser?: {
    id: number
    name: string
    email: string
  }
}
