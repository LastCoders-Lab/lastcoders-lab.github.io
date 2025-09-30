<script setup>
import { useRoute, RouterLink } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
  meta: { type: Object, default: () => ({}) }
})

const route = useRoute()

// словарь для "красивых" названий
const labels = {
  projects: 'Projects',
  minecraft: 'Minecraft'
}

const crumbs = computed(() => {
  const segments = route.path.split('/').filter(Boolean)

  return segments.map((seg, index) => {
    const path = '/' + segments.slice(0, index + 1).join('/')
    const isLast = index === segments.length - 1

    const text = isLast && props.meta?.title
        ? props.meta.title // если есть title из меты
        : labels[seg] || seg

    return { text, to: path, isLast }
  })
})
</script>

<template>
  <nav v-if="route.path !== '/'" class="breadcrumbs">
    <RouterLink to="/">Home</RouterLink>
    <template v-for="(crumb, i) in crumbs" :key="i">
      ›
      <RouterLink v-if="!crumb.isLast" :to="crumb.to">
        {{ crumb.text }}
      </RouterLink>
      <span v-else>{{ crumb.text }}</span>
    </template>
  </nav>
</template>

<style scoped>
.breadcrumbs {
  margin: 1rem 0;
}
.breadcrumbs a {
  text-decoration: none;
  color: #42b983;
}
</style>