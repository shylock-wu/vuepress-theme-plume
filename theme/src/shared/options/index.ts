import type { LocaleConfig } from 'vuepress/shared'
import type { AutoFrontmatter } from '../auto-frontmatter.js'
import type { PlumeThemeLocaleData } from './locale.js'
import type { PlumeThemePluginOptions } from './plugins.js'
import type { PlumeThemeEncrypt } from './encrypt.js'

export interface PlumeThemeOptions extends PlumeThemeLocaleOptions {
  /**
   * 对主题内部使用的插件进行配置
   * @deprecated 配置项迁移至 `plugins`
   */
  themePlugins?: PlumeThemePluginOptions

  /**
   * 对主题内部使用的插件进行配置
   */
  plugins?: PlumeThemePluginOptions

  /**
   * 部署站点域名。
   * 用于生成 sitemap、 seo等。
   *
   */
  hostname?: string

  /**
   * 加密配置
   */
  encrypt?: PlumeThemeEncrypt

  /**
   * 自定义主题配置文件路径
   */
  configFile?: string

  autoFrontmatter?: false | Omit<AutoFrontmatter, 'frontmatter'>

}

export type PlumeThemeLocaleOptions = PlumeThemeData

export type PlumeThemeData = PlumeThemeLocaleData & {
  locales?: LocaleConfig<Omit<PlumeThemeLocaleData, 'blog' | 'article'>>
}

export * from './locale.js'
export * from './plugins.js'
export * from './encrypt.js'
