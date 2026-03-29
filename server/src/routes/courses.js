import express from 'express';
import { coursesData } from '../data/courses.js';

const router = express.Router();

/**
 * GET /api/courses
 * 获取所有课程，支持按学段筛选
 * Query: ?stage=xiaoxue|chuxue|gaoxue
 */
router.get('/', (req, res) => {
  const { stage } = req.query;
  
  let courses = coursesData;
  
  if (stage) {
    courses = coursesData.filter(course => course.stage === stage);
  }
  
  res.json({
    success: true,
    data: courses,
    total: courses.length
  });
});

/**
 * GET /api/courses/:id
 * 获取单个课程详情
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const course = coursesData.find(c => c.id === id);
  
  if (!course) {
    return res.status(404).json({
      success: false,
      error: '课程不存在'
    });
  }
  
  res.json({
    success: true,
    data: course
  });
});

/**
 * GET /api/courses/stage/:stage
 * 按学段获取所有课程
 */
router.get('/stage/:stage', (req, res) => {
  const { stage } = req.params;
  const validStages = ['xiaoxue', 'chuxue', 'gaoxue'];
  
  if (!validStages.includes(stage)) {
    return res.status(400).json({
      success: false,
      error: '无效的学段参数'
    });
  }
  
  const courses = coursesData.filter(c => c.stage === stage);
  
  res.json({
    success: true,
    data: courses,
    total: courses.length
  });
});

export default router;
