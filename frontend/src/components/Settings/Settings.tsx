import React, { useState } from 'react';
import { useI18n } from '../../hooks/useI18n';

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

export const Settings: React.FC<SettingsProps> = ({ settings, onSettingsChange, onApplyToAll, onReset }) => {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = <K extends keyof AdvancedSettings>(key: K, value: AdvancedSettings[K]) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* 标题栏 */}
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-gray-900 font-medium">{t('common.advancedSettings')}</span>
        </div>
        <svg 
          className={`w-5 h-5 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* 展开内容 */}
      {isOpen && (
        <div className="mt-4 space-y-4">
          {/* 第一行：三个下拉菜单 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.quality')}</label>
              <select
                value={settings.imageQuality}
                onChange={(e) => handleChange('imageQuality', e.target.value as AdvancedSettings['imageQuality'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="low">{t('settings.qualityLow')}</option>
                <option value="medium">{t('settings.qualityMedium')}</option>
                <option value="high">{t('settings.qualityHigh')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.size')}</label>
              <select
                value={settings.imageSize}
                onChange={(e) => handleChange('imageSize', e.target.value as AdvancedSettings['imageSize'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="original">{t('settings.sizeOriginal')}</option>
                <option value="custom">{t('settings.sizeCustom')}</option>
                <option value="30%">{t('settings.size30')}</option>
                <option value="50%">{t('settings.size50')}</option>
                <option value="70%">{t('settings.size70')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.compression')}</label>
              <select
                value={settings.compressionLevel}
                onChange={(e) => handleChange('compressionLevel', e.target.value as AdvancedSettings['compressionLevel'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="none">{t('settings.compressionNone')}</option>
                <option value="low">{t('settings.compressionLow')}</option>
                <option value="medium">{t('settings.compressionMedium')}</option>
                <option value="high">{t('settings.compressionHigh')}</option>
              </select>
            </div>
          </div>

          {/* 第二行：两个复选框和主题选择器 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={settings.autoRotate}
                onChange={(e) => handleChange('autoRotate', e.target.checked)}
              />
              <span className="ml-2 text-sm text-gray-700">{t('settings.autoRotate')}</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={settings.clearMetadata}
                onChange={(e) => handleChange('clearMetadata', e.target.checked)}
              />
              <span className="ml-2 text-sm text-gray-700">{t('settings.clearMetadata')}</span>
            </label>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.theme')}</label>
              <div className="flex space-x-2">
                <button
                  className={`p-2 rounded-md border-2 transition-colors ${
                    settings.theme === 'light' 
                      ? 'border-orange-500 bg-yellow-50' 
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                  onClick={() => handleChange('theme', 'light')}
                  aria-label={t('settings.themeLight')}
                >
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  className={`p-2 rounded-md border-2 transition-colors ${
                    settings.theme === 'dark' 
                      ? 'border-orange-500 bg-yellow-50' 
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                  onClick={() => handleChange('theme', 'dark')}
                  aria-label={t('settings.themeDark')}
                >
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* 第三行：两个按钮 */}
          <div className="flex space-x-3 pt-2">
            <button 
              onClick={onApplyToAll} 
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              {t('common.applyToAll')}
            </button>
            <button 
              onClick={onReset} 
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              {t('common.resetOptions')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 