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
  const { courses, stages, coursesLoading, coursesError } = useSelector(state => state.courses);

  // 按学段分组课程
  const coursesByStage = {};
  stages.forEach(stage => {
    coursesByStage[stage.id] = courses.filter(c => c.stage === stage.id);
  });

  return (
    <div className="content-matrix">
      <div className="matrix-title-bar">青苗计划</div>
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
          {stages.map(stage => (
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
