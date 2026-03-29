import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectStage } from '../store/coursesSlice';
import '../styles/StageSelector.css';

/**
 * StageSelector - 学段选择器组件
 * 用户可以选择小学、初中、高中段
 */
const StageSelector = () => {
  const dispatch = useDispatch();
  const selectedStage = useSelector(state => state.courses.selectedStage);

  const stages = [
    { id: 'xiaoxue', label: '小学段', icon: '📚', color: '#FF6B6B' },
    { id: 'chuxue', label: '初中段', icon: '📖', color: '#4ECDC4' },
    { id: 'gaoxue', label: '高中段', icon: '📚', color: '#45B7D1' }
  ];

  const handleStageSelect = (stageId) => {
    dispatch(selectStage(stageId));
  };

  return (
    <div className="stage-selector">
      <h2 className="selector-title">选择学段</h2>
      <div className="stages-grid">
        {stages.map(stage => (
          <button
            key={stage.id}
            className={`stage-button ${selectedStage === stage.id ? 'active' : ''}`}
            onClick={() => handleStageSelect(stage.id)}
            style={{
              '--stage-color': stage.color
            }}
          >
            <span className="stage-icon">{stage.icon}</span>
            <span className="stage-label">{stage.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StageSelector;
