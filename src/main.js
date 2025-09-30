import { createApp } from 'vue'
import './assets/styles/style.scss'
import App from './App.vue'
import router from './router'

import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ru from './locales/ru.json'

const savedLang = localStorage.getItem('lang') || 'ru'

const i18n = createI18n({
    legacy: false,
    locale: savedLang,
    fallbackLocale: 'en',
    messages: { en, ru }
})

createApp(App).use(router).use(i18n).mount('#app')
