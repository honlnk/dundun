export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
}

export interface ApiConfig {
  baseUrl: string
  apiKey: string
  model: string
}

export interface ChatState {
  messages: Message[]
  config: ApiConfig
  isLoading: boolean
}
