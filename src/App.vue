<script setup>
import {provide, reactive, ref} from 'vue'

import LanguageSwitcher from './components/LanguageSwitcher.vue'
import Header from './components/Header.vue'
import EmailPopup from "./components/EmailPopup.vue";

const articleMeta = reactive({})
provide('articleMeta', articleMeta)

const mode = ref('fs') // 'fs' | 'site'

function onListClick(event) {
  const li = event.target.closest('.mobile-overlay__item')
  if (li) {
    const dialog = document.getElementById('mobileOverlay')
    if (dialog) dialog.close()
  }
}

</script>


<template>
  <div class="navbar">
    <div class="navbar__inner container">


      <RouterLink  to="/"  class="navbar__logo logo">LastCodersLab</RouterLink>
<!--      <BreadcrumbsFs v-if="mode === 'fs'" :meta="articleMeta" />
      <BreadcrumbsSite v-else :meta="articleMeta" />-->

      <nav class="navbar__nav nav hidden-mobile">
        <ul class="nav__list">
          <li class="nav__item"><RouterLink  to="/"  class="nav__link">{{ $t('nav.main') }}</RouterLink></li>
          <li class="nav__item"><RouterLink class="nav__link" to="/projects">{{ $t('nav.projects') }}</RouterLink></li>
          <li class="nav__item"><RouterLink class="nav__link" to="/minecraft">{{ $t('nav.minecraft') }}</RouterLink></li>
          <li class="nav__item"><RouterLink class="nav__link" to="/about">{{ $t('nav.about') }}</RouterLink></li>
        </ul>

        <LanguageSwitcher />
      </nav>

      <button
          class="navbar__burger-button burger-button visible-mobile"
          type="button"
          onclick="mobileOverlay.showModal()"
      >
        <span class="visually-hidden">Open navigation menu</span>
      </button>
    </div>
  </div>

  <header class="header">
    <div class="header__inner">
      <Header />
    </div>
  </header>

  <main>
      <transition name="fade" mode="out-in">
        <RouterView />
      </transition>
  </main>


  <footer class="footer">
    <div class="footer__inner container">
      <div class="footer__social social">
        <ul class="social__list">
          <li class="social__item"><a target="_blank" href="https://github.com/lo-sinclair"><i class="icon-github-svgrepo-com"></i></a></li>
          <EmailPopup />
          <li class="social__item"><a target="_blank" href="https://wa.me/79325554620"><i class="icon-whatsapp-128-svgrepo-com"></i></a></li>
          <li class="social__item"><a target="_blank" href="https://t.me/locb_km"><i class="icon-telegram-desktop-svgrepo-com"></i></a></li>
        </ul>
      </div>
      <div class="footer__copyright">
        &copy; Last Coders Lab  | 2025
      </div>
    </div>
    <!-- ./container -->
  </footer>

  <dialog class="mobile-overlay visible-mobile" id="mobileOverlay">
    <form class="mobile-overlay__close-button-wrapper" method="dialog">
      <button
          class="mobile-overlay__close-button cross-button"
          type="submit"
      >
        <span class="visually-hidden">Close navigation menu</span>
      </button>
    </form>
    <div class="mobile-overlay__body">
      <ul class="mobile-overlay__list" @click="onListClick">
        <li class="mobile-overlay__item">
          <RouterLink  to="/"  class="nav__link">Главная</RouterLink>
        </li>
        <li class="mobile-overlay__item">
          <RouterLink class="nav__link" to="/projects">Проекты</RouterLink>
        </li>
        <li class="mobile-overlay__item">
          <RouterLink class="nav__link" to="/minecraft">Minecraft</RouterLink>
        </li>
        <li class="mobile-overlay__item">
          <RouterLink class="nav__link" to="/about">Обо мне</RouterLink>
        </li>
      </ul>
    </div>
  </dialog>
</template>
