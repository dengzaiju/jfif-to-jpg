import React from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';

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

interface ImagePreviewProps {
  images: ImageFile[];
  onRemove?: (id: string) => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ images, onRemove }) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">暂无图片</h3>
        <p className="mt-1 text-sm text-gray-500">请先上传图片文件</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">图片预览</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="aspect-square bg-gray-100">
              <img
                src={image.preview}
                alt={image.file.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {image.file.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    原始: {image.file.type} • {formatFileSize(image.file.size)}
                  </p>
                  {image.converted && (
                    <p className="text-xs text-green-600 mt-1">
                      转换后: {image.converted.format} • {formatFileSize(image.converted.size)}
                    </p>
                  )}
                </div>
                {onRemove && (
                  <button
                    onClick={() => onRemove(image.id)}
                    className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
              {image.converted && (
                <div className="mt-3 flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white text-xs px-3 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    下载 {image.converted.format.toUpperCase()}
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 text-xs px-3 py-2 rounded-md hover:bg-gray-200 transition-colors">
                    查看详情
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 