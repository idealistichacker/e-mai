import React from 'react';
import { useDispatch } from 'react-redux';
import { selectCourse } from '../store/coursesSlice';
import '../styles/CourseCard.css';

/**
 * CourseCard - 课程卡片组件
 * 展示单个课程信息及标签
 */
const CourseCard = ({ course }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(selectCourse(course));
  };

  return (
    <div className="course-card" onClick={handleClick}>
      <div className="course-cover">{course.cover}</div>
      <div className="course-content">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-description">{course.description}</p>
        <div className="course-tags">
          {course.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
