import type { Gift } from '$lib/bili'
import { client } from '$lib/tprc-client'
import { writable } from 'svelte/store'
import { LocalStorage } from 'ttl-localstorage'

const KeyOfGiftConfigCache = 'gift-config-cache'
type GiftConfigResp = {
  gifts: Gift[]
  loading: boolean
  err: Error | null
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
