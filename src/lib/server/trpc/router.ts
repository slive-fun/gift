import * as trpc from '@trpc/server'
import { z } from 'zod'
import Redis from 'ioredis'
import {
  getGiftConfig,
  getRoomCommonGifts,
  getRoomGifts,
  getRoomSpecialGifts,
} from '$lib/bili'
import type { Gift } from '$lib/bili'
const redis = new Redis({
  host: process.env['GIFT_REDIS_HOST'],
  keyPrefix: 'slive.gift.',
})

const minute = 60 * 1
const hour = 60 * minute
const day = 24 * hour

export type AppRouter = typeof appRouter
export const appRouter = trpc
  .router()
  .query('gift_config', {
    input: z.object({ room: z.string().default('') }),
    async resolve(req): Promise<Gift[]> {
      const key = `gift-config-of-${req.input.room}`
      const r = await redis.get(key)
      if (r !== null) {
        return JSON.parse(r)
      }
      const resp = await getGiftConfig({ room_id: req.input.room })
      const gifts = resp.data.list.sort((a, b) => a.id - b.id)
      await redis.setex(key, 1 * day, JSON.stringify(gifts))
      return gifts
    },
  })
  .query('room_gifts', {
    input: z.object({ room: z.string() }),
    async resolve(req) {
      const key = `gift-gifts-of-${req.input.room}`
      const r = await redis.get(key)
      if (r !== null) {
        return JSON.parse(r)
      }
      const resp = await getRoomGifts({ room_id: req.input.room })
      await redis.setex(key, 1 * day, JSON.stringify(resp))
      return resp
    },
  })
