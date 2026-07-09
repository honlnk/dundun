<script setup lang="ts">
import { ref } from 'vue'
import { useChatStore } from '@/stores/chat'

const store = useChatStore()
const showConfig = ref(false)
const showClearConfirm = ref(false)

const form = ref({
  baseUrl: '',
  apiKey: '',
  model: '',
})

function openConfig() {
  form.value = { ...store.config }
  showConfig.value = true
}

function saveConfig() {
  store.updateConfig({ ...form.value })
  showConfig.value = false
}

function handleClear() {
  store.clearMessages()
  showClearConfirm.value = false
}
</script>

<template>
  <!-- 配置触发按钮 -->
  <div class="px-5 py-2 border-b border-gray-800 shrink-0 flex items-center justify-between">
    <button
      @click="openConfig"
      class="flex items-center gap-2 text-xs text-gray-400 hover:text-orange-400 transition-colors"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      {{ store.hasConfig ? '已配置 · 点击修改' : '未配置 API · 点击设置' }}
    </button>
    <button
      v-if="store.messages.length > 0"
      @click="showClearConfirm = true"
      class="text-xs text-gray-500 hover:text-red-400 transition-colors"
    >
      清空对话
    </button>
  </div>

  <!-- 配置弹窗 -->
  <Teleport to="body">
    <div
      v-if="showConfig"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      @click.self="showConfig = false"
    >
      <div class="bg-gray-900 border border-gray-700 rounded-xl p-6 w-[380px] max-w-[90vw]">
        <h2 class="text-base font-semibold text-gray-100 mb-4">API 配置</h2>
        <div class="space-y-3">
          <div>
            <label class="block text-xs text-gray-400 mb-1">API 地址</label>
            <input
              v-model="form.baseUrl"
              placeholder="https://api.openai.com"
              class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">API Key</label>
            <input
              v-model="form.apiKey"
              type="password"
              placeholder="sk-..."
              class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">模型名称</label>
            <input
              v-model="form.model"
              placeholder="gpt-3.5-turbo"
              class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>
        <div class="flex justify-end gap-3 mt-5">
          <button
            @click="showConfig = false"
            class="px-4 py-1.5 text-sm text-gray-400 hover:text-gray-200 transition-colors"
          >
            取消
          </button>
          <button
            @click="saveConfig"
            class="px-4 py-1.5 text-sm bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-colors"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  </Teleport>

  <!-- 清空确认弹窗 -->
  <Teleport to="body">
    <div
      v-if="showClearConfirm"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      @click.self="showClearConfirm = false"
    >
      <div class="bg-gray-900 border border-gray-700 rounded-xl p-6 w-[320px] max-w-[90vw]">
        <h3 class="text-base font-semibold text-gray-100 mb-3">确认清空</h3>
        <p class="text-sm text-gray-400 mb-5">
          将清空所有聊天记录，此操作不可恢复。确定要继续吗？
        </p>
        <div class="flex justify-end gap-3">
          <button
            @click="showClearConfirm = false"
            class="px-4 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
          >
            取消
          </button>
          <button
            @click="handleClear"
            class="px-4 py-1.5 text-sm bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
          >
            清空
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
