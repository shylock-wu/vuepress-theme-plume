<script lang="ts" setup>
import { computed } from 'vue'
import { resolveRouteFullPath } from 'vuepress/client'
import VPFlyout from '@theme/VPFlyout.vue'
import type {
  ResolvedNavItem,
  ResolvedNavItemWithChildren,
} from '../../../shared/resolved/navbar.js'
import { isActive } from '../../utils/index.js'
import { useData } from '../../composables/data.js'

const props = defineProps<{
  item: ResolvedNavItemWithChildren
}>()

const { page } = useData()

function isChildActive(navItem: ResolvedNavItem): boolean {
  if ('link' in navItem) {
    return isActive(
      page.value.path,
      resolveRouteFullPath(navItem.link),
      !!props.item.activeMatch,
    )
  }
  else {
    return navItem.items.some(isChildActive)
  }
}
const childrenActive = computed(() => isChildActive(props.item))
</script>

<template>
  <VPFlyout
    class="vp-navbar-menu-group" :class="{
      active: isActive(
        page.path, item.activeMatch,
        !!item.activeMatch,
      ) || childrenActive,
    }"
    :button="item.text"
    :items="item.items"
    :prefix-icon="item.icon"
  />
</template>
