# 文脉e家项目 - GitHub Copilot 指南

## 项目简介

文脉e家是一个基于 React + Node.js 的全栈视频教育平台，集成 Bilibili 视频播放器。

## 核心技术栈

- **前端**: React 18.2 + Redux Toolkit + Vite
- **后端**: Node.js + Express.js
- **数据流**: RESTful API + Redux state management

## 项目目标

当前阶段目标：实现基于学段（小学、初中、高中）的视频播放功能。

## 功能现状

- ✅ 学段选择器（3个学段）
- ✅ 课程卡片展示
- ✅ Bilibili 视频播放器集成
- ✅ Redux 状态管理
- ✅ 后端课程 API

## 文件结构说明

```
client/src/
├── store/           # Redux store 和 slices
├── components/      # React 组件（BilibiliPlayer, CourseCard, StageSelector）
├── pages/           # 页面级组件（Dashboard）
├── styles/          # 组件样式
└── App.jsx/main.jsx # 入口文件

server/src/
├── routes/          # API 路由
├── data/            # 静态数据
└── index.js         # 服务器入口
```

## 设计原则

1. **简洁优先** - 先实现核心功能，后续逐步扩展
2. **可扩展性** - 组件设计支持未来的功能扩展
3. **响应式** - 支持各尺寸设备
4. **类型安全** - 适当使用 JSDoc 注释

## 后续扩展建议

- 数据库集成（PostgreSQL + Prisma）
- 用户认证（JWT）
- 学习进度追踪
- 成就系统（Gamification）
- 宗谱编修功能
- UGC 内容上传
- WebSocket 实时通知
- 全文搜索

## 开发工作流

1. **启动后端**: `cd server && npm run dev` (端口 3001)
2. **启动前端**: `cd client && npm run dev` (端口 5173)
3. **修改课程**: 编辑 `server/src/data/courses.js` 中的课程数据
4. **添加组件**: 在 `client/src/components/` 创建新组件

## Bilibili 播放器 URL 参数说明

当前使用的参数优化方案：
- `high_quality=1` - 强制高清
- `danmaku=0` - 关闭弹幕（教育场景）
- `autoplay=0` - 不自动播放
- `as_wide=1` - 宽屏模式

## 常见问题

**Q: 如何添加新的学段？**
A: 修改 `coursesSlice.js` 中课程数据的 `stage` 字段和 `StageSelector.jsx` 中的 stages 配置

**Q: 如何更换 Bilibili 视频？**
A: 替换课程数据中的 `bvid` 字段

**Q: 如何处理播放器加载失败？**
A: 检查 Bilibili 视频ID是否正确，确保浏览器允许 iframe 加载

## 参考文档

- React: https://react.dev/
- Redux Toolkit: https://redux-toolkit.js.org/
- Bilibili Player: https://player.bilibili.com/
- Express.js: https://expressjs.com/

## 贡献指南

遵循现有的代码风格和项目结构。新功能应该：
1. 保持高内聚、低耦合
2. 提供相应的 Redux actions/reducers
3. 包含基本的错误处理
4. 考虑响应式设计
