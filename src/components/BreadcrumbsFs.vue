<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()

const crumbs = computed(() => {
  const segments = route.path.split('/').filter(Boolean)

  // если мы на главной → пусто
  if (segments.length === 0) {
    return []
  }

  return segments.map((seg, i) => {
    const path = '/' + segments.slice(0, i + 1).join('/')
    return { label: seg, path }
  })
})
</script>

<template>
  <nav class="breadcrumbs">
    <RouterLink  to="/">~/</RouterLink>
    <template v-if="crumbs.length">
      <template v-for="(crumb, i) in crumbs" :key="i">
        <RouterLink v-if="i !== crumbs.length - 1" :to="crumb.path">
          {{ crumb.label }}
        </RouterLink>
        <span v-else>{{ crumb.label }}</span>
        <span v-if="i !== crumbs.length - 1">/</span>
      </template>
    </template>
  </nav>
</template>
