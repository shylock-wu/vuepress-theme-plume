<script setup lang="ts">
import { onMounted, toRefs } from 'vue'
import type { PDFTokenMeta } from '../../shared/pdf.js'
import { useSize } from '../composables/size.js'
import { usePDF } from '../composables/pdf.js'

const props = defineProps<PDFTokenMeta>()

const options = toRefs(props)
const { el, width, height, resize } = useSize(options)

onMounted(() => {
  if (!el.value)
    return
  usePDF(el.value, props.src!, {
    page: props.page,
    zoom: props.zoom,
    noToolbar: props.noToolbar,
  })
  resize()
})
</script>

<template>
  <div ref="el" class="pdf-viewer-wrapper" :style="{ width, height }" />
</template>

<style>
.pdf-viewer-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
}

.pdf-viewer {
  width: 100%;
  height: 100%;
}
</style>
