<script setup lang="ts">
import { withBase } from 'vuepress/client'
import { computed, normalizeClass } from 'vue'
import { isLinkHttp } from 'vuepress/shared'
import type { PlumeHomeConfigBase } from '../../../shared/index.js'
import { useDarkMode } from '../../composables/dark-mode.js'

const props = defineProps<PlumeHomeConfigBase & {
  containerClass?: any
}>()

const isDark = useDarkMode()

const styles = computed(() => {
  if (!props.backgroundImage)
    return null

  const image = typeof props.backgroundImage === 'string' ? props.backgroundImage : (props.backgroundImage[isDark.value ? 'dark' : 'light'] ?? props.backgroundImage.light)

  const link = isLinkHttp(image) ? props.backgroundImage : withBase(image)
  return {
    'background-image': `url(${link})`,
    'background-size': 'cover',
    'background-position': 'center',
    'background-repeat': 'no-repeat',
    'background-attachment': props.backgroundAttachment || '',
  }
})

const containerClass = computed(() => normalizeClass(props.containerClass || ''))
</script>

<template>
  <div class="vp-home-box" :class="{ full: props.full }" :style="styles">
    <slot name="before" />
    <div class="container" :class="containerClass">
      <slot />
    </div>
    <slot name="after" />
  </div>
</template>

<style>
.vp-home-box {
  position: relative;
  padding: 24px;
}

@media (min-width: 640px) {
  .vp-home-box {
    padding: 32px 48px;
  }
}

@media (min-width: 960px) {
  .vp-home-box {
    padding: 48px;
  }
}

.vp-home-box .container {
  width: 100%;
  max-width: 1152px;
  margin: 0 auto;
}

.vp-home-box.full {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--vp-nav-height));
}
</style>
