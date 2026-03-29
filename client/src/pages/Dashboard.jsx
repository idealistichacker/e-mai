import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses, selectCourse } from '../store/coursesSlice';
import GlobalHeader from '../components/GlobalHeader';
import RegionSidebar from '../components/RegionSidebar';
import PlanSelector from '../components/PlanSelector';
import ContentMatrix from '../components/ContentMatrix';
import RecommendationPanel from '../components/RecommendationPanel';
import BilibiliPlayer from '../components/BilibiliPlayer';
import '../styles/Dashboard.css';

/**
 * Dashboard - 主仪表板页面
 * 实现复杂的双分类导航+内容矩阵布局
 */
const Dashboard = () => {
  const dispatch = useDispatch();
  const currentCourse = useSelector(state => state.courses.currentCourse);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleClosePlayer = () => {
    dispatch(selectCourse(null));
  };

  return (
    <div className={`dashboard ${currentCourse ? 'modal-open' : ''}`}>
      {/* 顶部全局导航栏 */}
      <GlobalHeader />

      <div className="dashboard-container">
        {/* 左侧：地域分类导航 */}
        <aside className="left-column">
          <RegionSidebar />
        </aside>

        {/* 中间：主内容区域 */}
        <main className="main-column">
          {/* 计划选择器 */}
          <PlanSelector />

          {/* 内容矩阵 */}
          <ContentMatrix />
        </main>

        {/* 右侧：推荐面板 */}
        <aside className="right-column">
          <RecommendationPanel />
        </aside>
      </div>

      {/* 底部播放器浮窗 - 选中课程时显示 */}
      {currentCourse && (
        <div 
          className="player-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleClosePlayer();
            }
          }}
        >
          <div className="player-modal">
            <div className="modal-header">
              <h3>{currentCourse.title}</h3>
              <button className="close-btn" onClick={handleClosePlayer}>✕</button>
            </div>
            <div className="modal-body">
              <BilibiliPlayer
                bvid={currentCourse.bvid}
                title={currentCourse.title}
              />
              <div className="course-details">
                <h4>{currentCourse.title}</h4>
                <p>{currentCourse.description}</p>
                <div className="course-meta">
                  <span className="meta-item">📚 {currentCourse.category}</span>
                  <span className="meta-item">⏱️ {currentCourse.duration ? Math.floor(currentCourse.duration / 60) : 45} 分钟</span>
                  <span className="meta-item">👁️ {currentCourse.views || Math.floor(Math.random() * 10000 + 1000)} 次观看</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
