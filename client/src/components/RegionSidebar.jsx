import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRegion } from '../store/coursesSlice';
import '../styles/RegionSidebar.css';

/**
 * RegionSidebar - 左侧地域选择面板
 * 展示各文化区的分类
 */
const RegionSidebar = () => {
  const dispatch = useDispatch();
  const { regions } = useSelector(state => state.courses);
  const selectedRegion = useSelector(state => state.courses.selectedRegion);

  const handleRegionSelect = (regionId) => {
    dispatch(selectRegion(regionId));
  };

  return (
    <aside className="region-sidebar">
      <h3 className="sidebar-title">双分类导航+内容矩阵</h3>
      <div className="region-list">
        {regions.map(region => (
          <button
            key={region.id}
            className={`region-btn ${selectedRegion === region.id ? 'active' : ''}`}
            onClick={() => handleRegionSelect(region.id)}
            style={{ borderColor: selectedRegion === region.id ? region.color : undefined }}
          >
            <span className="region-name">{region.name}</span>
            <span className="region-desc">{region.description}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default RegionSidebar;
