import type { Gift } from '$lib/bili'
import { client } from '$lib/tprc-client'
import { writable, readable, derived } from 'svelte/store'
import { LocalStorage } from 'ttl-localstorage'

export const name = writable({ w: 'xxx' })

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

export enum OrderBy {
  None,
  LowPrice,
  HighPrice,
}

const KeyOfGiftConfigCache = 'gift-config-cache'
type GiftConfigResp = {
  gifts: Gift[]
  loading: boolean
  err: Error | null
  cachedAt?: string
}
const defaultGiftConfig: GiftConfigResp = {
  gifts: [],
  loading: true,
  err: null,
}
function createGiftConfig() {
  const isExpired = !LocalStorage.keyExists(KeyOfGiftConfigCache)
  let init: GiftConfigResp = defaultGiftConfig
  if (!isExpired) {
    const gifts: Gift[] = LocalStorage.get(KeyOfGiftConfigCache)
    init = {
      gifts: gifts,
      loading: false,
      err: null,
    }
  }
  const { subscribe, set } = writable<GiftConfigResp>(init)
  if (isExpired) {
    client
      .query('gift_config', {})
      .then((list) => {
        return list.map((gift) => {
          return {
            id: gift.id,
            name: gift.name,
            img_basic: gift.img_basic,
            price: gift.price,
            coin_type: gift.coin_type,
          } as Gift
        })
      })
      .then((gifts) => {
        LocalStorage.put(KeyOfGiftConfigCache, gifts, 24 * 60 * 60)
        set({ gifts: gifts, loading: false, err: null })
      })
      .catch((err) => {
        set({ gifts: [], loading: false, err: err })
      })
  }
  return {
    subscribe,
  }
}

export const giftConfig = createGiftConfig()

export const filterdGifts = derived(
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

export const order = writable({
  price: OrderBy.None,
})

export const orderGifts = derived([order, filterdGifts], ([order, d]) => {
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

export const displayGifts = orderGifts
