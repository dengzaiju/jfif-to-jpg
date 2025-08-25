# JFIF转JPG工具站

一个现代化的在线图片格式转换工具，支持JFIF、JPG、PNG、BMP、GIF、WebP等格式之间的相互转换。

## 🚀 项目特性

- **多格式支持**: JFIF、JPG、PNG、BMP、GIF、WebP
- **批量转换**: 支持多文件同时上传和转换
- **质量调节**: 可调节输出图片质量（1-100%）
- **尺寸调整**: 支持保持比例或自定义尺寸
- **拖拽上传**: 直观的文件上传体验
- **响应式设计**: 支持PC、平板、手机等设备
- **实时预览**: 转换前后图片对比预览

## 🏗️ 技术架构

- **前端**: React 18 + TypeScript + Vite + Tailwind CSS
- **后端**: Cloudflare Workers + Hono
- **存储**: Cloudflare R2 对象存储
- **部署**: Cloudflare Pages + GitHub Actions

## 📁 项目结构

```
jfif-to-jpg-converter/
├── frontend/          # 前端React应用
├── backend/           # 后端Cloudflare Workers
├── config/            # 配置文件
├── docs/              # 项目文档
└── README.md          # 项目说明
```

## 🛠️ 开发环境搭建

### 前端开发
```bash
cd frontend
npm install
npm run dev
```

### 后端开发
```bash
cd backend
npm install
npm run dev
```

## 📤 上传到GitHub

### 1. 初始化Git仓库（如果还没有）
```bash
git init
```

### 2. 添加远程仓库
```bash
git remote add origin https://github.com/dengzaiju/jfif-to-jpg.git
```

### 3. 添加文件到暂存区
```bash
# 添加所有文件
git add .

# 或者选择性添加
git add frontend/
git add backend/
git add config/
git add *.md
git add .gitignore
```

### 4. 提交更改
```bash
git commit -m "初始化项目：JFIF转JPG工具站"
```

### 5. 推送到GitHub
```bash
# 首次推送，设置上游分支
git push -u origin main

# 后续推送
git push origin main
```

## 📋 上传文件清单

### 必需文件
- [x] `frontend/` - 前端应用代码
- [x] `backend/` - 后端API代码
- [x] `config/` - 配置文件
- [x] `*.md` - 项目文档
- [x] `.gitignore` - Git忽略规则
- [x] `package.json` - 项目配置

### 忽略文件（不上传）
- [x] `node_modules/` - 依赖包
- [x] `dist/` - 构建输出
- [x] `.env*` - 环境变量
- [x] `.wrangler/` - Cloudflare配置
- [x] `*.log` - 日志文件

## 🔧 环境配置

### 开发环境
```bash
# 前端
cd frontend
npm run dev

# 后端
cd backend
npm run dev
```

### 生产环境
```bash
# 前端构建
cd frontend
npm run build

# 后端部署
cd backend
npm run deploy
```

## 📊 功能模块

- **文件上传**: 支持拖拽和点击上传
- **格式转换**: 多种图片格式互转
- **批量处理**: 多文件同时转换
- **质量设置**: 可调节输出质量
- **尺寸调整**: 支持自定义尺寸
- **实时预览**: 转换前后对比
- **下载管理**: 支持单文件和批量下载

## 🌐 在线访问

- **前端**: [https://jfiftojpg.site](https://jfiftojpg.site)
- **API**: [https://api.jfiftojpg.site](https://api.jfiftojpg.site)

## 📝 开发规范

请参考 [项目开发规则.md](./项目开发规则.md) 了解详细的开发规范。

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 项目地址: [https://github.com/dengzaiju/jfif-to-jpg](https://github.com/dengzaiju/jfif-to-jpg)
- 问题反馈: [Issues](https://github.com/dengzaiju/jfif-to-jpg/issues)

---

**注意**: 首次上传到GitHub时，请确保已经正确配置了 `.gitignore` 文件，避免上传不必要的文件。 