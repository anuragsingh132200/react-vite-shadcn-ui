export type Godown = {
  id: string
  name: string
  parent_godown: string | null
  children?: Godown[]
  items?: Item[]
}

export type Item = {
  item_id: string
  name: string
  quantity: number
  category: string
  price: number
  status: string
  godown_id: string
  brand: string
  attributes: Record<string, any>
  image_url: string
}
