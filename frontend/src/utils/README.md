# Meta标签管理工具使用说明

## 概述

`MetaManager` 是一个用于动态管理页面SEO标签的工具类，支持设置标题、描述、关键词、Canonical URL、Open Graph和Twitter Card等标签。

## 主要功能

### 1. 基础Meta标签设置
- `setTitle(title: string)`: 设置页面标题
- `setDescription(description: string)`: 设置Meta Description
- `setKeywords(keywords: string)`: 设置Meta Keywords
- `setCanonical(url: string)`: 设置Canonical URL

### 2. 社交媒体标签设置
- `setOpenGraph(ogTitle?, ogDescription?, ogImage?)`: 设置Open Graph标签
- `setTwitterCard(twitterTitle?, twitterDescription?)`: 设置Twitter Card标签

### 3. 批量设置
- `setAll(config: MetaConfig)`: 一次性设置所有Meta标签

### 4. 清理功能
- `cleanup()`: 清理动态添加的Meta标签

## 使用方法

### 在页面组件中使用

```typescript
import { MetaManager, META_CONFIGS } from '../../utils/metaManager';

export const MyPage: React.FC = () => {
  useEffect(() => {
    // 使用预定义配置
    MetaManager.setAll(META_CONFIGS.home);
    
    // 或者自定义配置
    MetaManager.setAll({
      title: '自定义标题',
      description: '自定义描述，确保长度在140-160字符之间',
      keywords: '关键词1,关键词2,关键词3',
      canonical: 'https://example.com/page'
    });
    
    // 组件卸载时清理
    return () => {
      MetaManager.cleanup();
    };
  }, []);
  
  return (
    // 页面内容
  );
};
```

### 单独设置特定标签

```typescript
// 只设置描述
MetaManager.setDescription('这是一个符合SEO要求的描述，长度在140-160字符之间');

// 只设置标题
MetaManager.setTitle('页面标题');

// 设置Open Graph标签
MetaManager.setOpenGraph('OG标题', 'OG描述', 'OG图片URL');
```

## 预定义配置

工具提供了常用页面的预定义配置：

- `META_CONFIGS.home`: 主页配置
- `META_CONFIGS.about`: 关于页面配置
- `META_CONFIGS.privacy`: 隐私政策页面配置
- `META_CONFIGS.terms`: 服务条款页面配置

## SEO最佳实践

### Meta Description长度
- **推荐长度**: 140-160字符
- **原因**: 确保在Google搜索结果中完整显示，提高点击率
- **当前状态**: ✅ 已优化，所有描述都在推荐长度范围内

### 关键词优化
- 包含主要目标关键词（JFIF转JPG、图片转换器等）
- 自然融入描述中，避免关键词堆砌
- 使用长尾关键词提高搜索覆盖

### 结构化数据
- 配合JSON-LD使用，提供更丰富的搜索结果展示
- 支持面包屑导航、页面类型等结构化信息

## 注意事项

1. **组件卸载时清理**: 确保在useEffect的清理函数中调用`MetaManager.cleanup()`
2. **避免重复设置**: 同一页面不要多次调用setAll，可能导致标签重复
3. **描述长度控制**: 严格控制在140-160字符范围内
4. **关键词密度**: 保持自然，避免过度优化

## 更新日志

- **v1.0.0**: 初始版本，支持基础Meta标签管理
- **v1.1.0**: 添加社交媒体标签支持
- **v1.2.0**: 优化SEO配置，符合Google最佳实践 