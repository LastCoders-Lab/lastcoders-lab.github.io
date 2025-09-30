<script setup>
import banner_src from '../assets/images/banner2.png'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const collapsedHeight = ref(0)
const expandedHeight = ref(0)
const currentHeight = ref(0)

const isDragging = ref(false)
const startY = ref(0)
const startHeight = ref(0)
const isExpanded = ref(false)

const bannerImg = ref(null)
const banner = ref(null)

watch(
    () => route.fullPath,
    () => {
      isExpanded.value = false
      currentHeight.value = collapsedHeight.value
    }
)

onMounted(() => {
  const img = bannerImg.value
  const container = banner.value

  const calcHeights = () => {
    if (!img.naturalWidth || !img.naturalHeight) return

    const ratio = img.naturalHeight / img.naturalWidth
    expandedHeight.value = img.clientWidth * ratio

    // читаем aspect-ratio из CSS
    const styles = getComputedStyle(container)
    const aspect = styles.aspectRatio // вернёт строку вида "5 / 1"

    let collapsedRatio = 5 / 1 // fallback
    if (aspect && aspect.includes('/')) {
      const [w, h] = aspect.split('/').map(Number)
      if (w && h) collapsedRatio = w / h
    }

    collapsedHeight.value = img.clientWidth / collapsedRatio

    if (!isExpanded.value) {
      currentHeight.value = collapsedHeight.value
    }
  }

  img.onload = calcHeights
  if (img.complete) calcHeights()

  window.addEventListener('resize', calcHeights)
})

const startDrag = (e) => {
  e.preventDefault()
  isDragging.value = true
  startY.value = e.touches ? e.touches[0].clientY : e.clientY
  startHeight.value = currentHeight.value

  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', endDrag)
  window.addEventListener('touchmove', onDrag)
  window.addEventListener('touchend', endDrag)
}

const onDrag = (e) => {
  if (!isDragging.value) return
  const y = e.touches ? e.touches[0].clientY : e.clientY
  const delta = y - startY.value

  if (!isExpanded.value) {
    currentHeight.value = Math.min(
        expandedHeight.value,
        Math.max(collapsedHeight.value, startHeight.value + delta)
    )
  } else {
    currentHeight.value = Math.max(
        collapsedHeight.value,
        Math.min(expandedHeight.value, startHeight.value + delta)
    )
  }
}

const endDrag = () => {
  isDragging.value = false

  if (
      !isExpanded.value &&
      currentHeight.value >
      collapsedHeight.value + (expandedHeight.value - collapsedHeight.value) / 3
  ) {
    currentHeight.value = expandedHeight.value
    isExpanded.value = true
  } else if (
      isExpanded.value &&
      currentHeight.value <
      expandedHeight.value - (expandedHeight.value - collapsedHeight.value) / 3
  ) {
    currentHeight.value = collapsedHeight.value
    isExpanded.value = false
  } else {
    currentHeight.value = isExpanded.value
        ? expandedHeight.value
        : collapsedHeight.value
  }

  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', endDrag)
  window.removeEventListener('touchmove', onDrag)
  window.removeEventListener('touchend', endDrag)
}
</script>



<template>
  <div
      class="banner"
      ref="banner"
      :style="{ height: currentHeight + 'px' }"
  >
    <img
        ref="bannerImg"
        :src="banner_src"
        alt="Banner"
        class="banner-img"
        :class="{ collapsed: !isExpanded }"
    />

    <!-- стрелочка-ручка -->
    <span
        class="drag-handle"
        @mousedown="startDrag"
        @touchstart="startDrag"
        :class="{ grabbing: isDragging }"
    >
      <i :class="isExpanded ? 'icon-moose_up_3159892' : 'icon-moose_down_3159892'" />
    </span>
  </div>

</template>

<style scoped>
.banner{
  width: 100%;
  max-width: 1240px;   /* опорная ширина */
  margin: 0 auto;
  height: auto;
  aspect-ratio: 4.03 / 1; /* пропорции картинки */
  overflow: hidden;
  position: relative;
}

.banner img {
  width: 100%;
  height: 100%;             /* ключевой момент */
  object-fit: cover;        /* вписывается без искажений */
  object-position: center;  /* всегда середина */
  //display: block;
}

.drag-handle {
  position: absolute;
  font-size: 30px;
  color: white;
  //-webkit-text-stroke: 1px var(--color-offtop1);
  //text-stroke: 1px #0000;
  //text-shadow: 1px 1px 1px #2F2F2F;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  cursor: grab;
  opacity: 0;
  transition: opacity 0.2s;
  user-select: none;
}

.banner:hover .drag-handle {
  opacity: 1;
}

.drag-handle.grabbing {
  cursor: grabbing;
}

.banner-wrapper:hover .drag-icon {
  opacity: 0.9;
}

@media (max-width: 1240px) {
  .banner.collapsed {
    height: 300px; /* всегда 300px */
  }
  .drag-handle {
    display: none;
  }
}
</style>