import React, { useState } from 'react';
import { Cog6ToothIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

interface AdvancedSettings {
  autoRotate: boolean;
  clearMetadata: boolean;
  theme: 'light' | 'dark' | 'auto';
  compressionLevel: 'none' | 'low' | 'medium' | 'high';
  outputFormat: 'jpg' | 'png' | 'webp' | 'bmp' | 'gif';
}

interface SettingsProps {
  settings: AdvancedSettings;
  onSettingsChange: (settings: AdvancedSettings) => void;
  onApplyToAll: () => void;
  onReset: () => void;
}

export const Settings: React.FC<SettingsProps> = ({
  settings,
  onSettingsChange,
  onApplyToAll,
  onReset
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSettingChange = (key: keyof AdvancedSettings, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* 设置标题栏 */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
        onClick={toggleExpanded}
      >
        <div className="flex items-center">
          <Cog6ToothIcon className="w-5 h-5 text-gray-500 mr-2" />
          <span className="text-sm font-medium text-gray-900">高级设置（可选）</span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* 设置内容 */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 space-y-4">
          {/* 第一行设置 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 图片质量 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                图片质量
              </label>
              <select
                value={settings.compressionLevel}
                onChange={(e) => handleSettingChange('compressionLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="none">无压缩</option>
                <option value="low">低压缩</option>
                <option value="medium">中等压缩</option>
                <option value="high">高压缩</option>
              </select>
            </div>

            {/* 图片尺寸 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                图片尺寸
              </label>
              <select
                value={settings.outputFormat}
                onChange={(e) => handleSettingChange('outputFormat', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="jpg">原始尺寸</option>
                <option value="png">自定义尺寸</option>
                <option value="webp">按比例缩放</option>
              </select>
            </div>

            {/* 压缩级别 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                压缩级别
              </label>
              <select
                value={settings.compressionLevel}
                onChange={(e) => handleSettingChange('compressionLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="none">无压缩</option>
                <option value="low">低压缩</option>
                <option value="medium">中等压缩</option>
                <option value="high">高压缩</option>
              </select>
            </div>
          </div>

          {/* 第二行设置 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 自动旋转 */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoRotate"
                checked={settings.autoRotate}
                onChange={(e) => handleSettingChange('autoRotate', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="autoRotate" className="ml-2 text-sm text-gray-700">
                自动旋转
              </label>
            </div>

            {/* 清除元数据 */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="clearMetadata"
                checked={settings.clearMetadata}
                onChange={(e) => handleSettingChange('clearMetadata', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="clearMetadata" className="ml-2 text-sm text-gray-700">
                清除元数据
              </label>
            </div>

            {/* 主题选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                主题
              </label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSettingChange('theme', 'light')}
                  className={`p-2 rounded-md ${
                    settings.theme === 'light'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <SunIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleSettingChange('theme', 'dark')}
                  className={`p-2 rounded-md ${
                    settings.theme === 'dark'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <MoonIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleSettingChange('theme', 'auto')}
                  className={`px-3 py-2 text-xs rounded-md ${
                    settings.theme === 'auto'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  自动
                </button>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-between pt-4 border-t border-gray-200">
            <button
              onClick={onApplyToAll}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              应用到所有文件
            </button>
            <button
              onClick={onReset}
              className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              重置选项
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 