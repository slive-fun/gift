import type { AppRouter } from './server/trpc/router'
import { createTRPCClient } from '@trpc/client'

export const client = createTRPCClient<AppRouter>({ url: '/trpc' })
