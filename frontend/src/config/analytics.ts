import { config } from './config';

// Google Analytics 配置
export const GA_TRACKING_ID = config.analytics.trackingId;

// GA 初始化函数
export const initGA = () => {
  // 只在生产环境且启用GA时初始化
  if (!config.analytics.enabled) {
    console.log('Google Analytics disabled in development mode');
    return;
  }

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID);
    console.log('Google Analytics initialized');
  }
};

// 页面浏览事件
export const pageview = (url: string) => {
  if (!config.analytics.enabled) return;
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// 自定义事件
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (!config.analytics.enabled) return;
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// 声明全局 gtag 类型
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: any
    ) => void;
    dataLayer: any[];
  }
} 