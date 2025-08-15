import React, { useState } from 'react';
import { ArrowPathIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';

interface ConversionSettings {
  quality: number;
  format: 'jpg' | 'png' | 'webp' | 'bmp' | 'gif';
  resize: 'original' | 'custom';
  width?: number;
  height?: number;
  maintainAspectRatio: boolean;
}

interface ConversionProps {
  onConvert: (settings: ConversionSettings) => void;
  onBatchConvert: (settings: ConversionSettings) => void;
  isConverting: boolean;
  convertedCount: number;
  totalCount: number;
}

export const Conversion: React.FC<ConversionProps> = ({
  onConvert,
  onBatchConvert,
  isConverting,
  convertedCount,
  totalCount
}) => {
  const [settings, setSettings] = useState<ConversionSettings>({
    quality: 90,
    format: 'jpg',
    resize: 'original',
    maintainAspectRatio: true
  });

  const handleSettingChange = (key: keyof ConversionSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleConvert = () => {
    onConvert(settings);
  };

  const handleBatchConvert = () => {
    onBatchConvert(settings);
  };

  const progress = totalCount > 0 ? (convertedCount / totalCount) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* 转换设置 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">转换设置</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 输出格式 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              输出格式
            </label>
            <select
              value={settings.format}
              onChange={(e) => handleSettingChange('format', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="jpg">JPG</option>
              <option value="png">PNG</option>
              <option value="webp">WebP</option>
              <option value="bmp">BMP</option>
              <option value="gif">GIF</option>
            </select>
          </div>

          {/* 图片质量 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              图片质量: {settings.quality}%
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={settings.quality}
              onChange={(e) => handleSettingChange('quality', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* 尺寸调整 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              尺寸调整
            </label>
            <select
              value={settings.resize}
              onChange={(e) => handleSettingChange('resize', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="original">保持原始尺寸</option>
              <option value="custom">自定义尺寸</option>
            </select>
          </div>

          {/* 保持宽高比 */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="maintainAspectRatio"
              checked={settings.maintainAspectRatio}
              onChange={(e) => handleSettingChange('maintainAspectRatio', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="maintainAspectRatio" className="ml-2 text-sm text-gray-700">
              保持宽高比
            </label>
          </div>
        </div>

        {/* 自定义尺寸输入 */}
        {settings.resize === 'custom' && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                宽度 (px)
              </label>
              <input
                type="number"
                value={settings.width || ''}
                onChange={(e) => handleSettingChange('width', parseInt(e.target.value) || undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="宽度"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                高度 (px)
              </label>
              <input
                type="number"
                value={settings.height || ''}
                onChange={(e) => handleSettingChange('height', parseInt(e.target.value) || undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="高度"
              />
            </div>
          </div>
        )}
      </div>

      {/* 转换控制 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">转换控制</h3>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleConvert}
            disabled={isConverting}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <ArrowPathIcon className="w-5 h-5 mr-2" />
            转换为 {settings.format.toUpperCase()}
          </button>
          
          <button
            onClick={handleBatchConvert}
            disabled={isConverting}
            className="flex-1 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
            批量转换
          </button>
        </div>

        {/* 转换进度 */}
        {isConverting && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>转换进度</span>
              <span>{convertedCount} / {totalCount}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 