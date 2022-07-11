import { writable, derived } from 'svelte/store'
import { giftConfig } from './00-base'

export enum CoinType {
  Gold = 'gold',
  Sliver = 'silver',
}
export const CoinTypeText = {
  [CoinType.Gold]: '金瓜子',
  [CoinType.Sliver]: '银瓜子',
}

export const filters = writable({
  keywords: null as null | string,
  coinType: CoinType.Gold as null | CoinType,
  price: {
    min: null as null | number,
    max: null as null | number,
  },
})

export const filteredGifts = derived(
  [giftConfig, filters],
  ([{ gifts: d }, filters]) => {
    if (filters.keywords !== null) {
      d = d.filter((gift) => {
        return gift.name.includes(filters.keywords as string)
      })
    }
    if (filters.price.min !== null) {
      const min = filters.price.min
      d = d.filter((gift) => gift.price >= min * 1e3)
    }
    if (filters.price.max !== null) {
      const max = filters.price.max
      d = d.filter((gift) => gift.price <= max * 1e3)
    }
    if (filters.coinType !== null) {
      const coinType = filters.coinType
      d = d.filter((gift) => {
        return gift.coin_type === coinType
      })
    }
    return d
  },
)
