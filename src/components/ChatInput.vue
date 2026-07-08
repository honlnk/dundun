<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useChatStore } from '@/stores/chat'

const store = useChatStore()
const inputText = ref('')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

async function handleSend() {
  const text = inputText.value.trim()
  if (!text || store.isLoading) return

  inputText.value = ''
  try {
    await store.sendMessage(text)
  } catch (err: any) {
    store.addMessage('assistant', `出错了：${err.message || '未知错误'}`)
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}

function autoResize() {
  const el = textareaRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 120) + 'px'
}
</script>

<template>
  <footer class="px-5 py-3 border-t border-gray-800 shrink-0">
    <div class="flex items-end gap-3">
      <textarea
        ref="textareaRef"
        v-model="inputText"
        :disabled="store.isLoading"
        @keydown="handleKeydown"
        @input="autoResize"
        placeholder="输入你的食材..."
        rows="1"
        class="flex-1 resize-none bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-orange-500 disabled:opacity-50 max-h-[120px]"
      ></textarea>
      <button
        @click="handleSend"
        :disabled="!inputText.trim() || store.isLoading"
        class="px-4 py-2.5 bg-orange-600 hover:bg-orange-500 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-xl text-sm font-medium transition-colors shrink-0"
      >
        发送
      </button>
    </div>
  </footer>
</template>
