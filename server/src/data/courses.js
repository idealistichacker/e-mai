/**
 * 课程数据集合
 * 包含小学段、初中段、高中段、大学段各多个课程
 */
export const coursesData = [
  {
    id: 'xiaoxue-001',
    title: '枣娃的故事',
    plan: 'qingmiao',
    stage: 'xiaoxue',
    category: 'culture',
    description: '乐陵金丝小枣文化启蒙课',
    bvid: 'BV1TwXSBSEqN',
    pageNumber: 1,
    imageUrl: '/images/枣娃的故事.jpg',
    imageColor: '#FF9800',
    tags: ['启蒙', '小学'],
    duration: 1200,
    instructor: '课程讲师',
    createdAt: '2024-01-15',
    views: 5420,
    completed: false
  },
  {
    id: 'chuxue-001',
    title: '乐陵泥土的艺术',
    plan: 'qingmiao',
    stage: 'chuxue',
    category: 'craft',
    description: '传统农耕与泥土文化认知课程',
    bvid: 'BV1TcXSBnEZm',
    pageNumber: 1,
    imageUrl: '/images/乐陵泥土的艺术.jpg',
    imageColor: '#2196F3',
    tags: ['初中', '农耕'],
    duration: 1800,
    instructor: '课程讲师',
    createdAt: '2024-01-20',
    views: 4120,
    completed: false
  },
  {
    id: 'gaoxue-001',
    title: '为“金丝小枣”设计未来',
    plan: 'qingmiao',
    stage: 'gaoxue',
    category: 'project',
    description: 'PBL项目课：金丝小枣文化创新设计',
    bvid: 'BV1KNXSBmE7G',
    pageNumber: 1,
    imageUrl: '/images/为金丝小枣设计未来.jpg',
    imageColor: '#FF5722',
    tags: ['高中', 'PBL'],
    duration: 2400,
    instructor: '课程讲师',
    createdAt: '2024-01-25',
    views: 3450,
    completed: false
  },
  {
    id: 'guiyan-001',
    title: '归雁归乡创业指导',
    plan: 'guiyan',
    stage: 'gaoxue', // 暂挂靠在高中段，以免无法显示，或前端可不分段显示
    category: 'project',
    description: '中青年回乡创业政策与文化指引',
    bvid: 'BV1Wj411w7K1',
    pageNumber: 1,
    imageUrl: '/images/daxue-001.png',
    imageColor: '#4ECDC4',
    tags: ['创业', '寻根'],
    duration: 3000,
    instructor: '青年讲师',
    createdAt: '2024-03-01',
    views: 1250,
    completed: false
  },
  {
    id: 'sangyu-001',
    title: '桑榆非遗记忆长廊',
    plan: 'sangyu',
    stage: 'gaoxue', // 暂挂靠在高中段
    category: 'culture',
    description: '中老年非遗文化回忆与传承',
    bvid: 'BV1Wj411w7K1',
    pageNumber: 1,
    imageUrl: '/images/daxue-002.png',
    imageColor: '#45B7D1',
    tags: ['非遗', '长者'],
    duration: 2500,
    instructor: '非遗传承人',
    createdAt: '2024-03-05',
    views: 3820,
    completed: false
  }
];

/**
 * 学段信息
 */
export const stagesInfo = {
  xiaoxue: {
    name: '小学段',
    color: '#FF6B6B',
    description: '为小学生设计的文化启蒙课程',
    icon: '📚'
  },
  chuxue: {
    name: '初中段',
    color: '#4ECDC4',
    description: '为初中生设计的文化认知课程',
    icon: '📖'
  },
  gaoxue: {
    name: '高中段',
    color: '#45B7D1',
    description: '为高中生设计的文化研究课程',
    icon: '📚'
  },
  daxue: {
    name: '大学段',
    color: '#9C27B0',
    description: '为大学生设计的文化深度研究课程',
    icon: '🎓'
  }
};

/**
 * 地域信息
 */
export const regionsData = [
  { id: 'yanzhao', name: '燕赵文化区', description: '河北/山西/陕西中北部', color: '#8B0000' },
  { id: 'sanyuan', name: '三秦文化区', description: '陕西中南部', color: '#CD5C5C' },
  { id: 'wuyue', name: '吴越文化区', description: '浙江/江南', color: '#20B2AA' },
  { id: 'xinjiang', name: '新疆荒漠绿洲文化区', description: '新疆', color: '#6495ED' }
];

/**
 * 计划信息
 */
export const plansData = [
  { id: 'qingmiao', name: '青苗计划', color: '#FF6B6B', description: '青少年文化启蒙' },
  { id: 'guiyan', name: '归雁计划', color: '#4ECDC4', description: '中青年寻根文化' },
  { id: 'sangyu', name: '桑榆计划', color: '#45B7D1', description: '中老年生命价值' }
];
