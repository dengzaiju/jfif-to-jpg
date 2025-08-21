# 配置文件说明

本目录包含JFIF转JPG工具站的环境配置文件。

## 文件结构

```
config/
├── config.development.json    # 开发环境配置
├── config.production.json     # 生产环境配置
├── config.ts                  # 配置管理工具
└── README.md                  # 本说明文档
```

## 配置文件说明

### 开发环境配置 (config.development.json)

- **API配置**: 指向本地开发服务器
- **调试功能**: 启用调试模式和详细日志
- **存储**: 使用本地存储，清理间隔较短
- **UI**: 中文界面，显示教程

### 生产环境配置 (config.production.json)

- **API配置**: 指向生产环境API服务器
- **调试功能**: 关闭调试，仅记录错误日志
- **存储**: 使用Cloudflare R2，清理间隔24小时
- **UI**: 英文界面，关闭教程
- **性能**: 启用缓存、压缩、CDN
- **安全**: 启用CSP、HSTS、XSS防护

## 配置管理工具

`config.ts` 文件提供了配置管理功能：

```typescript
import { configManager } from '../config/config';

// 加载配置
const config = await configManager.loadConfig();

// 获取当前环境
const env = configManager.getEnvironment();

// 检查环境
if (configManager.isDevelopment()) {
  // 开发环境逻辑
}
```

## 配置项说明

### API配置
- `baseUrl`: API服务器地址
- `timeout`: 请求超时时间（毫秒）
- `retryAttempts`: 重试次数

### 功能配置
- `debug`: 是否启用调试模式
- `logging`: 日志级别
- `analytics`: 是否启用分析

### 上传配置
- `maxFileSize`: 单文件最大大小（字节）
- `maxTotalSize`: 总文件最大大小（字节）
- `allowedTypes`: 允许的文件类型

### 转换配置
- `defaultQuality`: 默认图片质量
- `defaultFormat`: 默认输出格式
- `maxConcurrent`: 最大并发转换数

### 存储配置
- `type`: 存储类型（local/cloudflare-r2）
- `cleanupInterval`: 清理间隔（毫秒）

### UI配置
- `theme`: 主题（light/dark/auto）
- `language`: 语言
- `showTutorial`: 是否显示教程

## 环境变量

配置会根据 `NODE_ENV` 环境变量自动选择：

- `NODE_ENV=development` → 加载 `config.development.json`
- `NODE_ENV=production` → 加载 `config.production.json`
- 未设置 → 默认使用开发环境配置

## 使用建议

1. **开发阶段**: 使用开发环境配置，便于调试
2. **测试阶段**: 可以创建 `config.test.json` 用于测试
3. **生产部署**: 确保使用生产环境配置，关闭调试功能
4. **配置更新**: 修改配置后需要重启应用

## 注意事项

- 生产环境配置中的敏感信息应通过环境变量注入
- 配置文件不应包含实际的API密钥或数据库连接字符串
- 配置变更需要经过代码审查和测试验证 