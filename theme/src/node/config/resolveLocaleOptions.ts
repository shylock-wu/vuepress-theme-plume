import { entries, fromEntries, getLocaleConfig } from '@vuepress/helper'
import type { App } from 'vuepress'
import { LOCALE_OPTIONS } from '../locales/index.js'
import type { PlumeThemeLocaleData, PlumeThemeLocaleOptions } from '../../shared/index.js'
import { THEME_NAME } from '../utils/index.js'

const FALLBACK_OPTIONS: PlumeThemeLocaleData = {
  appearance: true,

  blog: {
    link: '/blog/',
    pagination: { perPage: 15 },
    tags: true,
    archives: true,
    categories: true,
    tagsLink: '/blog/tags/',
    archivesLink: '/blog/archives/',
    categoriesLink: '/blog/categories/',
  },
  article: '/article/',
  notes: { link: '/', dir: '/notes/', notes: [] },
  navbarSocialInclude: ['github', 'twitter', 'discord', 'facebook'],
  aside: true,
  outline: [2, 3],

  // page meta
  editLink: true,
  contributors: true,

  footer: {
    message:
      'Power by <a target="_blank" href="https://v2.vuepress.vuejs.org/">VuePress</a> & <a target="_blank" href="https://theme-plume.vuejs.press">vuepress-theme-plume</a>',
  },
}

export function resolveLocaleOptions(app: App, { locales, ...options }: PlumeThemeLocaleOptions): PlumeThemeLocaleOptions {
  const resolvedOptions: PlumeThemeLocaleOptions = {
    ...FALLBACK_OPTIONS,
    ...options,
    locales: getLocaleConfig({
      app,
      name: THEME_NAME,
      default: LOCALE_OPTIONS,
      config: fromEntries(
        entries<PlumeThemeLocaleOptions>({
          '/': {},
          ...locales,
        }).map(([locale, opt]) => [
          locale,
          { ...options, ...opt },
        ]),
      ),
    }),
  }
  return resolvedOptions
}
