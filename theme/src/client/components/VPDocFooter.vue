<script lang="ts" setup>
import { computed } from 'vue'
import VPLink from '@theme/VPLink.vue'
import { useContributors } from '../composables/contributors.js'
import { useEditLink } from '../composables/edit-link.js'
import { useLastUpdated } from '../composables/latest-updated.js'
import { usePrevNext } from '../composables/prev-next.js'
import { useData } from '../composables/data.js'

const { theme, frontmatter } = useData()
const editLink = useEditLink()
const { datetime: lastUpdated, isoDatetime, lastUpdatedText } = useLastUpdated()
const contributors = useContributors()
const { prev, next } = usePrevNext()

const hasEditLink = computed(() =>
  Boolean(theme.value.editLink && frontmatter.value.editLink !== false && editLink.value),
)
const hasLastUpdated = computed(() =>
  Boolean(theme.value.lastUpdated && frontmatter.value.lastUpdated !== false && lastUpdated.value),
)
const hasContributors = computed(() =>
  Boolean(theme.value.contributors && frontmatter.value.contributors !== false && contributors.value?.length),
)

const showFooter = computed(() => {
  return hasEditLink.value
    || hasLastUpdated.value
    || hasContributors.value
    || prev.value?.link
    || next.value?.link
})
</script>

<template>
  <footer v-if="showFooter" class="vp-doc-footer">
    <slot name="doc-footer-before" />

    <div v-if="hasEditLink || hasLastUpdated" class="edit-info">
      <div v-if="hasEditLink && editLink" class="edit-link">
        <VPLink class="edit-link-button" :href="editLink.link" :no-icon="true">
          <span class="vpi-square-pen edit-link-icon" aria-label="edit icon" />
          {{ editLink.text }}
        </VPLink>
      </div>

      <div v-if="hasLastUpdated" class="last-updated">
        <p class="last-updated-text">
          {{ lastUpdatedText }}:
          <time :datetime="isoDatetime" class="last-updated-time">
            {{ lastUpdated }}
          </time>
        </p>
      </div>
    </div>

    <div v-if="hasContributors && contributors?.length" class="contributors">
      <span class="contributors-label">
        {{ theme.contributorsText || 'Contributors' }}:
      </span>
      <span class="contributors-info">
        <template v-for="(contributor, index) in contributors" :key="contributor">
          <span class="contributor" :title="`email: ${contributor.email}`">
            {{ contributor.name }}
          </span>
          <template v-if="index !== contributors.length - 1">, </template>
        </template>
      </span>
    </div>

    <nav v-if="prev?.link || next?.link" class="prev-next">
      <div class="pager">
        <VPLink v-if="prev?.link" class="pager-link prev" :href="prev.link">
          <span class="desc" v-html="theme.prevPageLabel || 'Previous page'" />
          <span class="title" v-html="prev.text" />
        </VPLink>
      </div>
      <div class="pager">
        <VPLink v-if="next?.link" class="pager-link next" :href="next.link">
          <span class="desc" v-html="theme.nextPageLabel || 'Next page'" />
          <span class="title" v-html="next.text" />
        </VPLink>
      </div>
    </nav>
  </footer>
</template>

<style scoped>
.vp-doc-footer {
  margin-top: 96px;
}

@media (min-width: 640px) {
  .edit-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 6px;
  }
}

.edit-link-button {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 32px;
  color: var(--vp-c-brand-1);
  border: 0;
  transition: color var(--t-color);
}

.edit-link-button:hover {
  color: var(--vp-c-brand-2);
}

@media print {
  .edit-link-button {
    display: none;
  }
}

.edit-link-icon {
  margin-right: 8px;
  fill: currentcolor;
}

.last-updated-text {
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: var(--vp-c-text-2);
  transition: color var(--t-color);
}

@media (min-width: 640px) {
  .last-updated {
    flex: 1;
    text-align: right;
  }

  .last-updated-text {
    font-size: 14px;
    font-weight: 500;
    line-height: 32px;
  }
}

.contributors {
  padding-bottom: 6px;
  margin-top: -10px;
  font-size: 14px;
  line-height: 32px;
  text-align: left;
}

@media (min-width: 640px) {
  .contributors {
    text-align: right;
  }
}

.contributors-label {
  padding-right: 10px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color var(--t-color);
}

.contributors-info {
  color: var(--vp-c-text-2);
  transition: color var(--t-color);

  .contributor {
    color: var(--vp-c-text-3);
    transition: color var(--t-color);
  }
}

.prev-next {
  display: grid;
  grid-row-gap: 8px;
  padding-top: 24px;
  margin-top: 10px;
  border-top: 1px solid var(--vp-c-divider);
  transition: border-top var(--t-color);
}

@media (min-width: 640px) {
  .prev-next {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 16px;
  }
}

@media print {
  .prev-next {
    display: none;
  }
}

.pager-link {
  display: block;
  width: 100%;
  height: 100%;
  padding: 11px 16px 13px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  transition: border-color var(--t-color);
}

.pager-link:hover {
  border-color: var(--vp-c-brand-1);
}

.pager-link.next {
  margin-left: auto;
  text-align: right;
}

.desc {
  display: block;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  color: var(--vp-c-text-2);
  transition: color var(--t-color);
}

.title {
  display: block;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: var(--vp-c-brand-1);
  transition: color var(--t-color);
}
</style>
