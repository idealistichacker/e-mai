import React from 'react';
import '../styles/BilibiliPlayer.css';

/**
 * MinyiCoursePlayer - 自定义Bilibili播放器组件
 * 根据文档要求，使用iframe嵌入B站视频，支持响应式布局
 */
const BilibiliPlayer = ({ bvid, pageNumber = 1, title = '' }) => {
  if (!bvid) {
    return (
      <div className="player-container">
        <div className="player-placeholder">
          <p>选择课程开始学习</p>
        </div>
      </div>
    );
  }

  // 构建Bilibili iframe的URL 
  // 参数说明：
  // - bvid: 视频ID
  // - page: 分P号码
  // - high_quality: 1 强制最高清晰度
  // - danmaku: 0 关闭弹幕
  // - autoplay: 0 不自动播放
  // - as_wide: 1 宽屏模式
  const iframeUrl = `https://player.bilibili.com/player.html?bvid=${bvid}&page=${pageNumber}&high_quality=1&danmaku=0&autoplay=0&as_wide=1`;

  return (
    <div className="player-container">
      <div className="player-wrapper">
        <iframe
          className="bilibili-player"
          src={iframeUrl}
          title={title || 'Bilibili Video Player'}
          scrolling="no"
          border="0"
          frameBorder="no"
          framespacing="0"
          allowFullScreen="allowFullScreen"
          allow="autoplay; encrypted-media"
        />
      </div>
      {title && <p className="player-title">{title}</p>}
    </div>
  );
};

export default BilibiliPlayer;
