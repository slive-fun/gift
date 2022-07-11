import JSZip from 'jszip'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import JSZipUtils from 'jszip-utils'
import { saveAs } from 'file-saver'
import type { Gift } from '$lib/bili'
const loadContent = (link: string) => {
  return new Promise((rl, rj) => {
    JSZipUtils.getBinaryContent(link, (err: any, data: any) => {
      if (err !== null) {
        return rj(err)
      }
      rl(data)
    })
  })
}

export async function createZip(gifts: Gift[], room: string) {
  const zip = new JSZip()
  const folder = zip.folder(room)
  const tasks = gifts.map(async (gift) => {
    const buf: any = await loadContent(gift.img_basic)
    folder?.file(`${gift.price / 1000}-${gift.name}`, buf)
    return
  })
  await Promise.all(tasks)
  zip.generateAsync({ type: 'blob' }).then((blob) => {
    saveAs(blob, room + '.zip')
  })
}
