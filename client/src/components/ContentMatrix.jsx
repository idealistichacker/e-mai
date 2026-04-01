import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../store/coursesSlice';
import CourseMatrixCard from './CourseMatrixCard';
import '../styles/ContentMatrix.css';

/**
 * ContentMatrix - 二维内容矩阵
 * 纵轴为学段（小学、初中、高中、大学）
 * 横轴为课程类别
 */
const ContentMatrix = () => {
  const dispatch = useDispatch();
  const { courses, stages, coursesLoading, coursesError, selectedPlan, plans } = useSelector(state => state.courses);

  const currentPlanName = plans.find(p => p.id === selectedPlan)?.name || '青苗计划';

  // 按选中计划过滤课程
  const planCourses = courses.filter(c => c.plan === selectedPlan);
  const planStages = stages.filter(s => s.plan === selectedPlan);

  // 按学段分组课程
  const coursesByStage = {};
  planStages.forEach(stage => {
    coursesByStage[stage.id] = planCourses.filter(c => c.stage === stage.id);
  });

  return (
    <div key={selectedPlan} className="content-matrix fade-in">
      <div className="matrix-title-bar">{currentPlanName}</div>
      {coursesLoading ? (
        <div className="no-courses">课程加载中...</div>
      ) : coursesError ? (
        <div className="load-state">
          <div className="no-courses">课程加载失败：{coursesError}</div>
          <button
            type="button"
            className="retry-btn"
            onClick={() => dispatch(fetchCourses())}
          >
            重新加载
          </button>
        </div>
      ) : (
        <div className="matrix-grid">
          {planStages.map(stage => (
            <div key={stage.id} className="stage-group">
              <div className="stage-header">
                <span className="stage-name">{stage.name}</span>
              </div>
              <div className="stage-content">
                {coursesByStage[stage.id].length > 0 ? (
                  <div className="courses-row">
                    {coursesByStage[stage.id].map(course => (
                      <CourseMatrixCard key={course.id} course={course} />
                    ))}
                  </div>
                ) : (
                  <div className="no-courses">暂无课程</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentMatrix;
