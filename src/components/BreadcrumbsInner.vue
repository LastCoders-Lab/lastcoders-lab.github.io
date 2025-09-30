<script setup>
import { useRoute, RouterLink } from 'vue-router'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  meta: { type: Object, default: () => ({}) }
})

const route = useRoute()
const { t } = useI18n()

const crumbs = computed(() => {
  const segments = route.path.split('/').filter(Boolean)

  return segments.map((seg, index) => {
    const path = '/' + segments.slice(0, index + 1).join('/')
    const isLast = index === segments.length - 1

    const text = isLast && props.meta?.title
        ? props.meta.title // если есть title из меты
        : t(`nav.${seg}`, seg)

    return { text, to: path, isLast }
  })
})
</script>
<template>
  <nav v-if="route.path !== '/'" class="breadcrumbs-inner">
    <template v-for="(crumb, i) in crumbs" :key="i">
      <span v-if="i > 0"> / </span>
      <RouterLink v-if="!crumb.isLast" :to="crumb.to">
        {{ crumb.text }}
      </RouterLink>
      <span v-else>{{ crumb.text }}</span>
    </template>
  </nav>
</template>
