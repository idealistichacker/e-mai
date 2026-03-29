import express from 'express';

const router = express.Router();

// 健康检查端点
router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: '文脉e家 API 正在运行',
    timestamp: new Date().toISOString()
  });
});

export default router;
