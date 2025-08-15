import React, { useState } from 'react';
import { FileUpload, ImagePreview, Conversion, Settings } from '../../components';
import { 
  ShieldCheckIcon, 
  BoltIcon, 
  GlobeAltIcon,
  QuestionMarkCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface ImageFile {
  id: string;
  file: File;
  preview: string;
  converted?: {
    url: string;
    format: string;
    size: number;
    dimensions: { width: number; height: number };
  };
}

interface AdvancedSettings {
  autoRotate: boolean;
  clearMetadata: boolean;
  theme: 'light' | 'dark' | 'auto';
  compressionLevel: 'none' | 'low' | 'medium' | 'high';
  outputFormat: 'jpg' | 'png' | 'webp' | 'bmp' | 'gif';
}

export const Home: React.FC = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedCount, setConvertedCount] = useState(0);
  const [settings, setSettings] = useState<AdvancedSettings>({
    autoRotate: true,
    clearMetadata: true,
    theme: 'light',
    compressionLevel: 'medium',
    outputFormat: 'jpg'
  });

  const handleFileSelect = (files: File[]) => {
    const newImages: ImageFile[] = files.map((file, index) => ({
      id: `img-${Date.now()}-${index}`,
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const handleRemoveImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleConvert = (conversionSettings: any) => {
    setIsConverting(true);
    setConvertedCount(0);
    
    // 模拟转换过程
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setConvertedCount(count);
      
      if (count >= images.length) {
        clearInterval(interval);
        setIsConverting(false);
        // 这里应该调用实际的转换API
      }
    }, 1000);
  };

  const handleBatchConvert = (conversionSettings: any) => {
    handleConvert(conversionSettings);
  };

  const handleSettingsChange = (newSettings: AdvancedSettings) => {
    setSettings(newSettings);
  };

  const handleApplyToAll = () => {
    // 应用设置到所有文件
    console.log('应用设置到所有文件:', settings);
  };

  const handleReset = () => {
    setSettings({
      autoRotate: true,
      clearMetadata: true,
      theme: 'light',
      compressionLevel: 'medium',
      outputFormat: 'jpg'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">JFIF转JPG工具站</h1>
            </div>
            <nav className="flex space-x-8">
              <a href="#" className="text-gray-500 hover:text-gray-900">转换工具</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">压缩工具</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">工具箱</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">API</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* 主要功能区域 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">主要功能区域</h2>
            <FileUpload onFileSelect={handleFileSelect} />
          </section>

          {/* 高级设置 */}
          <section>
            <Settings
              settings={settings}
              onSettingsChange={handleSettingsChange}
              onApplyToAll={handleApplyToAll}
              onReset={handleReset}
            />
          </section>

          {/* 转换控制 */}
          <section>
            <Conversion
              onConvert={handleConvert}
              onBatchConvert={handleBatchConvert}
              isConverting={isConverting}
              convertedCount={convertedCount}
              totalCount={images.length}
            />
          </section>

          {/* 预览结果 */}
          <section>
            <ImagePreview images={images} onRemove={handleRemoveImage} />
          </section>

          {/* 使用说明 */}
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">如何转换JFIF到JPG？</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                  1
                </span>
                <span className="text-gray-700">选择文件 - 选择您的JFIF文件</span>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                  2
                </span>
                <span className="text-gray-700">转换为JPG - 开始转换</span>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                  3
                </span>
                <span className="text-gray-700">下载JPG - 当状态显示"完成"时</span>
              </div>
            </div>
          </section>

          {/* 功能特色 */}
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">功能特色</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <BoltIcon className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">易用性</h4>
                <p className="text-gray-600">简单上传即可转换，支持拖拽操作</p>
              </div>
              <div className="text-center">
                <ShieldCheckIcon className="mx-auto h-12 w-12 text-green-600 mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">高质量</h4>
                <p className="text-gray-600">使用先进算法确保最高质量输出</p>
              </div>
              <div className="text-center">
                <GlobeAltIcon className="mx-auto h-12 w-12 text-purple-600 mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">免费安全</h4>
                <p className="text-gray-600">完全免费，支持所有主流浏览器</p>
              </div>
            </div>
          </section>

          {/* 信息介绍 */}
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">信息介绍</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">什么是JFIF？</h4>
                <p className="text-gray-600 text-sm">
                  JPEG文件交换格式(JFIF)是一种简单的文件类型，便于JPEG图像的交换...
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">什么是JPG？</h4>
                <p className="text-gray-600 text-sm">
                  JPG(联合图像专家组)是一种通用文件格式，使用压缩算法...
                </p>
              </div>
              <div className="flex space-x-4">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  了解更多
                </button>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  常见问题
                </button>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  联系我们
                </button>
              </div>
            </div>
          </section>

          {/* 相关工具 */}
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">相关工具</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">转换其他格式到JPG：</h4>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                    PNG转JPG
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                    BMP转JPG
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                    GIF转JPG
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                    WebP转JPG
                  </button>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">相关工具：</h4>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                    图片压缩
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                    图片调整
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                    图片转PDF
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 安全承诺 */}
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">安全承诺</h3>
            <p className="text-gray-600 mb-4">您的数据，我们的优先</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <ShieldCheckIcon className="mx-auto h-8 w-8 text-green-600 mb-2" />
                <h5 className="font-medium text-gray-900">SSL/TLS加密</h5>
                <p className="text-xs text-gray-500">256位加密</p>
              </div>
              <div className="text-center">
                <ShieldCheckIcon className="mx-auto h-8 w-8 text-blue-600 mb-2" />
                <h5 className="font-medium text-gray-900">安全数据中心</h5>
                <p className="text-xs text-gray-500">ISO 27001认证</p>
              </div>
              <div className="text-center">
                <ShieldCheckIcon className="mx-auto h-8 w-8 text-purple-600 mb-2" />
                <h5 className="font-medium text-gray-900">访问控制</h5>
                <p className="text-xs text-gray-500">多重身份验证</p>
              </div>
            </div>
            <div className="text-center mt-4">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                了解更多安全信息
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              © 2025 JFIF转JPG转换器. 保留所有权利.
            </p>
            <div className="mt-2 space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">隐私政策</a>
              <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">服务条款</a>
              <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">联系我们</a>
            </div>
            <div className="mt-4 space-x-2">
              <button className="text-gray-500 hover:text-gray-900 text-sm">English</button>
              <button className="text-gray-500 hover:text-gray-900 text-sm">中文</button>
              <button className="text-gray-500 hover:text-gray-900 text-sm">日本語</button>
              <button className="text-gray-500 hover:text-gray-900 text-sm">한국어</button>
              <button className="text-gray-500 hover:text-gray-900 text-sm">Español</button>
              <button className="text-gray-500 hover:text-gray-900 text-sm">Français</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}; 