<script lang="ts" setup>
import { inject } from 'vue'
import VPLink from '@theme/VPLink.vue'
import VPIcon from '@theme/VPIcon.vue'
import type { ResolvedNavItemWithLink } from '../../../shared/resolved/navbar.js'

defineProps<{
  item: ResolvedNavItemWithLink
}>()

const closeScreen = inject('close-screen') as () => void
</script>

<template>
  <VPLink
    class="vp-nav-screen-menu-link"
    :href="item.link"
    :target="item.target"
    :rel="item.rel"
    :no-icon="item.noIcon"
    @click="closeScreen"
  >
    <VPIcon v-if="item.icon" :name="item.icon" />
    <span v-html="item.text" />
  </VPLink>
</template>

<style scoped>
.vp-nav-screen-menu-link {
  display: block;
  padding: 12px 0 11px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: var(--vp-c-text-1);
  border-bottom: 1px solid var(--vp-c-divider);
  transition:
    border-color var(--t-color),
    color var(--t-color);
}

.vp-nav-screen-menu-link:hover {
  color: var(--vp-c-brand-1);
}
</style>
