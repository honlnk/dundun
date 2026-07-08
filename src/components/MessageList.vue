<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useChatStore } from '@/stores/chat'

const store = useChatStore()
const container = ref<HTMLElement | null>(null)

watch(
  () => store.messages.length,
  async () => {
    await nextTick()
    if (container.value) {
      container.value.scrollTop = container.value.scrollHeight
    }
  },
)

watch(
  () => store.isLoading,
  async (loading) => {
    if (loading) {
      await nextTick()
      if (container.value) {
        container.value.scrollTop = container.value.scrollHeight
      }
    }
  },
)
</script>

<template>
  <main ref="container" class="flex-1 overflow-y-auto px-5 py-4 space-y-4">
    <!-- 空状态 -->
    <div
      v-if="store.messages.length === 0"
      class="flex flex-col items-center justify-center h-full text-center"
    >
      <div class="text-5xl mb-4">🍳</div>
      <h3 class="text-gray-400 text-sm mb-2">告诉我你冰箱里有什么</h3>
      <p class="text-gray-600 text-xs max-w-xs leading-relaxed">
        例如：「我有鸡蛋、西红柿、青椒和猪肉，调料有生抽、老抽、料酒、盐，能做什么菜？」
      </p>
    </div>

    <!-- 消息列表 -->
    <div
      v-for="msg in store.messages"
      :key="msg.id"
      :class="[
        'flex gap-3',
        msg.role === 'user' ? 'justify-end' : 'justify-start',
      ]"
    >
      <!-- 头像 -->
      <div
        v-if="msg.role === 'assistant'"
        class="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-sm shrink-0"
      >
        🧑‍🍳
      </div>

      <!-- 气泡 -->
      <div
        :class="[
          'max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap',
          msg.role === 'user'
            ? 'bg-orange-600 text-white rounded-br-md'
            : 'bg-gray-800 text-gray-200 rounded-bl-md',
        ]"
      >
        {{ msg.content }}
      </div>

      <!-- 用户头像 -->
      <div
        v-if="msg.role === 'user'"
        class="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm shrink-0"
      >
        🙂
      </div>
    </div>

    <!-- 加载中 -->
    <div v-if="store.isLoading" class="flex items-center gap-2 pl-12">
      <span class="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
      <span class="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
      <span class="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
    </div>
  </main>
</template>
