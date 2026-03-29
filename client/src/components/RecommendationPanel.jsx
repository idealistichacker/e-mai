import React from 'react';
import '../styles/RecommendationPanel.css';

/**
 * RecommendationPanel - 右侧推荐面板
 * 展示推荐内容和活动信息
 */
const RecommendationPanel = () => {
  const recommendations = [
    {
      id: 'rec-1',
      title: '🎓 "青苗计划"家谱编修课',
      description: '学习家族史料整理与宗谱编制方法',
      progress: 65,
      color: '#FF6B6B'
    },
    {
      id: 'rec-2',
      title: '🎤 "桑榆计划"口述史直播',
      description: '听长辈讲述地方传统故事',
      progress: 40,
      color: '#4ECDC4'
    },
    {
      id: 'rec-3',
      title: '📚 推荐：零文化技艺',
      description: '民俗故事汇 | 传统手工艺',
      progress: 30,
      color: '#45B7D1'
    }
  ];

  return (
    <aside className="recommendation-panel">
      <div className="panel-cover-wrap">
        <img src="/demo-assets/recommend/banner-top.png" alt="推荐封面" className="panel-cover" />
      </div>
      <div className="recommendations-list">
        {recommendations.map(rec => (
          <div key={rec.id} className="recommendation-item">
            <div className="rec-header">
              <h4 className="rec-title">{rec.title}</h4>
            </div>
            <p className="rec-description">{rec.description}</p>
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${rec.progress}%`,
                    backgroundColor: rec.color
                  }}
                />
              </div>
              <span className="progress-text">{rec.progress}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* 地域轮播图预留区域 */}
      <div className="carousel-section">
        <h4 className="carousel-title">热门地域文化</h4>
        <div className="carousel-placeholder">
          {/* 图片轮播预留位置：后续可替换为实际图片轮播组件 */}
          <div className="carousel-item">
            <img
              src="/demo-assets/recommend/banner-top.png"
              alt="新疆文化区"
              className="carousel-image"
            />
            <span className="carousel-label">新疆黑土文化区</span>
          </div>
          <div className="carousel-item">
            <img
              src="/demo-assets/backgrounds/right-mountain.png"
              alt="草原文化区"
              className="carousel-image"
            />
            <span className="carousel-label">内蒙古草原文化区</span>
          </div>
        </div>
      </div>

      {/* 全局搜索条 */}
      <div className="search-section">
        <button type="button" className="switch-plan-btn">切换计划</button>
      </div>
    </aside>
  );
};

export default RecommendationPanel;
