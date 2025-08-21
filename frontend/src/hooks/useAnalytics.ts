import { useEffect } from 'react';
import { event } from '../config/analytics';

// 自定义事件 Hook
export const useAnalytics = () => {
  // 文件上传事件
  const trackFileUpload = (fileCount: number, totalSize: number) => {
    event({
      action: 'file_upload',
      category: 'conversion',
      label: `files_${fileCount}`,
      value: totalSize,
    });
  };

  // 转换完成事件
  const trackConversion = (format: string, quality: number) => {
    event({
      action: 'conversion_complete',
      category: 'conversion',
      label: `${format}_quality_${quality}`,
    });
  };

  // 下载事件
  const trackDownload = (format: string) => {
    event({
      action: 'file_download',
      category: 'conversion',
      label: format,
    });
  };

  // 错误事件
  const trackError = (errorType: string, errorMessage: string) => {
    event({
      action: 'error',
      category: 'system',
      label: `${errorType}: ${errorMessage}`,
    });
  };

  // 页面浏览事件（简化版，不依赖路由）
  const trackPageView = (pageName: string) => {
    event({
      action: 'page_view',
      category: 'navigation',
      label: pageName,
    });
  };

  return {
    trackFileUpload,
    trackConversion,
    trackDownload,
    trackError,
    trackPageView,
  };
}; 