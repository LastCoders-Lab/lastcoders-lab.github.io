<script setup>
import { useI18n } from 'vue-i18n'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const { locale } = useI18n()
const isOpen = ref(false)

// список доступных языков
const languages = [
  { code: 'en', name: 'EN', flag: 'gb' },
  { code: 'ru', name: 'RU', flag: 'ru' }
]

// какой язык выбран сейчас
const currentLang = computed(() =>
    languages.find(lang => lang.code === locale.value) || languages[0]
)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function changeLang(langCode) {
  locale.value = langCode
  localStorage.setItem('lang', langCode)
  isOpen.value = false
}

// при загрузке страницы восстанавливаем язык из localStorage
onMounted(() => {
  const saved = localStorage.getItem('lang')
  if (saved && languages.some(l => l.code === saved)) {
    locale.value = saved
  }
})

// закрыть при клике вне меню
function handleClickOutside(event) {
  const el = document.querySelector('.language-switcher')
  if (el && !el.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>


<template>
  <div class="language-switcher">
    <!-- кнопка -->
    <button class="lang-btn" @click="toggleDropdown">
      <span class="fi" :class="'fi-' + currentLang.flag"></span>
      ▼
    </button>

    <!-- список -->
    <ul v-if="isOpen" class="lang-menu">
      <li
          v-for="lang in languages"
          :key="lang.code"
          @click="changeLang(lang.code)"
      >
        <span class="fi" :class="'fi-' + lang.flag"></span>
        {{ lang.name }}
      </li>
    </ul>
  </div>
</template>


<style scoped>
.language-switcher {
  position: relative;
  display: inline-block;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  cursor: pointer;
  background: none;
  border-radius: 6px;
  color: white;
}

.lang-btn {
  border: none;
  background: none;
  cursor: pointer;

  &:focus {
    outline: none; /* убирает синий контур */
  }

  &:focus-visible {
    outline: none;
  }

  .fi {
    filter: brightness(150%) saturate(0.3);
  }
  .fi:hover, .fi:focus {
    filter: none;
  }
}

.lang-menu {
  position: absolute;
  top: 100%;
  z-index: 999;
  left: 0;
  background: white;
  font-size: 0.8em;
  border: 1px solid #ddd;
  border-radius: 3px;
  color: black;
  padding: 4px 0;
  margin: 4px 0 0;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

.lang-menu li {
  padding: 6px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.lang-menu li:hover {
  background: #f3f3f3;
}

.fi {
  border-radius: 50%; /* делаем флажки круглыми */
}

/*.dropdown {
  position: relative;
  display: inline-block;
}

.flag-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.8rem;
}

.dropdown-content {
  display: none;
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  min-width: 140px;
  z-index: 1;
}

.dropdown-content button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  width: 100%;
  padding: 6px 10px;
  cursor: pointer;
}

.dropdown-content button:hover {
  background: #f0f0f0;
}

.dropdown:hover .dropdown-content {
  display: block;
}*/
</style>