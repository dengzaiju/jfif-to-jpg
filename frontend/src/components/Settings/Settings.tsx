import React, { useState } from 'react';

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
  const [showCustomSize, setShowCustomSize] = useState(false);

  const handleSettingChange = (key: keyof AdvancedSettings, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
    
    // 当选择自定义尺寸时，显示自定义尺寸输入框
    if (key === 'imageSize' && value === 'custom') {
      setShowCustomSize(true);
    } else if (key === 'imageSize') {
      setShowCustomSize(false);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleThemeChange = (theme: 'light' | 'dark') => {
    handleSettingChange('theme', theme);
    // 应用主题到页面
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* 设置标题栏 */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
        onClick={toggleExpanded}
      >
        <div className="flex items-center">
          <span className="w-5 h-5 text-gray-500 mr-2">⚙️</span>
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
                value={settings.imageQuality}
                onChange={(e) => handleSettingChange('imageQuality', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">低质量</option>
                <option value="medium">中等质量</option>
                <option value="high">高质量</option>
              </select>
            </div>

            {/* 图片尺寸 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                图片尺寸
              </label>
              <select
                value={settings.imageSize}
                onChange={(e) => handleSettingChange('imageSize', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="original">原始尺寸</option>
                <option value="custom">自定义尺寸</option>
                <option value="30%">30%</option>
                <option value="50%">50%</option>
                <option value="70%">70%</option>
              </select>
              
              {/* 自定义尺寸输入框 */}
              {showCustomSize && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="宽度"
                    value={settings.customWidth || ''}
                    onChange={(e) => handleSettingChange('customWidth', parseInt(e.target.value) || undefined)}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <input
                    type="number"
                    placeholder="高度"
                    value={settings.customHeight || ''}
                    onChange={(e) => handleSettingChange('customHeight', parseInt(e.target.value) || undefined)}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>
              )}
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
                  onClick={() => handleThemeChange('light')}
                  className={`p-2 rounded-md ${
                    settings.theme === 'light'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  ☀️
                </button>
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`p-2 rounded-md ${
                    settings.theme === 'dark'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  🌙
                </button>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-between pt-4 border-t border-gray-200">
            <button
              onClick={onApplyToAll}
              className="px-4 py-2 border border-gray-300 bg-white text-gray-700 text-sm rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              应用到所有文件
            </button>
            <button
              onClick={onReset}
              className="px-4 py-2 border border-gray-300 bg-white text-gray-700 text-sm rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              重置选项
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 