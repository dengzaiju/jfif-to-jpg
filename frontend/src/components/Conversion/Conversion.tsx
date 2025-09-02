import React, { useState, useEffect } from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { useI18n } from '../../hooks/useI18n';

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
  presetFormat?: 'jpg' | 'png' | 'webp' | 'bmp' | 'gif';
}

export const Conversion: React.FC<ConversionProps> = ({
  onConvert,
  onBatchConvert,
  isConverting,
  convertedCount,
  totalCount,
  presetFormat
}) => {
  const [settings, setSettings] = useState<ConversionSettings>({
    quality: 90,
    format: 'jpg',
    resize: 'original',
    maintainAspectRatio: true
  });
  const { trackConversion } = useAnalytics();
  const { t } = useI18n();

  useEffect(() => {
    if (presetFormat && presetFormat !== settings.format) {
      setSettings(prev => ({ ...prev, format: presetFormat }));
    }
  }, [presetFormat]);

  const handleSettingChange = (key: keyof ConversionSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleConvert = () => {
    trackConversion(settings.format, settings.quality);
    onConvert(settings);
  };

  const handleBatchConvert = () => {
    trackConversion(settings.format, settings.quality);
    onBatchConvert(settings);
  };

  const progress = totalCount > 0 ? (convertedCount / totalCount) * 100 : 0;

  return (
    <div className="space-y-6 font-['Comic Sans MS', 'Brush Script MT', cursive]">
      {/* 转换设置 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{t('common.conversionSettings')}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 输出格式 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('conversion.outputFormat')}
            </label>
            <select
              id="output-format-select"
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
              {t('conversion.imageQuality')}: {settings.quality}%
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
              {t('conversion.resize')}
            </label>
            <select
              value={settings.resize}
              onChange={(e) => handleSettingChange('resize', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="original">{t('conversion.keepOriginal')}</option>
              <option value="custom">{t('conversion.customSize')}</option>
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
              {t('conversion.maintainAspectRatio')}
            </label>
          </div>
        </div>

        {/* 自定义尺寸输入 */}
        {settings.resize === 'custom' && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('conversion.widthPx')}
              </label>
              <input
                type="number"
                value={settings.width || ''}
                onChange={(e) => handleSettingChange('width', parseInt(e.target.value) || undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t('conversion.widthPx')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('conversion.heightPx')}
              </label>
              <input
                type="number"
                value={settings.height || ''}
                onChange={(e) => handleSettingChange('height', parseInt(e.target.value) || undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t('conversion.heightPx')}
              />
            </div>
          </div>
        )}
      </div>

      {/* 转换控制 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{t('conversion.controls')}</h3>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleConvert}
            disabled={isConverting}
            className="flex-1 border border-blue-300 bg-white text-gray-800 hover:text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70 disabled:bg-white disabled:text-blue-400 disabled:border-blue-200 flex items-center justify-center font-semibold text-base"
          >
            🔄 {t('conversion.convertTo')} {settings.format.toUpperCase()}
          </button>
          
          <button
            onClick={handleBatchConvert}
            disabled={isConverting}
            className="flex-1 border border-green-300 bg-white text-gray-800 hover:text-green-700 px-6 py-3 rounded-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-70 disabled:bg-white disabled:text-green-400 disabled:border-green-200 flex items-center justify-center font-semibold text-base"
          >
            📥 {t('conversion.batch')}
          </button>
        </div>

        {/* 转换进度 */}
        {isConverting && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{t('conversion.progress')}</span>
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