import React, { useState } from 'react';
import { FileUpload, ImagePreview, Conversion, Settings } from '../../components';
import { ArrowLeftIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { useI18n } from '../../hooks/useI18n';

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
  theme: 'light' | 'dark';
  imageQuality: 'low' | 'medium' | 'high';
  imageSize: 'original' | 'custom' | '30%' | '50%' | '70%';
  compressionLevel: 'none' | 'low' | 'medium' | 'high';
  outputFormat: 'jpg' | 'png' | 'webp' | 'bmp' | 'gif';
  customWidth?: number;
  customHeight?: number;
}

export const Converter: React.FC = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedCount, setConvertedCount] = useState(0);
  const [settings, setSettings] = useState<AdvancedSettings>({
    autoRotate: true,
    clearMetadata: true,
    theme: 'light',
    imageQuality: 'medium',
    imageSize: 'original',
    compressionLevel: 'medium',
    outputFormat: 'jpg'
  });
  const { t } = useI18n();

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

  const handleConvert = (_settings: any) => {
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

  const handleBatchConvert = (_settings: any) => {
    handleConvert(_settings);
  };

  const handleSettingsChange = (newSettings: AdvancedSettings) => {
    setSettings(newSettings);
  };

  const handleApplyToAll = () => {
    console.log('应用设置到所有文件:', settings);
  };

  const handleReset = () => {
    setSettings({
      autoRotate: true,
      clearMetadata: true,
      theme: 'light',
      imageQuality: 'medium',
      imageSize: 'original',
      compressionLevel: 'medium',
      outputFormat: 'jpg'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-20 sm:min-h-16 py-2 flex flex-wrap justify-between items-center gap-y-2">
            <div className="flex items-center">
              <a href="/" className="flex items-center text-gray-500 hover:text-gray-900 mr-4">
                <ArrowLeftIcon className="w-5 h-5 mr-1" />
                {t('common.backHome')}
              </a>
              <h1 className="text-xl font-bold text-gray-900">{t('converter.header.title')}</h1>
            </div>
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <a href="#" className="text-gray-500 hover:text-gray-900">{t('converter.header.batch')}</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">{t('converter.header.history')}</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">{t('converter.header.help')}</a>
              <LanguageSwitcher />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：文件上传和设置 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 文件上传 */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">{t('converter.upload')}</h2>
              <FileUpload onFileSelect={handleFileSelect} />
            </div>

            {/* 高级设置 */}
            <div className="bg-white rounded-lg border border-gray-200">
              <Settings
                settings={settings}
                onSettingsChange={handleSettingsChange}
                onApplyToAll={handleApplyToAll}
                onReset={handleReset}
              />
            </div>

            {/* 转换统计 */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">转换统计</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('converter.stats.uploaded')}</span>
                  <span className="font-medium text-gray-900">{images.length} 个文件</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('converter.stats.converted')}</span>
                  <span className="font-medium text-green-600">{convertedCount} 个文件</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('converter.stats.progress')}</span>
                  <span className="font-medium text-blue-600">
                    {images.length > 0 ? Math.round((convertedCount / images.length) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：转换控制和预览 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 转换控制 */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <Conversion
                onConvert={handleConvert}
                onBatchConvert={handleBatchConvert}
                isConverting={isConverting}
                convertedCount={convertedCount}
                totalCount={images.length}
              />
            </div>

            {/* 图片预览 */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <ImagePreview images={images} onRemove={handleRemoveImage} />
            </div>

            {/* 转换历史 */}
            {images.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">转换历史</h3>
                <div className="space-y-3">
                  {images.map((image) => (
                    <div key={image.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <DocumentTextIcon className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{image.file.name}</p>
                          <p className="text-xs text-gray-500">
                            {image.file.type} • {(image.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {image.converted ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            已转换
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                            待转换
                          </span>
                        )}
                        <button
                          onClick={() => handleRemoveImage(image.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}; 