import { writable, derived } from 'svelte/store'
import { filteredGifts } from './02-filter'

export enum OrderBy {
  None,
  LowPrice,
  HighPrice,
}

export const order = writable({
  price: OrderBy.None,
})

export const orderGifts = derived([order, filteredGifts], ([order, d]) => {
  // price
  if (order.price === OrderBy.LowPrice) {
    d = d.sort((a, b) => {
      return a.price < b.price ? -1 : 1
    })
  }
  if (order.price === OrderBy.HighPrice) {
    d = d.sort((a, b) => {
      return a.price > b.price ? -1 : 1
    })
  }
  if (order.price === OrderBy.None) {
    d = d.sort((a, b) => {
      return a.id - b.id
    })
  }
  return d
})
