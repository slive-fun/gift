// copy from https://github.com/Nemo2011/bilibili_api/blob/main/bilibili_api/data/api

export interface Resp<T> {
  code: number
  message: string
  ttl: number
  data: T
}

/**
 * 不清楚的字段都用 deprecated 隐藏掉了
 */
export type Gift = {
  /**31217 */
  id: number
  /**星愿水晶球 */
  name: string
  /**100000 人民币价值 100 */
  price: number
  /**@deprecated */
  type: number
  coin_type: 'gold' | 'silver'
  /**背包礼物 */
  bag_gift: 1 | 0
  /**@deprecated */
  effect: number
  /**
   * @deprecated
   * 角标. 白银->爆奖
   * */
  corner_mark: string
  /**@deprecated */
  corner_background: string
  /**@deprecated */
  broadcast: 0
  /**@deprecated */
  draw: 0
  /**@deprecated */
  stay_time: 3
  /**@deprecated */
  animation_frame_num: 36
  /**like: 被施加了神奇魔法的水晶球 */
  desc: string
  /**通过红包玩法获得 */
  rule: string
  /**额外活动加成 */
  rights: string
  privilege_required: 0
  /**用这个字段就行. "https://s1.hdslb.com/bfs/live/791f28a0913833d23eab68205c0b8d2c66b29b2d.png" */
  img_basic: string
  /**
   * @deprecated
   * "https://i0.hdslb.com/bfs/live/791f28a0913833d23eab68205c0b8d2c66b29b2d.png"
   */
  img_dynamic: string
  /**
   * @deprecated
   * "https://i0.hdslb.com/bfs/live/469541dc40b9c0daad32886a5554ae3c77b5e71a.png"
   */
  frame_animation: string
  /**
   * @deprecated
   * "https://i0.hdslb.com/bfs/live/694fda21124dcac7052e62c721e9a2cf5899749c.gif"
   */
  gif: string
  /**
   * @deprecated
   * "https://i0.hdslb.com/bfs/live/0f8dd4dda2d0ff22bca99a4a2cef7ede37902bf2.webp"
   */
  webp: string
}

export type GiftConfigParams = {
  room_id?: string
  /**子分区 ID 可以不用填 */
  area_id?: number
  /**父分区 ID 可以不用填, 获取分区 ID 可使用 get_area_info 方法 */
  area_parent_id?: number
}

// https://api.live.bilibili.com/xlive/web-room/v1/giftPanel/giftConfig?platform=pc&source=live&room_id=23808442
const GiftConfigAPI =
  'https://api.live.bilibili.com/xlive/web-room/v1/giftPanel/giftConfig?platform=pc&source=live'
const CommonGiftAPI =
  'https://api.live.bilibili.com/xlive/web-room/v1/giftPanel/giftData?platform=pc&source=live'

export async function getGiftConfig(params: GiftConfigParams) {
  const body = params as { [k: string]: string }
  const u = new URL(GiftConfigAPI)
  for (const k in body) {
    u.searchParams.set(k, body[k])
  }
  const rinit: RequestInit = { method: 'GET' }
  const resp = await fetch(u, rinit).then((r) => r.json())
  return resp as Resp<{ list: Gift[] }>
}

export type RoomGiftsParams = {
  room_id: string
  /**子分区 ID 可以不用填 */
  area_id?: string
  /**父分区 ID 可以不用填, 获取分区 ID 可使用 get_area_info 方法 */
  area_parent_id?: string
}
export async function getRoomGifts(params: RoomGiftsParams) {
  let gifts: GiftIdOnly[] = []
  const [r1, room] = await Promise.all([
    getRoomCommonGifts(params),
    getInfoByRoom(params.room_id).then((r) => r.data.room_info),
  ])
  gifts = gifts.concat(r1.data.room_gift_list.gold_list)
  gifts = gifts.concat(r1.data.room_gift_list.silver_list)
  for (const tab_id of ['2', '3']) {
    const r = await getRoomSpecialGifts({
      room_id: params.room_id,
      tab_id: tab_id,
      area_parent_id: room.parent_area_id.toString(),
      area_id: room.area_id.toString(),
    })
    gifts = gifts.concat(r.data.list)
  }
  return gifts
}

export type GiftIdOnly = {
  id: number
  gift_id: number
}
type SpecialGiftsResp = { list: GiftIdOnly[] }
const SpecialGiftAPI =
  'https://api.live.bilibili.com//xlive/web-room/v1/giftPanel/tabRoomGiftList?platform=pc&source=live'
export async function getRoomSpecialGifts(params: {
  room_id: string
  tab_id: string
  /**子分区 ID 可以不用填 */
  area_id?: string
  /**父分区 ID 可以不用填, 获取分区 ID 可使用 get_area_info 方法 */
  area_parent_id?: string
}) {
  const body = params as { [k: string]: string }
  const u = new URL(SpecialGiftAPI)
  body.build = '1'
  body.tab_id = params.tab_id
  for (const k in body) {
    u.searchParams.set(k, body[k])
  }
  const rinit: RequestInit = { method: 'GET' }
  const resp = await fetch(u, rinit).then((r) => r.json())
  return resp as Resp<SpecialGiftsResp>
}

type CommonGiftsResp = {
  room_gift_list: {
    gold_list: GiftIdOnly[]
    silver_list: GiftIdOnly[]
  }
  tab_list: {
    tab_id: number
    tab_name: string
  }[]
}
export async function getRoomCommonGifts(params: RoomGiftsParams) {
  const body = params as { [k: string]: string }
  const u = new URL(CommonGiftAPI)
  for (const k in body) {
    u.searchParams.set(k, body[k])
  }
  const rinit: RequestInit = { method: 'GET' }
  const resp = await fetch(u, rinit).then((r) => r.json())
  return resp as Resp<CommonGiftsResp>
}

const GetInfoByRoomURL =
  'https://api.live.bilibili.com/xlive/web-room/v1/index/getInfoByRoom'
export type RoomInfo = {
  room_info: {
    area_id: number
    parent_area_id: number
  }
}
export async function getInfoByRoom(room_id: string) {
  const u = new URL(GetInfoByRoomURL)
  u.searchParams.set('room_id', room_id)
  const rinit: RequestInit = { method: 'GET' }
  const resp = await fetch(u, rinit).then((r) => r.json())
  return resp as Resp<RoomInfo>
}
