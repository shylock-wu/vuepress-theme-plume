/**
 * @[pdf](/xxx)
 * @[pdf 1](/xxx)
 * @[pdf 1 no-toolbar width="100%" height="600px" zoom="1" ratio="1:1"](/xxx)
 */
import { path } from 'vuepress/utils'
import type { PluginWithOptions } from 'markdown-it'
import type { PDFTokenMeta } from '../../shared/pdf.js'
import { resolveAttrs } from '../utils/resolveAttrs.js'
import { parseRect } from '../utils/parseRect.js'
import { createRuleBlock } from '../utils/createRuleBlock.js'

export const pdfPlugin: PluginWithOptions<never> = (md) => {
  createRuleBlock<PDFTokenMeta>(md, {
    type: 'pdf',
    syntaxPattern: /^@\[pdf(?:\s+(\d+))?(?:\s+([^]*?))?\]\(([^)]*?)\)/,
    meta([, page, info = '', src = '']) {
      const { attrs } = resolveAttrs(info)
      return {
        src,
        page: +page || 1,
        noToolbar: Boolean(attrs.noToolbar ?? false),
        zoom: +attrs.zoom || 50,
        width: attrs.width ? parseRect(attrs.width) : '100%',
        height: attrs.height ? parseRect(attrs.height) : '',
        ratio: attrs.ratio ? parseRect(attrs.ratio) : '',
        title: path.basename(src || ''),
      }
    },
    content({ title, src, page, noToolbar, width, height, ratio, zoom }) {
      return `<PDFViewer src="${src}" title="${title}" :page="${page}" :no-toolbar="${noToolbar}" width="${width}" height="${height}" ratio="${ratio}" :zoom="${zoom}" />`
    },
  })
}
