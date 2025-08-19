import React, { useState, useCallback } from 'react';

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  maxFileSize?: number; // MB
  maxTotalSize?: number; // MB
  acceptedTypes?: string[];
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  maxFileSize = 10,
  maxTotalSize = 100,
  acceptedTypes = ['image/jpeg', 'image/jfif', 'image/png', 'image/bmp', 'image/gif', 'image/webp']
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string>('');

  const validateFiles = useCallback((files: File[]): boolean => {
    let totalSize = 0;
    
    for (const file of files) {
      // 检查文件类型
      if (!acceptedTypes.includes(file.type)) {
        setError(`不支持的文件类型: ${file.name}`);
        return false;
      }
      
      // 检查单个文件大小
      if (file.size > maxFileSize * 1024 * 1024) {
        setError(`文件 ${file.name} 超过最大大小限制 ${maxFileSize}MB`);
        return false;
      }
      
      totalSize += file.size;
    }
    
    // 检查总大小
    if (totalSize > maxTotalSize * 1024 * 1024) {
      setError(`总文件大小超过限制 ${maxTotalSize}MB`);
      return false;
    }
    
    setError('');
    return true;
  }, [acceptedTypes, maxFileSize, maxTotalSize]);

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    if (validateFiles(fileArray)) {
      onFileSelect(fileArray);
    }
  }, [onFileSelect, validateFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  }, [handleFileSelect]);

  return (
    <div className="w-full font-['Comic Sans MS', 'Brush Script MT', cursive]">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="mx-auto h-12 w-12 text-gray-400 text-4xl mb-2">☁️</div>
        <div className="mt-4">
          <p className="text-lg font-medium text-gray-900">
            拖拽文件到这里
          </p>
          <p className="text-sm text-gray-500 mt-1">
            或者
          </p>
          <label className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
            选择文件
            <input
              type="file"
              multiple
              accept={acceptedTypes.join(',')}
              onChange={handleFileInput}
              className="hidden"
            />
          </label>
        </div>
        <div className="mt-4 text-xs text-gray-500">
          支持格式: JFIF, JPG, PNG, BMP, GIF, WebP
        </div>
        <div className="mt-2 text-xs text-gray-500">
          单文件最大: {maxFileSize}MB • 总大小最大: {maxTotalSize}MB
        </div>
      </div>
      
      {error && (
        <div className="mt-3 text-sm text-red-600 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}; 