<script setup>
import { inject, shallowRef, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import mediumZoom from 'medium-zoom'
import BreadcrumbsInner from '../components/BreadcrumbsInner.vue'

const route = useRoute()
const { locale } = useI18n()
const article = shallowRef(null)
const articleMeta = inject('articleMeta')

const modules = import.meta.glob('/src/content/*/*/index.*.md')

function extractMeta(mod) {
  if (!mod) return {}
  if (mod.frontmatter) return mod.frontmatter
  if (mod.attributes) return mod.attributes
  const { default: _, ...named } = mod
  return Object.keys(named).length ? named : {}
}

async function load() {
  const lang = locale.value
  const filePath = `/src/content${route.fullPath}/index.${lang}.md`

  Object.keys(articleMeta).forEach(k => delete articleMeta[k])
  article.value = null

  let mod = null
  if (modules[filePath]) {
    mod = await modules[filePath]()
  } else {
    const fallbackPath = filePath.replace(`.${lang}.md`, `.en.md`)
    if (modules[fallbackPath]) mod = await modules[fallbackPath]()
  }

  if (mod) {
    article.value = mod.default
    const meta = extractMeta(mod)
    Object.assign(articleMeta, meta)
  }
}

// следим за статьёй и ставим зум после рендера
watch(article, async () => {
  await nextTick()
  mediumZoom('.zoomable', {
    background: 'transparent',
    margin: 0,
    scrollOffset: 0,
  })
})

watch([() => route.fullPath, () => locale.value], load, { immediate: true })

console.log(articleMeta)
</script>

<template>
  <section class="section section--hidden-x container">
    <div class="project-title page-title">
        <h1>
          <BreadcrumbsInner :meta="articleMeta" />
        </h1>
      <div class="project-title__links">
        <a v-if="articleMeta.demo" target="_blank" :href="articleMeta.demo" title="Preview" class="project-title__link"><i class="icon-preview-svgrepo-com"></i></a>
        <a v-if="articleMeta.github" target="_blank" :href="articleMeta.github" title="Code" class="project-title__link"><i class="icon-code-svgrepo-com"></i></a>
      </div>
    </div>

    <div class="page-content project-content">
      <component v-if="article" :is="article" />
      <p v-else>Статья не найдена</p>
    </div>

    <div class="project-footer">
        <div class="project-footer__tags" v-if="articleMeta.tags">
          <div v-for="tag in articleMeta.tags" class="project-footer__tag">{{ tag }}</div>
        </div>
    </div>
  </section>
</template>
