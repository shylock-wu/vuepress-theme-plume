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
    class="vp-nav-screen-menu-group-link"
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
.vp-nav-screen-menu-group-link {
  display: block;
  margin-left: 12px;
  font-size: 14px;
  font-weight: 400;
  line-height: 32px;
  color: var(--vp-c-text-1);
  transition: color var(--t-color);
}

.vp-nav-screen-menu-group-link:hover {
  color: var(--vp-c-brand-1);
}
</style>
