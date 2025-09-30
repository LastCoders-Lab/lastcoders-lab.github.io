<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getByCategory } from '../content/index.js'

const { locale } = useI18n()

// список проектов с учётом локали
const posts = computed(() => getByCategory('minecraft', locale.value))
</script>

<template>
  <section class="section section--hidden-x container">
    <h1 class="page-title">{{ $t('minecraft.title') }}</h1>
    <div class="page-content">
      <p class="multiline">{{ $t('minecraft.text') }}</p>
    </div>

    <div class="projects">
      <div v-for="post in posts" :key="post.route" class="projects__item project">

        <div class="project__image">
          <RouterLink :to="post.route" class="project-link">
            <img v-if="post.preview" :src="post.preview" alt="" class="cover" />
          </RouterLink>
        </div>

        <div class="project__title">
          <i class="icon-repository-submodule-svgrepo-com project__title-icon"></i>
          <h4 class="project__title-text">
            <RouterLink :to="post.route" class="project-link">
              {{ post.title }}
            </RouterLink>
          </h4>
        </div>

        <div class="project__description">
          <p>{{ post.description }}</p>
        </div>

        <div v-if="post.tags?.length" class="project__tags">
          <div class="project__tags-tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</span>
          </div>
          <div class="tags-links">
            <a target="_blank" :href="post.github">< ></a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>