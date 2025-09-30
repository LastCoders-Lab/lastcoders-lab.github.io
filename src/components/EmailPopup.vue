<template>
  <div class="social__item mail-wrapper" ref="popupRef">
    <a href="#"
       @click.prevent="togglePopup"
       :title="t('footer.show-email')">
      <i class="icon-email-svgrepo-com"></i>
    </a>

    <!-- всплывающее окно -->
    <transition name="fade">
      <div v-if="showPopup" class="mail-popup">
        <div class="pop-header">
          <i class="icon-email-svgrepo-com" ></i> {{ t('footer.email') }}
        </div>
        <div class="pop-body">
          <a :title="t('footer.mailto')" :href="'mailto:' + email" class="mail-text">{{ email }}</a>
          <button @click="copyMail"
                  class="copy-btn"
                  :title="t('footer.copy')">
            <i class="icon-copy-svgrepo-com"></i>
          </button>
        </div>
      </div>
    </transition>

    <!-- уведомление -->
    <transition name="fade">
      <div v-if="showToast" class="toast">{{ t('footer.email-copied') }}</div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const email = "somberglen@gmail.com"
const showPopup = ref(false)
const showToast = ref(false)
const popupRef = ref(null)

function togglePopup() {
  showPopup.value = !showPopup.value
}

async function copyMail() {
  try {
    await navigator.clipboard.writeText(email)
    showToast.value = true
    setTimeout(() => (showToast.value = false), 2000)
  } catch (e) {
    console.error("Не удалось скопировать", e)
  }
  showPopup.value = false // 🔹 закрыть после копирования
}

function handleClickOutside(event) {
  if (popupRef.value && !popupRef.value.contains(event.target)) {
    showPopup.value = false
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside)
})
</script>

<style scoped>
.mail-wrapper {
  position: relative;
}

.mail-popup {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  border-radius: 2px;
  text-align: left;
  z-index: 10;
}
.pop-header {
  padding: 4px 12px;
  font-size: 0.7em;
  display: flex;
  gap: 12px;
  align-items: center;
}
.pop-body{
  display: flex;
  align-items: center;
  align-content: space-between;
  gap: 20px;
  padding: 18px 12px;
}

.mail-text {
  font-size: 0.9rem;
  color: #333;
  user-select: text;
}

.copy-btn {
  background: none;
  border: none;
  font-size: 1rem;
  padding: 0;
}

.toast {
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: #fff;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  white-space: nowrap;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.pop-header {
  width: 100%;
  background: black;
  color: white;
}
</style>