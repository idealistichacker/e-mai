import React from 'react';
import '../styles/GlobalHeader.css';

/**
 * GlobalHeader - 全局顶部导航栏
 */
const GlobalHeader = () => {
  const menu = [
    { id: 'home', label: '首页' },
    { id: 'plan', label: '计划中心' },
    { id: 'map', label: '文化地图' },
    { id: 'mall', label: '文创商城' },
    { id: 'community', label: '社区互动' }
  ];

  return (
    <header className="global-header">
      <div className="header-container">
        <div className="logo-section">
          <img
            src="/demo-assets/header/logo-wordmark.png"
            alt="文脉e家"
            className="logo-image"
          />
        </div>
        <nav className="header-nav">
          {menu.map(item => (
            <a key={item.id} href="#" className="nav-item">
              <span className="nav-text">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default GlobalHeader;
