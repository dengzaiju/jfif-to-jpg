import React, { useRef, useState } from 'react';
import { useI18n } from '../../hooks/useI18n';

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  maxFileSize?: number; // 单文件最大MB
  maxTotalSize?: number; // 总大小最大MB
  acceptedTypes?: string[];
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, maxFileSize = 10, maxTotalSize = 100, acceptedTypes }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { t, locale } = useI18n() as any;

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    onFileSelect(Array.from(files));
  };

  const formatsText = locale === 'en'
    ? 'Supported formats: JFIF, JPG, PNG, BMP, GIF, WebP'
    : '支持格式: JFIF, JPG, PNG, BMP, GIF, WebP';
  const sizeText = locale === 'en'
    ? `Max file: ${maxFileSize}MB · Total: ${maxTotalSize}MB`
    : `单文件最大: ${maxFileSize}MB · 总大小最大: ${maxTotalSize}MB`;

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-white'}`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
    >
      <p className="text-gray-600 mb-2">{t('common.dragHere')}</p>
      <p className="text-gray-400 text-sm mb-4">{t('common.or')}</p>
      <button
        type="button"
        aria-label={t('common.chooseFile')}
        onClick={() => inputRef.current?.click()}
        className="px-5 py-2 rounded-md bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-gray-300"
      >
        {t('common.chooseFile')}
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        accept={acceptedTypes?.join(',')}
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div className="mt-4 text-xs text-gray-500">
        <p>{formatsText}</p>
        <p>{sizeText}</p>
      </div>
    </div>
  );
}; 