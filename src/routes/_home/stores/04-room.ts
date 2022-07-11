import type { Gift, GiftIdOnly } from '$lib/bili'
import { client } from '$lib/tprc-client'
import { derived, writable } from 'svelte/store'
import { orderGifts } from './03-order'

type State = {
  room: null | string
  result: null | GiftIdOnly[]
  err: null | Error
}
export const createRoom = () => {
  const { subscribe, update, set } = writable<State>({
    room: null,
    result: null,
    err: null,
  })
  const search = (room: string) => {
    if (!room) {
      set({ room: null, result: null, err: null })
      return
    }
    update((r) => {
      r.room = room
      return r
    })
    client
      .query('room_gifts', { room: room })
      .then((r) => {
        set({ room, result: r, err: null })
      })
      .catch((err) => {
        alert(`房间号有误\r\n err: ${err?.toString()}`)
        set({ room, result: null, err })
      })
  }
  // search('24393')
  return {
    subscribe,
    search,
  }
}

export const room = createRoom()

export const roomFilteredGifts = derived([orderGifts, room], ([d, f]) => {
  if (f.result === null) {
    return d
  }
  const m = d.reduce<{ [k: number]: Gift }>((t, item) => {
    t[item.id] = item
    return t
  }, {})
  const m1 = f.result.reduce((t, item) => {
    t[item.id] = true
    return t
  }, {} as { [k: number]: boolean })
  const gifts = d.filter((r) => {
    return m1[r.id] === true
  })
  return gifts
})
