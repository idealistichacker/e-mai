import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourse } from '../store/coursesSlice';
import '../styles/CourseMatrixCard.css';

/**
 * CourseMatrixCard - 内容矩阵中的课程卡片
 * 用带颜色的块替代图片，预留图片URL位置
 */
const CourseMatrixCard = ({ course }) => {
  const dispatch = useDispatch();
  const apiBase = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
  const imageSrc = course.imageUrl
    ? course.imageUrl.startsWith('/images/')
      ? `${apiBase}${course.imageUrl}`
      : course.imageUrl
    : null;

  const handleClick = () => {
    dispatch(selectCourse(course));
  };

  return (
    <div className="course-matrix-card" onClick={handleClick}>
      <div className="card-image-wrapper">
        {/* 图片预留位置：imageUrl可在此处替换为真实图片 */}
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={course.title}
            className="card-image"
          />
        ) : (
          <div
            className="card-image-placeholder"
            style={{ backgroundColor: course.imageColor }}
          >
            <span className="placeholder-text">{course.title}</span>
          </div>
        )}
      </div>
      <div className="card-content">
        <h4 className="card-title">{course.title}</h4>
        <div className="card-tags">
          {course.tags.map((tag, idx) => (
            <span key={idx} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseMatrixCard;
