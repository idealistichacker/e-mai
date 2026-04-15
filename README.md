# 文脉e家 - B站视频播放平台

一个基于 React + Node.js 的全栈文化教育视频播放平台。使用 Redux Toolkit 进行状态管理，集成 Bilibili 视频播放器。

## 项目结构

```
.
├── client/              # React 前端应用
│   ├── src/
│   │   ├── components/  # React 组件
│   │   ├── pages/       # 页面组件
│   │   ├── store/       # Redux 状态管理
│   │   ├── styles/      # 样式文件
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/              # Node.js 后端应用
│   ├── public/           # 静态资源根目录（通过 / 直接访问）
│   │   └── images/       # 课程图片目录（通过 /images/... 访问）
│   ├── src/
│   │   ├── routes/      # API 路由
│   │   ├── data/        # 数据文件
│   │   └── index.js     # 服务器入口
│   ├── .env
│   └── package.json
│
└── README.md
```

## 功能特性

### 当前实现

- ✅ 移动端深度适配（导航横向滑动排版、课程矩阵自适应布局布局）
- ✅ 计划分类渲染（青苗计划、归雁计划、桑榆计划丝滑切换）
- ✅ 学段动态变轨（青苗显示小学/初中/高中，归雁/桑榆显示专属阶段）
- ✅ 课程展示和卡片组件
- ✅ Bilibili 视频播放器集成
- ✅ Redux Toolkit 状态管理

### 示例课程

- **青苗计划**：枣娃的故事、乐陵泥土的艺术、为“金丝小枣”设计未来
- **归雁计划**：归雁归乡创业指导
- **桑榆计划**：桑榆非遗记忆长廊

## 快速开始

### 前置要求

- Node.js >= 16.0
- npm >= 8.0

### 一键开发模式（推荐）

在项目根目录执行（会同时启动前后端，并支持自动重载）：

```bash
npm run dev
```

### 安装依赖

```bash
# 前端
cd client
npm install

# 后端
cd ../server
npm install
```

### 开发模式运行

**终端 1 - 启动后端服务器**

```bash
cd server
npm run dev
```

服务器将运行在 `http://localhost:3001`

**终端 2 - 启动前端开发服务器**

```bash
cd client
npm run dev
```

应用将运行在 `http://localhost:5173`

### 自动刷新/重启说明

- 前端：Vite HMR，修改 `client/src` 后页面自动热更新
- 后端：Nodemon，修改 `server/src` 后服务自动重启
- 已启用更稳定的轮询监听（适配 Windows 路径场景），无需手动关闭终端重跑

### `server/public` 与 `server/src` 的关系

- `server/src`：后端代码（路由、业务逻辑、数据文件）
- `server/public`：静态资源目录（不走 `/api`，直接映射到根路径）
- 映射规则：`server/public/images/xiaoxue-001.png` → `http://localhost:3001/images/xiaoxue-001.png`

说明：后端在 `server/src/index.js` 中使用**绝对路径**挂载静态目录，避免因启动目录不同导致静态资源 404。

### 前端开发代理说明

- `/api` 代理到 `http://localhost:3001`
- `/images` 也代理到 `http://localhost:3001`

因此在前端可直接使用 `imageUrl: '/images/xxx.png'`，开发与生产保持一致。

## 可用的 API 端点

### 健康检查
- `GET /api/health` - 服务器状态检查

### 课程相关
- `GET /api/courses` - 获取所有课程
- `GET /api/courses?stage=xiaoxue` - 按学段筛选课程
- `GET /api/courses/:id` - 获取单个课程详情
- `GET /api/courses/stage/:stage` - 按学段获取课程

**学段参数值**: `xiaoxue` | `chuxue` | `gaoxue` | `daxue`

### 静态文件服务
- `GET /images/<filename>` - 获取课程图片（存放在 `server/public/images/` 目录）

**示例**：`http://localhost:3001/images/xiaoxue-001.png`

## 添加课程图片

1. 将图片文件放入 `server/public/images/` 目录
2. 在 `server/src/data/courses.js` 中填写 `imageUrl` 字段：
  ```javascript
  imageUrl: '/images/your-image.png'
  ```
3. 刷新页面即可看到图片

**图片命名建议**：以课程ID命名，如 `xiaoxue-001.png`、`chuxue-002.jpg`

### 一键从 `页面demo.jpg` 生成并替换素材

根目录执行：

```bash
npm run demo:apply
```

会自动完成：
- 切图输出到 `client/public/demo-assets/`（logo、计划、地域、推荐、背景）
- 课程封面输出到 `server/public/images/`
- 当前页面已接入这些路径，刷新即可看到替换效果

## Bilibili 播放器配置

播放器支持以下 URL 参数：

- `bvid` - Bilibili 视频ID（必需）
- `page` - 分P号码（默认为1）
- `high_quality` - 1 强制高清（可选）
- `danmaku` - 0 关闭弹幕（可选）
- `autoplay` - 0 不自动播放（可选）
- `as_wide` - 1 宽屏模式（可选）

### 正确的 iframe 宽高比

组件使用 16:9 比例的响应式布局，通过 `aspect-ratio` CSS 属性实现。

## 状态管理架构

使用 Redux Toolkit 的 `coursesSlice` 管理应用状态：

```javascript
{
  courses: [],                // 后端返回的课程列表
  coursesLoading: false,      // 课程加载状态
  coursesError: null,         // 课程加载错误信息
  regions: [...],             // 地域列表
  plans: [...],               // 计划列表
  stages: [...],              // 学段列表
  selectedRegion: null,       // 当前选中地域
  selectedPlan: 'qingmiao',   // 当前选中计划
  currentCourse: null         // 当前播放的课程
}
```

### Redux Actions

- `fetchCourses()` - 从 `/api/courses` 拉取课程
- `selectRegion(regionId)` - 选择地域
- `selectPlan(planId)` - 选择计划
- `selectCourse(course)` - 选择课程
- `clearSelection()` - 清除选择

## 后续扩展建议

1. **数据库集成** - 迁移到 PostgreSQL + Prisma
2. **用户认证** - 添加 JWT 认证
3. **学习进度** - 追踪用户的观看进度
4. **成就系统** - 实现游戏化徽章系统
5. **家谱编修** - 实现宗谱编辑功能
6. **UGC 内容** - 支持用户上传口述史
7. **实时交互** - 集成 WebSocket 实时通知
8. **搜索功能** - 全平台内容搜索

## 技术栈

### 前端
- React 18.2
- Redux Toolkit
- React Router
- Vite
- CSS 3

### 后端
- Node.js
- Express.js
- CORS 中间件

## 文档索引

- [快速参考指南](./QUICK_REFERENCE.md)
- [项目完成报告](./PROJECT_COMPLETION_REPORT.md)
- [图片素材与后端图片字段维护规范](./IMAGE_PLACEHOLDER_GUIDE.md)

## 开发指南

### 添加新课程

在 `/server/src/data/courses.js` 中修改 `coursesData` 数组（前端会通过 `/api/courses` 自动读取）：

```javascript
{
  id: 'stage-xxx',
  title: '课程标题',
  stage: 'xiaoxue|chuxue|gaoxue|daxue',
  bvid: 'BVxxxxxx',
  // ... 其他字段
}
```

### 创建新组件

1. 在 `client/src/components/` 创建新组件文件
2. 在同目录创建对应的 CSS 文件
3. 导入并在需要的地方使用

## 注意事项

- **CORS 已启用** - 允许来自 `http://localhost:5173` 的请求
- **Bilibili 播放器** - 使用 iframe 嵌入，确保浏览器允许第三方 iframe
- **CSP 策略** - 可能需要配置后端的 Content Security Policy

## Render 一体化部署（前后端同服务）

本项目已支持“单个 Render Web Service”部署：
- 构建阶段打包前端 `client/dist`
- 运行阶段由 Express 同时提供 API 与前端静态页面

### 方式一：使用 `render.yaml`（推荐）

1. 将仓库推送到 GitHub
2. 在 Render 里选择 **New + Blueprint**
3. 选择该仓库，Render 会自动读取根目录 `render.yaml`
4. 等待部署完成后，访问分配的 URL

### 方式二：手动创建 Web Service

- Root Directory：仓库根目录（不要填 `client` 或 `server`）
- Build Command：
  ```bash
  npm install --prefix server && npm install --prefix client && npm run build --prefix client
  ```
- Start Command：
  ```bash
  npm start --prefix server
  ```

部署后：
- `/api/*` 走后端接口
- `/images/*` 走后端静态资源
- 其它前端路由由 `client/dist/index.html` 托管

## 许可证

MIT License

## 贡献

欢迎提交 Pull Request 和 Issue
