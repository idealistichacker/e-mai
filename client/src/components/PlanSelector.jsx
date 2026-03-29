import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPlan } from '../store/coursesSlice';
import '../styles/PlanSelector.css';

/**
 * PlanSelector - 计划选择标签组件
 * 用户可以在青苗、归雁、桑榆计划间切换
 */
const PlanSelector = () => {
  const dispatch = useDispatch();
  const { plans, selectedPlan } = useSelector(state => state.courses);
  const planIconMap = {
    qingmiao: '⌂',
    guiyan: '✦',
    sangyu: '♻'
  };

  const handlePlanSelect = (planId) => {
    dispatch(selectPlan(planId));
  };

  return (
    <div className="plan-selector">
      <span className="selector-label">双分类导航+内容矩阵</span>
      <div className="plan-tabs">
        {plans.map(plan => (
          <button
            key={plan.id}
            className={`plan-tab ${selectedPlan === plan.id ? 'active' : ''}`}
            onClick={() => handlePlanSelect(plan.id)}
          >
            <span className="plan-icon">{planIconMap[plan.id] || '•'}</span>
            {plan.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlanSelector;
