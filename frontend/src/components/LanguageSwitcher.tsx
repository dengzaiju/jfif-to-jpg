import React, { useState } from 'react';
import { useI18n } from '../hooks/useI18n';
import type { Locale } from '../hooks/useI18n';

export const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);

  const label = locale === 'zh-CN' ? '语言' : 'Language';

  const onSelect = (l: Locale) => {
    setLocale(l);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        aria-label={label}
        onClick={() => setOpen(v => !v)}
        className="inline-flex items-center px-3 py-1.5 border border-gray-300 bg-white text-sm rounded-md shadow-sm hover:bg-gray-50"
      >
        {locale === 'zh-CN' ? '中文' : 'English'}
        <svg className="w-4 h-4 ml-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <button onClick={() => onSelect('en')} className="w-full text-left px-3 py-2 hover:bg-gray-50">English</button>
          <button onClick={() => onSelect('zh-CN')} className="w-full text-left px-3 py-2 hover:bg-gray-50">中文（简体）</button>
        </div>
      )}
    </div>
  );
}; 