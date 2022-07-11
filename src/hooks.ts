import { createTRPCHandle } from 'trpc-sveltekit'
import { appRouter } from '$lib/server/trpc/router'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  const response = await createTRPCHandle({
    url: '/trpc',
    router: appRouter,
    event,
    resolve: (req, opt) => {
      return resolve(req, { ...opt, ssr: false })
    },
  })

  return response
}
