import type { App } from 'vuepress'
import { watch } from 'chokidar'
import { getResolvedThemeConfig } from '../loadConfig/index.js'
import { prepareArticleTagColors } from './prepareArticleTagColor.js'
import { preparedBlogData } from './prepareBlogData.js'
import { prepareEncrypt } from './prepareEncrypt.js'
import { prepareSidebar } from './prepareSidebar.js'

export async function prepareData(
  app: App,
): Promise<void> {
  const { localeOptions, encrypt } = getResolvedThemeConfig()
  await Promise.all([
    prepareArticleTagColors(app),
    preparedBlogData(app, localeOptions, encrypt),
    prepareSidebar(app, localeOptions),
    prepareEncrypt(app, encrypt),
  ])
}

export function watchPrepare(
  app: App,
  watchers: any[],
): void {
  const pagesWatcher = watch('pages/**', {
    cwd: app.dir.temp(),
    ignoreInitial: true,
  })
  watchers.push(pagesWatcher)

  pagesWatcher.on('change', () => prepareData(app))
  pagesWatcher.on('add', () => prepareData(app))
  pagesWatcher.on('unlink', () => prepareData(app))
}
