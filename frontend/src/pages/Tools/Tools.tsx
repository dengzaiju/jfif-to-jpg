import React from 'react';
import { 
  PhotoIcon, 
  DocumentTextIcon, 
  CogIcon, 
  ChartBarIcon,
  ArrowLeftIcon,
  ArrowPathIcon,
  DocumentDuplicateIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

interface ToolCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
  href: string;
  isNew?: boolean;
}

const tools: ToolCard[] = [
  // 图片转换工具
  {
    id: 'png-to-jpg',
    title: 'PNG转JPG',
    description: '将PNG图片转换为JPG格式，支持批量转换',
    icon: PhotoIcon,
    category: '图片转换',
    href: '/tools/png-to-jpg'
  },
  {
    id: 'bmp-to-jpg',
    title: 'BMP转JPG',
    description: '将BMP图片转换为JPG格式，保持图片质量',
    icon: PhotoIcon,
    category: '图片转换',
    href: '/tools/bmp-to-jpg'
  },
  {
    id: 'gif-to-jpg',
    title: 'GIF转JPG',
    description: '将GIF动画转换为JPG静态图片',
    icon: PhotoIcon,
    category: '图片转换',
    href: '/tools/gif-to-jpg'
  },
  {
    id: 'webp-to-jpg',
    title: 'WebP转JPG',
    description: '将WebP图片转换为JPG格式，兼容性更好',
    icon: PhotoIcon,
    category: '图片转换',
    href: '/tools/webp-to-jpg'
  },

  // 图片处理工具
  {
    id: 'image-compress',
    title: '图片压缩',
    description: '智能压缩图片，减小文件大小，保持质量',
    icon: CogIcon,
    category: '图片处理',
    href: '/tools/image-compress',
    isNew: true
  },
  {
    id: 'image-resize',
    title: '图片调整',
    description: '调整图片尺寸，支持批量处理',
    icon: ChartBarIcon,
    category: '图片处理',
    href: '/tools/image-resize'
  },
  {
    id: 'image-rotate',
    title: '图片旋转',
    description: '旋转和翻转图片，支持多种角度',
    icon: ArrowPathIcon,
    category: '图片处理',
    href: '/tools/image-rotate'
  },
  {
    id: 'image-crop',
    title: '图片裁剪',
    description: '精确裁剪图片，支持自定义区域',
    icon: EyeIcon,
    category: '图片处理',
    href: '/tools/image-crop'
  },

  // 文档工具
  {
    id: 'image-to-pdf',
    title: '图片转PDF',
    description: '将多张图片合并为PDF文档',
    icon: DocumentTextIcon,
    category: '文档工具',
    href: '/tools/image-to-pdf'
  },
  {
    id: 'pdf-to-image',
    title: 'PDF转图片',
    description: '将PDF页面转换为图片格式',
    icon: DocumentDuplicateIcon,
    category: '文档工具',
    href: '/tools/pdf-to-image'
  },

  // 批量工具
  {
    id: 'batch-convert',
    title: '批量转换',
    description: '批量转换多种格式，提高工作效率',
    icon: CogIcon,
    category: '批量工具',
    href: '/tools/batch-convert',
    isNew: true
  },
  {
    id: 'batch-rename',
    title: '批量重命名',
    description: '批量重命名图片文件，支持多种规则',
    icon: DocumentTextIcon,
    category: '批量工具',
    href: '/tools/batch-rename'
  }
];

const categories = ['图片转换', '图片处理', '文档工具', '批量工具'];

export const Tools: React.FC = () => {
  const getToolsByCategory = (category: string) => {
    return tools.filter(tool => tool.category === category);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="flex items-center text-gray-500 hover:text-gray-900 mr-4">
                <ArrowLeftIcon className="w-5 h-5 mr-1" />
                返回首页
              </a>
              <h1 className="text-xl font-bold text-gray-900">工具箱</h1>
            </div>
            <nav className="flex space-x-8">
              <a href="/" className="text-gray-500 hover:text-gray-900">首页</a>
              <a href="/converter" className="text-gray-500 hover:text-gray-900">转换器</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">帮助</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            强大的图片处理工具箱
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            提供多种图片处理工具，满足您的各种需求。从格式转换到图片编辑，从单张处理到批量操作，我们都有专业的解决方案。
          </p>
        </div>

        {/* 工具分类展示 */}
        <div className="space-y-12">
          {categories.map((category) => (
            <section key={category}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getToolsByCategory(category).map((tool) => (
                  <div
                    key={tool.id}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <tool.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      {tool.isNew && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                          新功能
                        </span>
                      )}
                    </div>
                    
                    <h4 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {tool.title}
                    </h4>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {tool.description}
                    </p>
                    
                    <a
                      href={tool.href}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium group-hover:underline"
                    >
                      立即使用
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* 特色功能 */}
        <section className="mt-16 bg-white rounded-lg border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">为什么选择我们的工具箱？</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CogIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">专业算法</h4>
              <p className="text-gray-600">
                采用先进的图片处理算法，确保最佳质量和性能
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChartBarIcon className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">批量处理</h4>
              <p className="text-gray-600">
                支持批量操作，大幅提升工作效率
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <EyeIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">实时预览</h4>
              <p className="text-gray-600">
                实时预览处理效果，所见即所得
              </p>
            </div>
          </div>
        </section>

        {/* 使用统计 */}
        <section className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">用户信赖</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">100万+</div>
              <div className="text-blue-100">用户使用</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">5000万+</div>
              <div className="text-blue-100">文件处理</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">服务可用性</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">在线服务</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}; 