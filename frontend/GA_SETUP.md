# Google Analytics 配置说明

## 概述

本项目已集成 Google Analytics (GA4) 跟踪功能，用于分析用户行为和网站性能。

## 配置特性

### 1. 环境感知加载
- **开发环境**: 自动禁用GA，避免开发数据污染
- **生产环境**: 自动启用GA，开始收集用户数据

### 2. 性能优化
- GA脚本异步加载，不影响页面加载速度
- 使用动态脚本加载，减少初始HTML大小
- 生产环境才加载GA脚本，开发环境零开销

### 3. 自动事件跟踪
- 页面浏览跟踪
- 文件上传事件
- 图片转换事件
- 错误事件跟踪

## 技术实现

### 1. HTML集成
```html
<!-- index.html 中的动态GA加载 -->
<script>
  (function() {
    const isProd = window.location.hostname !== 'localhost' && 
                  window.location.hostname !== '127.0.0.1' &&
                  !window.location.hostname.includes('dev');
    
    if (isProd) {
      // 动态加载GA脚本
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-SPSFBHX4VH';
      document.head.appendChild(gaScript);
      
      // 初始化GA
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-SPSFBHX4VH');
    }
  })();
</script>
```

### 2. React组件集成
```typescript
// 使用 useAnalytics hook
import { useAnalytics } from '../hooks/useAnalytics';

const { trackFileUpload, trackConversion } = useAnalytics();

// 跟踪文件上传
trackFileUpload(fileCount, totalSize);

// 跟踪转换完成
trackConversion(format, quality);
```

### 3. 配置管理
```typescript
// config/config.ts
export const config = {
  analytics: {
    enabled: import.meta.env.PROD, // 生产环境启用
    trackingId: 'G-SPSFBHX4VH',
  },
  // ... 其他配置
};
```

## 跟踪的事件类型

### 1. 页面浏览 (page_view)
- 自动跟踪所有页面访问
- 支持SPA路由变化

### 2. 文件上传 (file_upload)
- 跟踪上传文件数量和总大小
- 用于分析用户使用模式

### 3. 转换完成 (conversion_complete)
- 跟踪转换格式和质量设置
- 分析用户偏好

### 4. 文件下载 (file_download)
- 跟踪下载行为
- 评估功能使用率

### 5. 错误事件 (error)
- 跟踪系统错误和用户错误
- 帮助改进用户体验

## 环境变量配置

### 开发环境
```bash
# 自动检测，无需配置
# GA将被禁用
```

### 生产环境
```bash
# 自动检测，无需配置
# GA将被启用
```

## 自定义事件

如需添加新的跟踪事件，请按以下步骤操作：

### 1. 在 useAnalytics hook 中添加新方法
```typescript
// src/hooks/useAnalytics.ts
export const useAnalytics = () => {
  // ... 现有方法
  
  const trackCustomEvent = (action: string, category: string, label?: string) => {
    event({
      action,
      category,
      label,
    });
  };
  
  return {
    // ... 现有方法
    trackCustomEvent,
  };
};
```

### 2. 在组件中使用
```typescript
import { useAnalytics } from '../hooks/useAnalytics';

const { trackCustomEvent } = useAnalytics();

// 使用
trackCustomEvent('button_click', 'ui', 'download_button');
```

## 隐私和合规

### 1. GDPR合规
- 开发环境不收集数据
- 生产环境可配置用户同意机制

### 2. 数据最小化
- 只收集必要的使用数据
- 不收集个人身份信息

### 3. 用户控制
- 可配置禁用GA
- 支持用户选择退出

## 故障排除

### 1. GA不工作
- 检查是否为生产环境
- 检查网络连接
- 查看浏览器控制台错误

### 2. 事件不跟踪
- 检查 useAnalytics hook 是否正确导入
- 确认事件参数格式正确
- 验证GA脚本是否加载

### 3. 开发环境误启用
- 检查环境检测逻辑
- 确认 localhost 和 127.0.0.1 检测

## 性能监控

### 1. 加载性能
- GA脚本异步加载，不影响首屏渲染
- 使用 `async` 属性确保不阻塞

### 2. 运行时性能
- 事件跟踪轻量级，无性能影响
- 条件检查避免不必要的函数调用

## 总结

本GA配置方案具有以下优势：

1. **环境感知**: 自动适应开发/生产环境
2. **性能优化**: 不影响页面加载速度
3. **易于维护**: 集中配置管理
4. **类型安全**: 完整的TypeScript支持
5. **隐私友好**: 开发环境零数据收集

通过这种配置，开发者可以在不影响开发体验的同时，在生产环境获得完整的用户行为分析数据。 