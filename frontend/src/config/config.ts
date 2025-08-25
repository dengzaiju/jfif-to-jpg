// 应用配置文件
export const config = {
  // Google Analytics 配置
  analytics: {
    enabled: import.meta.env.PROD, // 生产环境启用GA
    trackingId: 'G-SPSFBHX4VH',
  },
  
  // API 配置
  api: {
    baseUrl: import.meta.env.PROD 
      ? 'https://api.jfiftojpg.site' 
      : 'http://localhost:8787',
    timeout: 30000, // 30秒超时
  },
  
  // 文件上传配置
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    maxTotalSize: 100 * 1024 * 1024, // 100MB
    acceptedTypes: ['image/jpeg', 'image/jfif', 'image/png', 'image/bmp', 'image/gif', 'image/webp'],
    maxFiles: 20, // 最大文件数量
  },
  
  // 应用信息
  app: {
    name: 'JFIF转JPG工具站',
    version: '1.0.0',
    description: '免费在线将 JFIF 转换为 JPG（jfif to jpg）。支持批量转换、质量设置与尺寸调整。',
  },
  
  // 功能开关
  features: {
    batchConversion: true,
    qualitySettings: true,
    resizeOptions: true,
    downloadHistory: false, // 不保存下载历史
  }
};

// 导出默认配置
export default config; 