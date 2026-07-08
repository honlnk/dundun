<script setup lang="ts">
import ConfigBar from './components/ConfigBar.vue'
import MessageList from './components/MessageList.vue'
import ChatInput from './components/ChatInput.vue'
</script>

<template>
  <div class="flex flex-col h-screen max-w-2xl mx-auto">
    <!-- 顶部标题栏 -->
    <header
      class="flex items-center justify-between px-5 py-3 border-b border-gray-800 shrink-0"
    >
      <h1 class="text-lg font-bold text-orange-400 tracking-wide">
        顿顿不一样
      </h1>
      <span class="text-xs text-gray-500">AI 中餐烹饪私教</span>
    </header>

    <!-- API 配置栏 -->
    <ConfigBar />

    <!-- 对话区域 -->
    <MessageList />

    <!-- 底部输入 -->
    <ChatInput />
  </div>
</template>
