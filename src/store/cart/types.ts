export interface ICartItem {
  productId: string
  quantity: number
}

export interface ICartState {
  items: ICartItem[]
}
