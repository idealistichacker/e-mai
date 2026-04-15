# 📱 快速参考指南

## 🚀 快速启动

### 推荐：根目录一键启动（自动热更新）

```bash
cd e
npm run dev
```

说明：会同时启动前后端，前端改动自动 HMR，后端改动自动重启。

### 分开启动（可选）

```bash
# 后端
cd server && npm run dev       # 端口 3001

# 前端
cd client && npm run dev       # 端口 5173
```

## 📍 访问地址

- **前端应用**: http://localhost:5173
- **后端 API**: http://localhost:3001
- **后端静态图片**: http://localhost:3001/images/xiaoxue-001.png
- **API 文档**: 见下方

---

## 🎯 核心功能

| 功能 | 位置 | 说明 |
|------|------|------|
| **阶段动态渲染** | 课程矩阵 | 青苗(小学/初中/高中)、归雁(归雁课程)、桑榆(桑榆课程) |
| **课程矩阵** | 中间区域 | 根据计划动态过滤类目并丝滑淡入 |
| **课程数据源** | 后端 API | 前端统一读取 `/api/courses` |
| **地域导航** | 左侧边栏 | 5大文化区可选 |
| **计划切换** | 中间顶部 | 青苗、归雁、桑榆3个计划 |
| **推荐面板** | 右侧 | 活动推荐、轮播、搜索 |
| **视频播放** | 模态框 | 点击课程卡显示全屏播放器 |
| **加载重试** | 课程矩阵 | 请求失败时显示“重新加载”按钮 |

---

## 🎨 按计划与阶段分类

| 计划 | 阶段 (Stage) | 课程数 | 包含课程 |
|------|--------|------|---------|
| **青苗计划** | **小学** | 1 | 枣娃的故事 |
| **青苗计划** | **初中** | 1 | 乐陵泥土的艺术 |
| **青苗计划** | **高中** | 1 | 为“金丝小枣”设计未来 |
| **归雁计划** | **归雁课程** | 1 | 归乡创业指导 |
| **桑榆计划** | **桑榆课程** | 1 | 非遗记忆长廊 |

---

## 🖼️ 图片预留位置

### 立即需要更新
1. **课程卡片** - 8张课程封面 (16:9比例)
   ```javascript
   // 开发环境（推荐）
   course.imageUrl = '/images/xiaoxue-001.png'

   // 生产环境（可选）
   course.imageUrl = 'https://cdn.example.com/course-image.jpg'
   ```

2. **轮播图** - 2张地域图片 (5:4比例)
   ```jsx
   <img src="地域文化区图片" alt="..." />
   ```

### 详细说明
👉 见 [IMAGE_PLACEHOLDER_GUIDE.md](./IMAGE_PLACEHOLDER_GUIDE.md)

---

## 📊 API 端点

```bash
# 获取所有课程
GET /api/courses

# 获取小学课程
GET /api/courses/stage/xiaoxue

# 按计划查询（暂未实现）
GET /api/courses?plan=qingmiao

# 健康检查
GET /api/health

# 静态图片（Express static）
GET /images/:filename
```

**学段值**: `xiaoxue` | `chuxue` | `gaoxue` | `daxue`

**静态映射**: `server/public/images/*.png` → `/images/*.png`

---

## 🔧 前端文件修改指南

### 添加课程图片
**步骤 1**：复制图片到服务器
```bash
cp your-image.png server/public/images/xiaoxue-001.png
```

**步骤 2**：编辑 `server/src/data/courses.js` 填写路径
```javascript
{
   id: 'xiaoxue-001',
   // ...
   imageUrl: '/images/xiaoxue-001.png',  // 本地相对路径
   imageColor: '#FF9800'                 // 保留作为备用
}
```

**生产部署**：改为 CDN URL
```javascript
imageUrl: 'https://your-cdn.com/courses/xiaoxue-001.jpg'
```

### 修改课程标签
编辑相同文件的 `tags` 数组:
```javascript
tags: ['动画', '方言', '趣味']  // 添加更多标签
```

### 更改颜色方案
编辑对应的 CSS 文件:
- `GlobalHeader.css` - 顶部导航颜色
- `RegionSidebar.css` - 侧边栏颜色
- `PlanSelector.css` - 计划标签颜色
- 或在 `coursesSlice.js` 中修改颜色值

### 课程数据统一来源
- 课程内容请只维护 `server/src/data/courses.js`
- 前端不再维护独立课程列表，会在页面初始化时请求 `/api/courses`

---

## 🎭 组件树结构

```
App
└── Dashboard
    ├── GlobalHeader
    ├── MainContainer
    │   ├── RegionSidebar
    │   ├── MainColumn
    │   │   ├── PlanSelector
    │   │   └── ContentMatrix
    │   │       └── StageGroup[]
    │   │           └── CourseMatrixCard[]
    │   └── RecommendationPanel
    └── PlayerModal (当 currentCourse 存在时)
        ├── BilibiliPlayer
        └── CourseDetails
```

---

## 📱 响应式断点

```css
桌面: 1200px+  → 3列布局 (左 | 中 | 右)
平板: 768-1199px → 2列布局 (左 | 中)，右侧隐藏
手机: <768px   → 1列布局 (中)，左右都隐藏，导航栏支持横向滑动，分类纵轴平铺为顶部横条
```

---

## 🐛 常见问题

**Q: 为什么看不到课程图片?**  
A: 先检查三点：
1) 图片文件是否在 `server/public/images/`
2) `imageUrl` 是否为 `/images/xxx.png`
3) 前后端是否都已重启（Vite 需要读取 `/images` 代理配置）

**Q: 如何添加新课程?**  
A: 在 `server/src/data/courses.js` 的 `coursesData` 中添加新对象。

**Q: 如何修改学段名称?**  
A: 学段展示名编辑 `coursesSlice.js` 中的 `stages`；课程归属学段编辑 `server/src/data/courses.js`。

**Q: 如何改变颜色?**  
A: 修改各组件的对应 CSS 文件中的颜色值。

**Q: Bilibili 视频无法播放?**  
A: 先确认课程是否已从后端成功加载（失败可点“重新加载”），再检查 `bvid` 是否有效、视频是否允许 iframe 外链播放。

---

## 📋 变更日志

### v0.1.1 (2026-03-29)
- ✅ 课程数据改为统一从后端 `/api/courses` 读取
- ✅ 课程加载失败增加“重新加载”按钮

### v0.1.0 (2026-03-29)
- ✅ 页面框架完成
- ✅ 8个示例课程数据
- ✅ 图片占位符系统
- ✅ Redux Toolkit 整合
- ✅ Bilibili 播放器集成
- ✅ 全响应式设计

### 待做事项
- [ ] 实际图片资源替换
- [ ] 更多课程数据
- [ ] 数据库集成
- [ ] 用户认证
- [ ] 进度追踪
- [ ] 推荐算法

---

## 🔗 关键文档

- [README.md](./README.md) - 项目说明
- [IMAGE_PLACEHOLDER_GUIDE.md](./IMAGE_PLACEHOLDER_GUIDE.md) - 图片替换指南
- [PROJECT_COMPLETION_REPORT.md](./PROJECT_COMPLETION_REPORT.md) - 完成报告
- [.github/copilot-instructions.md](./.github/copilot-instructions.md) - Copilot 指南

---

**最后更新**: 2026-03-29  
**当前版本**: 0.1.0  
**项目状态**: 🟢 运行中
