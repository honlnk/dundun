import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Message, ApiConfig } from '@/types'

const CONFIG_KEY = 'dundun-api-config'
const MESSAGES_KEY = 'dundun-messages'

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return fallback
}

function saveToStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.warn('localStorage 写入失败:', e)
  }
}

function loadConfig(): ApiConfig {
  return loadFromStorage<ApiConfig>(CONFIG_KEY, { baseUrl: '', apiKey: '', model: '' })
}

function saveConfig(config: ApiConfig) {
  saveToStorage(CONFIG_KEY, config)
}

function loadMessages(): Message[] {
  return loadFromStorage<Message[]>(MESSAGES_KEY, [])
}

function saveMessages(messages: Message[]) {
  saveToStorage(MESSAGES_KEY, messages)
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref<Message[]>(loadMessages())
  const config = ref<ApiConfig>(loadConfig())
  const isLoading = ref(false)

  const hasConfig = computed(() => {
    return !!(config.value.baseUrl && config.value.apiKey && config.value.model)
  })

  function updateConfig(newConfig: ApiConfig) {
    config.value = { ...newConfig }
    saveConfig(config.value)
  }

  function persistMessages() {
    saveMessages(messages.value)
  }

  function addMessage(role: 'user' | 'assistant', content: string) {
    const msg: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      role,
      content,
      timestamp: Date.now(),
    }
    messages.value.push(msg)
    persistMessages()
    return msg
  }

  function clearMessages() {
    messages.value = []
    persistMessages()
  }

  const systemPrompt = `你是一位经验丰富的中餐私教，名叫「顿顿」。你的任务是：

1. 根据用户提供的食材和调料，推荐最适合做的中餐菜肴
2. 用分步骤的方式教学做菜，讲究"从0教起"
3. 重点讲解中式烹饪的核心要点：火候控制、调料搭配、食材处理技巧
4. 语气亲切、专业，像私教一样耐心指导
5. 如果用户描述模糊，主动追问细节（比如"猪肉是哪个部位？五花还是里脊？"）
6. 记住用户的学习进度，适时给予鼓励

请始终保持角色，用中文回复。`

  async function sendMessage(userContent: string) {
    if (!hasConfig.value) throw new Error('请先配置 API')

    addMessage('user', userContent)
    isLoading.value = true

    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.value.map(m => ({
        role: m.role,
        content: m.content,
      })),
    ]

    try {
      const res = await fetch(`${config.value.baseUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.value.apiKey}`,
        },
        body: JSON.stringify({
          model: config.value.model,
          messages: apiMessages,
          temperature: 0.8,
        }),
      })

      if (!res.ok) {
        const errBody = await res.text()
        throw new Error(`API 请求失败 (${res.status}): ${errBody}`)
      }

      const data = await res.json()
      const reply = data.choices?.[0]?.message?.content || '(空响应)'
      addMessage('assistant', reply)
      return reply
    } finally {
      isLoading.value = false
    }
  }

  return {
    messages,
    config,
    isLoading,
    hasConfig,
    updateConfig,
    addMessage,
    clearMessages,
    sendMessage,
  }
})
