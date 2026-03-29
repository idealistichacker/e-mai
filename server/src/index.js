import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import coursesRouter from './routes/courses.js';
import healthRouter from './routes/health.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
const clientDistDir = path.resolve(__dirname, '../../client/dist');
const clientIndexPath = path.join(clientDistDir, 'index.html');
const hasClientDist = fs.existsSync(clientIndexPath);

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(publicDir)); // 提供静态文件服务（支持 /images/... 访问）

// 请求日志中间件
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// 路由
app.use('/api/health', healthRouter);
app.use('/api/courses', coursesRouter);

if (hasClientDist) {
  app.use(express.static(clientDistDir));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
      return next();
    }

    return res.sendFile(clientIndexPath);
  });
}

// 404 处理
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📺 Video platform API ready`);
  if (hasClientDist) {
    console.log(`🖥️ Frontend static files enabled from client/dist`);
  }
});

export default app;
