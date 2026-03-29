# 图片素材预留位置说明

本文档列出了所有需要替换成真实图片的位置。目前使用带颜色和文字的色块作为占位符。

## 1. 课程卡片 - 图片预留位置

**文件**: `client/src/components/CourseMatrixCard.jsx`

### 预留位置说明：
- **属性**: `course.imageUrl` - 课程的主图片URL
- **颜色块**: `course.imageColor` - 占位符背景颜色
- **当前状态**: 如果 `imageUrl` 为 `null`，显示带颜色的占位符块

### 替换方式：
**方式 1：本地文件（推荐用于开发）**

1. 将图片复制到 `server/public/images/` 目录
2. 在 `server/src/data/courses.js` 中填写：
```javascript
{
  id: 'xiaoxue-001',
  title: '方言童谣动画屋',
  bvid: 'BV1Wj411w7K1',
  imageUrl: '/images/xiaoxue-001.png',  // 相对路径
  imageColor: '#FF9800',
  // ... 其他字段
}
```

**方式 2：CDN URL（部署时推荐）**
```javascript
imageUrl: 'https://your-cdn.com/images/xiaoxue-001.jpg'
```

### 尺寸建议：
- 推荐宽高比：**16:9**
- 推荐分辨率：**至少 400x225px**（为了适应不同屏幕尺寸）
- 推荐格式：**WebP 或 JPG**（以获得最好的性能）

---

## 2. 推荐面板 - 轮播图

**文件**: `client/src/components/RecommendationPanel.jsx`

### 预留位置说明：
- 位置：右侧面板中的 `.carousel-section`
- 当前状态：使用 `<img>` 标签，但图片来自 `placeholder.com`
- 占位内容：
  1. "新疆北黑土文化区"
  2. "内蒙古草原文化区"

### 替换方式：
将这两个 `<img>` 标签替换为实际的地域图片URL：

```jsx
<div className="carousel-item">
  <img
    src="https://your-cdn.com/xinjiang-image.jpg"  // 替换此URL
    alt="新疆文化区"
    className="carousel-image"
  />
  <span className="carousel-label">新疆黑土文化区</span>
</div>
```

### 尺寸建议：
- 推荐宽高比：**5:4**（当前 CSS 设置为 `height: 120px`）
- 推荐分辨率：**至少 300x240px**
- 推荐格式：**JPG 或 WebP**

---

## 3. 全局导航栏 - Logo

**文件**: `client/src/components/GlobalHeader.jsx`

### 当前状态：
- 使用圆形背景色块作为 Logo
- 内部显示文字"文脉e家"

### 替换方式：
在 `GlobalHeader.jsx` 中替换 `.logo-circle`：

```jsx
<div className="logo-circle">
  {/* 方式1：使用图片 */}
  <img src="https://your-cdn.com/logo.png" alt="文脉e家" className="logo-image" />
  
  {/* 方式2：保持现有设计，只改变背景色 */}
  {/* 文脉e家 */}
</div>
```

配套 CSS 修改：
```css
.logo-circle {
  overflow: hidden;
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
```

### 尺寸建议：
- 推荐大小：**50x50px**（对应当前 CSS）
- 推荐格式：**PNG 或 SVG**（支持透明背景）
- 推荐风格：最好是圆形或方形的 Logo

---

## 4. 左侧地域侧栏 - 地域图标

**文件**: `client/src/components/RegionSidebar.jsx`

### 当前状态：

- 使用简单的文字标签和颜色边框
- 没有地域特征图片

### 可选的改进方案：
在每个地域按钮前添加一个小图标或缩略图：

```jsx
<button className={`region-btn`}>
  <img src={`/images/regions/${region.id}.jpg`} className="region-icon" />
  <span className="region-name">{region.name}</span>
  <span className="region-desc">{region.description}</span>
</button>
```

### 推荐图标尺寸：
- **32x32px** - 地域特征图标或缩略图
- 格式：**PNG 或 SVG**

---

## 5. 顶部导航栏 - 菜单图标

**文件**: `client/src/components/GlobalHeader.jsx`

### 当前状态：
- 使用 Emoji 表情作为菜单图标（🏠, 📋, 🗺️, 🛍️, 👥）

### 替换方式（可选）：
用真实的 Icon 库替换 Emoji，例如使用 `react-icons`：

```bash
npm install react-icons
```

然后在组件中使用：
```jsx
import { GoHome, GoListUnordered } from 'react-icons/go';

<nav className="header-nav">
  <a href="#" className="nav-item">
    <GoHome className="nav-icon" />
    <span className="nav-text">首页</span>
  </a>
  {/* ... 其他菜单项 */}
</nav>
```

---

## 6. 课程卡片 - 标签样式

**文件**: `client/src/components/CourseMatrixCard.jsx`

### 当前状态：
- 标签使用灰色背景
- 可显示多个标签（如 "动画"、"方言"、"趣味"）

### 改进方案：
添加具有颜色的标签图标：

```jsx
<div className="course-tags">
  {course.tags.map((tag, idx) => (
    <span 
      key={idx} 
      className="tag"
      style={{ background: getTagColor(tag) }}  // 动态颜色
    >
      {getTagEmoji(tag)} {tag}  // 添加标签 emoji
    </span>
  ))}
</div>
```

---

## 7. 后端数据结构更新

**文件**: `server/src/data/courses.js`

### 添加以下字段以支持图片：

```javascript
{
  id: 'xiaoxue-001',
  title: '方言童谣动画屋',
  stage: 'xiaoxue',
  category: 'dialect',
  description: '学习地方方言和童谣的有趣动画',
  bvid: 'BV1Wj411w7K1',
  
  // 新增图片相关字段
  imageUrl: 'https://cdn.example.com/xiaoxue-001.jpg',  // 课程封面图
  thumbnailUrl: 'https://cdn.example.com/xiaoxue-001-thumb.jpg', // 缩略图
  galleryUrls: [  // 图片库（用于画廊展示）
    'https://cdn.example.com/xiaoxue-001-1.jpg',
    'https://cdn.example.com/xiaoxue-001-2.jpg'
  ],
  
  imageColor: '#FF9800',  // 占位符背景色（保留作为备用）
  instructorAvatar: 'https://cdn.example.com/instructor-avatar.jpg', // 讲师头像
  
  // ... 其他字段
}
```

---

## 7.1 后端数据驱动下的图片字段维护规范

当前项目已改为**前端统一从 `/api/courses` 读取课程数据**，因此图片字段请只在 `server/src/data/courses.js` 维护，避免前后端字段不一致。

### `server/public` 与 `server/src` 关系

- `server/src`：代码目录（API 路由、课程数据、服务入口）
- `server/public`：静态资源目录（图片等文件）
- 访问规则：`server/public/images/a.png` 会被映射为 `/images/a.png`
- 开发环境中，前端通过 Vite 代理把 `/images/*` 转发到后端 `3001`

后端支持两种图片来源：
1. **本地静态文件**（开发用）：图片存放在 `server/public/images/`，URL 为 `/images/xxx.png`
2. **远程 CDN**（生产用）：直接填 CDN 完整 URL
### 字段规范（课程对象）

- `imageUrl`：课程封面图 URL
  - 类型：`string | null`
  - 规则：
    - 本地：相对路径 `/images/xxx.png` 或 `/images/xxx.jpg`
    - CDN：完整 URL `https://cdn.example.com/...`
    - 缺失图：`null`（用 `imageColor` 作为占位底色）
- `imageColor`：封面占位底色
  - 类型：`string`
  - 规则：必须为合法十六进制颜色（如 `#FF9800`）
- `tags`：课程标签
  - 类型：`string[]`
  - 规则：至少 1 个标签，建议 2~4 个

### 维护原则

1. **单一数据源**：只改后端 `coursesData`，不在前端维护重复课程列表。
2. **图片管理**：
  - 开发环境：图片放在 `server/public/images/`，URL 用 `/images/xxx.png`
  - 生产环境：图片上传到 CDN，URL 改为完整 CDN 地址
3. **先可用再美化**：没有正式图片时，`imageUrl: null` + 合理 `imageColor` 即可上线。
4. **字段完整性**：新增课程时始终同时提供 `imageUrl`、`imageColor`、`tags`。
5. **开发心智负担低**：只需把图片复制到 `public/images/` 并填写相对路径，无需考虑 URL 完整性。

### 推荐写法

**开发环境**（图片在项目内）：
```javascript
{
  id: 'chuxue-001',
  title: '老宅子建筑智慧',
  stage: 'chuxue',
  category: 'architecture',
  description: '探索传统建筑的文化智慧',
  bvid: 'BV1oaXHBsECW',
  imageUrl: '/images/chuxue-001.png',  // 本地相对路径
  imageColor: '#2196F3',
  tags: ['建筑', '文化']
}
```

**生产环境**（图片在 CDN）：
```javascript
{
  id: 'chuxue-001',
  imageUrl: 'https://cdn.example.com/courses/chuxue-001.png',  // 完整 CDN URL
  imageColor: '#2196F3',
  // ... 其他字段
}
```

### 上线前检查清单

- [ ] 每条课程都包含 `imageUrl` 与 `imageColor`
- [ ] 所有本地 `imageUrl` 的文件存在于 `server/public/images/`
- [ ] 所有 CDN `imageUrl` 可在浏览器直接打开
- [ ] 所有 `imageColor` 为合法十六进制颜色
- [ ] 缺图课程均可正常显示占位色块（`imageUrl: null` + `imageColor`）
- [ ] 修改后前端刷新可见（课程来自 `/api/courses`）

---

## 8. 文件上传流程（推荐）

### 使用 CDN 的流程：
1. **本地开发**: 使用 `placeholder.com` 或本地图片文件
2. **测试阶段**: 将图片上传到云 CDN（阿里云 OSS、AWS S3、腾讯云 COS 等）
3. **生产部署**: 更新数据库中的图片 URL 指向 CDN

### 配置示例（后端）：
```javascript
// server/.env
CDN_BASE_URL=https://your-cdn.example.com/wenmai/
UPLOAD_PATH=course-images/

// 在课程数据中使用
imageUrl: `${process.env.CDN_BASE_URL}${process.env.UPLOAD_PATH}xiaoxue-001.jpg`
```

---

## 9. 性能优化建议

### 图片格式转换：
- 使用 **WebP** 格式以获得更小的文件大小（支持现代浏览器）
- 提供 **JPG** 作为备选（兼容旧浏览器）

### 响应式图片：
```html
<img 
  srcset="
    image-small.jpg 400w,
    image-medium.jpg 800w,
    image-large.jpg 1200w
  "
  sizes="(max-width: 600px) 100vw, 50vw"
  src="image-medium.jpg"
  alt="课程图片"
/>
```

### 懒加载（Lazy Loading）：
```html
<img 
  src="image.jpg" 
  loading="lazy"
  alt="课程图片"
/>
```

或使用 React 库：
```bash
npm install react-lazy-load-image-component
```

---

## 10. 需要添加的图片清单

根据当前数据，需要准备以下图片：

### 课程图片（8张）：
- [ ] 小学段 - 方言童谣动画屋
- [ ] 小学段 - 方言子弟朗读屋
- [ ] 初中段 - 老宅子建筑智慧
- [ ] 初中段 - 虚拟漫游入口
- [ ] 高中段 - PBL项目
- [ ] 高中段 - 非遗数字化保护
- [ ] 大学段 - 工坊实战
- [ ] 大学段 - 案例分析

### 地域图片（4张）：
- [ ] 燕赵文化区
- [ ] 三秦文化区
- [ ] 吴越文化区
- [ ] 新疆荒漠绿洲文化区

### 推荐轮播图（2张）：
- [ ] 新疆北黑土文化区
- [ ] 内蒙古草原文化区

### Logo 和图标（可选）：
- [ ] 平台 Logo（文脉e家）
- [ ] 菜单图标集（如果替换 Emoji）

**总计**: 至少 **14 张**主要图片（推荐准备 20+ 张用于区分宽度变化）

---

## 总结

所有图片的当前占位符策略：
1. **课程卡片**: 用 `course.imageColor` 背景色块代替
2. **推荐面板**: 用 `placeholder.com` 临时图片代替
3. **导航、地域等**: 用 Emoji 表情代替

替换时只需：
1. 准备真实的图片文件或 CDN URL
2. 更新数据库/代码中的 URL 字段
3. 测试图片是否正确加载
4. 验证响应式布局和性能

所有组件都已准备好支持真实图片，只需更新数据即可！
