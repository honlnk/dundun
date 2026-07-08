<div align="center">

# 🍳 顿顿不一样

**AI 中餐烹饪私教 · 开源 · 用户自备 API Key**

告诉我你冰箱里有什么,「顿顿」会推荐家常菜,并从零开始分步教学。

</div>

---

## ✨ 简介

「顿顿不一样」是一个开源的 AI 中餐烹饪私教。你只需告诉它手上的食材与调料,AI 私教「顿顿」会:

- 根据现有食材推荐最合适的中餐家常菜
- 用分步骤的方式**从 0 教起**(火候、调料、刀工)
- 解释「为什么要这样做」,而不是照本宣科
- 像真人私教一样主动追问细节、给予鼓励

**核心理念:开源、免费、用户掌控。** 你接入自己的 API Key(通义千问、DeepSeek、豆包、ChatGPT 等 OpenAI 兼容接口),数据与成本完全由你掌控,无需 VPN、无需订阅。

> 💡 产品定位与竞品分析详见 [项目需求说明书](./docs/项目需求说明书.md)。

---

## 🚀 特性

- **🧑‍🍳 中餐私教角色** —— 内置专属 system prompt,懂中式火候、调料搭配、食材处理
- **🔌 自备 API Key** —— 支持任意 OpenAI 兼容接口,配置本地保存,隐私可控
- **💬 对话式教学** —— 消息气泡、加载动画、自动滚动,体验流畅
- **🎨 暗色主题** —— Tailwind 打造,橙色主调,护眼舒适
- **📱 移动端友好** —— 响应式布局,单栏居中

---

## 🛠️ 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | Vue 3(`<script setup>` + Composition API) |
| 语言 | TypeScript |
| 构建 | Vite |
| 状态管理 | Pinia |
| 样式 | Tailwind CSS + SCSS |

---

## 📦 快速开始

### 环境要求

- Node.js 18 LTS 或更高
- npm(或 pnpm / yarn)

### 安装与运行

```bash
# 安装依赖
npm install

# 启动开发服务器(默认 http://localhost:5173)
npm run dev

# 类型检查 + 生产构建
npm run build

# 本地预览构建产物
npm run preview
```

### 配置 API

首次启动后,在界面右上角点击「**未配置 API · 点击设置**」,填入三项信息:

| 字段 | 说明 | 示例 |
|------|------|------|
| API 地址 | OpenAI 兼容接口根地址 | `https://api.openai.com` |
| API Key | 服务商签发的密钥 | `sk-...` |
| 模型名称 | 调用的模型 ID | `gpt-3.5-turbo` |

配置仅保存在浏览器本地,不会上传任何服务器。

<details>
<summary><b>常见服务商 baseUrl 参考</b></summary>

| 服务商 | baseUrl |
|--------|---------|
| OpenAI | `https://api.openai.com` |
| 通义千问(DashScope 兼容模式) | `https://dashscope.aliyuncs.com/compatible-mode` |
| DeepSeek | `https://api.deepseek.com` |
| 火山方舟(豆包) | `https://ark.cn-beijing.volces.com` |

> 请以各服务商最新文档为准。

</details>

---

## 📁 项目结构

```
src/
├── main.ts                 # 应用入口
├── App.vue                 # 根组件 / 整体布局
├── types/index.ts          # 类型定义
├── stores/chat.ts          # 核心状态:配置 + 消息 + 发送逻辑
├── styles/global.scss      # 全局样式
└── components/
    ├── ConfigBar.vue       # API 配置弹窗
    ├── MessageList.vue     # 对话气泡区
    └── ChatInput.vue       # 输入框
```

完整说明见 [开发文档](./docs/开发文档.md)。

---

## 📚 文档

- [项目需求说明书](./docs/项目需求说明书.md) — 产品定位、竞品分析、功能规划
- [开发文档](./docs/开发文档.md) — 架构、模块详解、开发约定、已知问题

---

## 🗺️ 路线图

- [x] OpenAI 兼容 API 接入 + 自备 Key
- [x] 中餐私教对话主流程
- [ ] 聊天记录持久化(支撑学习进度)
- [ ] 用户烹饪经验分级(小白 / 会一点 / 熟练)
- [ ] 渐进式技能解锁
- [ ] 语音交互(TTS 分步语音指导,解放双手)
- [ ] 缺料检测 + 即时配送跳转

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request。提 PR 前请先阅读 [开发文档](./docs/开发文档.md) 了解项目架构与开发约定。

---

## 📄 许可证

待定(项目定位为完全开源,将尽快补充 LICENSE 文件)。
