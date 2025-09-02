import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Locale = 'en' | 'zh-CN';

interface Messages {
  [key: string]: string | Messages;
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

const defaultMessages: Record<Locale, Messages> = {
  en: {
    common: {
      backHome: '← Back to Home',
      home: 'Home',
      converter: 'Converter',
      help: 'Help',
      useNow: 'Use now',
      new: 'NEW',
      chooseFile: 'Choose File',
      dragHere: 'Drag files here',
      or: 'or',
      convertTo: 'Convert to',
      advancedSettings: 'Advanced Settings (Optional)',
      conversionSettings: 'Conversion Settings',
      brandName: 'JFIF to JPG Tools',
      brandSlogan: 'Professional online image format converter',
      applyAll: 'Apply to all',
      applyToAll: 'Apply to all files',
      reset: 'Reset',
      resetOptions: 'Reset Options',
      footer: { security: 'Security Promise', ssl: 'SSL/TLS Encryption', access: 'Access Control', dataCenter: 'Secure Data Center' },
    },
    settings: {
      autoRotate: 'Auto-rotate',
      clearMetadata: 'Clear metadata',
      theme: 'Theme',
      themeLight: 'Light',
      themeDark: 'Dark',
      quality: 'Image quality',
      qualityLow: 'Low quality',
      qualityMedium: 'Medium quality',
      qualityHigh: 'High quality',
      compression: 'Compression level',
      compressionNone: 'None',
      compressionLow: 'Low',
      compressionMedium: 'Medium',
      compressionHigh: 'High',
      size: 'Size',
      sizeOriginal: 'Original size',
      sizeCustom: 'Custom size',
      size30: '30%',
      size50: '50%',
      size70: '70%',
      widthPx: 'Width (px)',
      heightPx: 'Height (px)',
      output: 'Output format',
    },
    conversion: {
      outputFormat: 'Output format',
      imageQuality: 'Image quality',
      resize: 'Resize',
      keepOriginal: 'Keep original size',
      customSize: 'Custom size',
      maintainAspectRatio: 'Maintain aspect ratio',
      widthPx: 'Width (px)',
      heightPx: 'Height (px)',
      controls: 'Conversion Controls',
      convertTo: 'Convert to',
      batch: 'Batch Convert',
      progress: 'Progress',
    },
    app: {
      title: 'JFIF to JPG Online Converter',
      subtitle: 'Free online convert JFIF to JPG (jfif to jpg), high quality, fast and secure.',
      nav: { others: 'Other conversions', features: 'Features', info: 'Info', faq: 'FAQ' },
      upload: { title: 'Choose File (JFIF to JPG)' },
      preview: { title: 'Preview (JFIF to JPG Comparison)' },
      dropdown: { toJPG: 'Convert to JPG', toPNG: 'Convert to PNG', toWEBP: 'Convert to WEBP', toBMP: 'Convert to BMP', toGIF: 'Convert to GIF' },
    },
    home: {
      relatedToolsTitle: 'Related Tools',
      securityTitle: 'Security Promise',
      ssl: 'SSL/TLS Encryption',
      access: 'Access Control',
      dataCenter: 'Secure Data Center',
      steps: { 
        selectTitle: 'Choose File', 
        selectDesc: 'Choose your JFIF file, drag & drop supported',
        convertTitle: 'Start Conversion',
        convertDesc: 'Click convert button, wait for processing',
        downloadTitle: 'Download Result',
        downloadDesc: 'Download JPG format image after conversion'
      },
      howToConvert: 'How to convert JFIF to JPG?',
      infoTitle: 'Information',
      faqTitle: 'FAQ (JFIF to JPG)',
      supportedFormats: 'All Supported Conversion Formats:',
      dataPriority: 'Your data, our priority',
      formats: {
        jfif: {
          title: 'What is JFIF?',
          desc: 'JPEG File Interchange Format (JFIF) is a simple file type for exchanging JPEG images. It is an older version of the JPG file format, supporting JPEG bitstreams.'
        },
        jpg: {
          title: 'What is JPG?',
          desc: 'JPG (Joint Photographic Experts Group) is a common file format that uses compression algorithms. It is currently the most widely used image file format, supported by most browsers and devices.'
        },
        png: {
          title: 'What is PNG?',
          desc: 'PNG (Portable Network Graphics) is a lossless compression image format that supports transparent backgrounds and true colors. It is suitable for images requiring high quality and transparency.'
        },
        webp: {
          title: 'What is WebP?',
          desc: 'WebP is a new generation image format developed by Google, supporting lossy and lossless compression. Its file size is smaller than JPG and PNG, making it an ideal choice for web optimization.'
        },
        bmp: {
          title: 'What is BMP?',
          desc: 'BMP (Bitmap) is a standard image format for Windows systems, usually uncompressed, resulting in larger file sizes but no loss of quality. It is suitable for scenarios requiring high-quality images.'
        },
        gif: {
          title: 'What is GIF?',
          desc: 'GIF (Graphics Interchange Format) supports animation and transparent backgrounds, but its color is limited to 256 colors. It is suitable for simple animated images and icons.'
        }
      },
      faq: {
        q1: 'How to quickly convert JFIF to JPG?',
        a1: 'Upload images by clicking "Select File (JFIF to JPG)" above, then click "Convert to JPG" to download. Supports batch processing and quality settings.',
        q2: 'Will conversion reduce image quality?',
        a2: 'JPG is a lossy compression format. You can adjust the quality percentage in "Conversion Settings" to balance file size and clarity, with a default of 90%.',
        q3: 'Do you support batch and large files?',
        a3: 'Supports batch upload and batch conversion; single file maximum 10MB, total size maximum 100MB, adjustable if needed.',
        q4: 'What about transparent backgrounds?',
        a4: 'JPG does not support transparency. If the source image contains transparent areas, it is recommended to convert to PNG or WebP to retain transparency.',
        q5: 'Will EXIF/shooting information be retained?',
        a5: 'You can choose to clear or retain metadata in "Advanced Settings (Optional)". Default is to clear to protect privacy and reduce file size.',
        q6: 'Is upload secure?',
        a6: 'Full HTTPS transmission, files are only used for conversion and cleaned up regularly after completion. We will not share your files or information externally.'
      },
      security: {
        sslDesc: '256-bit encrypted transmission',
        dataCenterDesc: 'ISO 27001 certified',
        accessDesc: 'Multi-factor authentication'
      },
      tools: {
        jfifToJpg: 'JFIF to JPG',
        jpgToJfif: 'JPG to JFIF',
        jfifToPng: 'JFIF to PNG',
        pngToJfif: 'PNG to JFIF',
        jfifToWebp: 'JFIF to WebP',
        webpToJfif: 'WebP to JFIF',
        jfifToBmp: 'JFIF to BMP',
        bmpToJfif: 'BMP to JFIF',
        jfifToGif: 'JFIF to GIF',
        gifToJfif: 'GIF to JFIF',
        jpgToPng: 'JPG to PNG',
        pngToJpg: 'PNG to JPG',
        jpgToWebp: 'JPG to WebP',
        webpToJpg: 'WebP to JPG',
        jpgToBmp: 'JPG to BMP',
        bmpToJpg: 'BMP to JPG',
        jpgToGif: 'JPG to GIF',
        gifToJpg: 'GIF to JPG',
        pngToWebp: 'PNG to WebP',
        webpToPng: 'WebP to PNG',
        pngToBmp: 'PNG to BMP',
        bmpToPng: 'BMP to PNG',
        pngToGif: 'PNG to GIF',
        gifToPng: 'GIF to PNG',
        webpToBmp: 'WebP to BMP',
        bmpToWebp: 'BMP to WebP',
        webpToGif: 'WebP to GIF',
        gifToWebp: 'GIF to WebP',
        bmpToGif: 'BMP to GIF',
        gifToBmp: 'GIF to BMP'
      },
      footer: {
        description: 'One-click online JFIF to JPG conversion. Free, fast, stable, supports batch and high-quality output.',
        howToUse: 'How to Use',
        formatKnowledge: 'Format Knowledge',
        startConversion: 'Start Conversion',
        converterLinks: {
          jfifToJpg: 'JFIF to JPG',
          pngToJpg: 'PNG to JPG',
          bmpToJpg: 'BMP to JPG',
          webpToJpg: 'WEBP to JPG'
        },
        aboutLinks: {
          privacy: 'Privacy Policy',
          terms: 'Terms of Service',
          about: 'About'
        }
      },
    },
    preview: {
      sectionTitle: 'Image Preview',
      emptyTitle: 'No image',
      emptyDesc: 'Please upload an image to start converting',
      original: 'Original',
      converted: 'Converted',
      download: 'Download',
      details: 'Details',
      reconvert: 'Reconvert',
      waiting: 'Waiting for conversion',
      clickToStart: 'Click the convert button below to start',
    },
    converter: {
      header: { title: 'Image Format Converter', batch: 'Batch', history: 'History', help: 'Help' },
      upload: 'Upload Images',
      stats: { uploaded: 'Uploaded', converted: 'Converted', progress: 'Progress' },
    },
    tools: {
      header: { title: 'Toolbox' },
      nav: { home: 'Home', converter: 'Converter', help: 'Help' },
      hero: { title: 'Powerful Image Toolbox', subtitle: 'A collection of handy image tools for your daily needs. From format conversion to editing, from single files to batch operations.' },
      categories: { convert: 'Image Conversion', process: 'Image Processing', doc: 'Document Tools', batch: 'Batch Tools' },
      card: { new: 'NEW', useNow: 'Use now' },
      cards: {
        'png-to-jpg': { title: 'PNG to JPG', desc: 'Convert PNG images to JPG, support batch' },
        'bmp-to-jpg': { title: 'BMP to JPG', desc: 'Convert BMP images to JPG, keep quality' },
        'gif-to-jpg': { title: 'GIF to JPG', desc: 'Convert GIF animation to JPG image' },
        'webp-to-jpg': { title: 'WebP to JPG', desc: 'Convert WebP images to JPG for compatibility' },
        'image-compress': { title: 'Image Compression', desc: 'Smartly compress images while keeping quality' },
        'image-resize': { title: 'Image Resize', desc: 'Resize images, batch supported' },
        'image-rotate': { title: 'Image Rotate', desc: 'Rotate and flip images, multiple angles' },
        'image-crop': { title: 'Image Crop', desc: 'Crop precisely with custom area' },
        'image-to-pdf': { title: 'Image to PDF', desc: 'Merge images into a PDF file' },
        'pdf-to-image': { title: 'PDF to Image', desc: 'Convert PDF pages to images' },
        'batch-convert': { title: 'Batch Convert', desc: 'Convert formats in batch efficiently' },
        'batch-rename': { title: 'Batch Rename', desc: 'Rename images in batch with rules' },
      },
      why: { title: 'Why choose our toolbox?' },
    },
  },
  'zh-CN': {
    common: {
      backHome: '← 返回首页',
      home: '首页',
      converter: '转换器',
      help: '帮助',
      useNow: '立即使用',
      new: '新功能',
      chooseFile: '选择文件',
      dragHere: '拖拽文件到这里',
      or: '或者',
      convertTo: '转为',
      advancedSettings: '高级设置（可选）',
      conversionSettings: '转换设置',
      brandName: 'JFIF转JPG工具站',
      brandSlogan: '专业的在线图片格式转换工具',
      applyAll: '应用到全部',
      applyToAll: '应用到所有文件',
      reset: '重置',
      resetOptions: '重置选项',
      footer: { security: '安全承诺', ssl: 'SSL/TLS加密', access: '访问控制', dataCenter: '安全数据中心' },
    },
    settings: {
      autoRotate: '自动旋转',
      clearMetadata: '清除元数据',
      theme: '主题',
      themeLight: '浅色',
      themeDark: '深色',
      quality: '图片质量',
      qualityLow: '低质量',
      qualityMedium: '中等质量',
      qualityHigh: '高质量',
      compression: '压缩等级',
      compressionNone: '无压缩',
      compressionLow: '低压缩',
      compressionMedium: '中等压缩',
      compressionHigh: '高压缩',
      size: '尺寸',
      sizeOriginal: '原始尺寸',
      sizeCustom: '自定义尺寸',
      size30: '30%',
      size50: '50%',
      size70: '70%',
      widthPx: '宽度 (px)',
      heightPx: '高度 (px)',
      output: '输出格式',
    },
    conversion: {
      outputFormat: '输出格式',
      imageQuality: '图片质量',
      resize: '尺寸调整',
      keepOriginal: '保持原始尺寸',
      customSize: '自定义尺寸',
      maintainAspectRatio: '保持宽高比',
      widthPx: '宽度 (px)',
      heightPx: '高度 (px)',
      controls: '转换控制',
      convertTo: '转换为',
      batch: '批量转换',
      progress: '转换进度',
    },
    app: {
      title: 'JFIF to JPG 在线转换器',
      subtitle: '免费在线JFIF转JPG转换器，支持批量转换、质量调节、尺寸调整。拖拽上传，一键转换多种格式，快速安全无需注册。',
      nav: { others: '其他转换', features: '特色', info: '信息', faq: '常见问题' },
      upload: { title: '选择文件（JFIF to JPG）' },
      preview: { title: '预览结果（JFIF 转 JPG 对比）' },
      dropdown: { toJPG: '转为 JPG', toPNG: '转为 PNG', toWEBP: '转为 WEBP', toBMP: '转为 BMP', toGIF: '转为 GIF' },
    },
    home: {
      relatedToolsTitle: '相关工具',
      securityTitle: '安全承诺',
      ssl: 'SSL/TLS加密',
      access: '访问控制',
      dataCenter: '安全数据中心',
      steps: { 
        selectTitle: '选择文件', 
        selectDesc: '选择您的JFIF文件，支持拖拽上传',
        convertTitle: '开始转换',
        convertDesc: '点击转换按钮，等待处理完成',
        downloadTitle: '下载结果',
        downloadDesc: '转换完成后下载JPG格式图片'
      },
      howToConvert: '如何转换JFIF到JPG？',
      infoTitle: '信息介绍',
      faqTitle: '常见问题（JFIF to JPG）',
      supportedFormats: '支持的所有转换格式：',
      dataPriority: '您的数据，我们的优先',
      formats: {
        jfif: {
          title: '什么是JFIF？',
          desc: 'JPEG文件交换格式(JFIF)是一种简单的文件类型，便于JPEG图像的交换。它是JPG文件格式的旧版本，支持JPEG比特流。'
        },
        jpg: {
          title: '什么是JPG？',
          desc: 'JPG(联合图像专家组)是一种通用文件格式，使用压缩算法。它是目前使用最广泛的图像文件格式，大多数浏览器和设备都支持。'
        },
        png: {
          title: '什么是PNG？',
          desc: 'PNG(便携式网络图形)是一种无损压缩的图像格式，支持透明背景和真彩色。适合需要高质量和透明效果的图像。'
        },
        webp: {
          title: '什么是WebP？',
          desc: 'WebP是Google开发的新一代图像格式，支持有损和无损压缩，文件体积比JPG和PNG更小，是网页优化的理想选择。'
        },
        bmp: {
          title: '什么是BMP？',
          desc: 'BMP(位图)是Windows系统的标准图像格式，通常不压缩，文件较大但质量无损。适合需要高质量图像的场景。'
        },
        gif: {
          title: '什么是GIF？',
          desc: 'GIF(图形交换格式)支持动画和透明背景，但颜色限制为256色。适合简单的动画图像和图标。'
        }
      },
      faq: {
        q1: '如何把 JFIF 快速转换为 JPG？',
        a1: '在上方"选择文件（JFIF to JPG）"上传图片，点击"转换为 JPG"即可下载。支持批量处理与质量设置。',
        q2: '转换会降低画质吗？',
        a2: 'JPG 为有损压缩。您可以在"转换设置"中调整质量百分比以平衡体积与清晰度，默认为 90%。',
        q3: '支持批量与大文件吗？',
        a3: '支持批量上传与批量转换；单文件最大 10MB，总大小最大 100MB，可在需要时调整。',
        q4: '透明背景怎么办？',
        a4: 'JPG 不支持透明。若源图含透明区域，建议转换为 PNG 或 WebP 保留透明。',
        q5: 'EXIF/拍摄信息会保留吗？',
        a5: '可在"高级设置（可选）"里选择清除或保留元数据。默认清除以保护隐私并缩小体积。',
        q6: '上传是否安全？',
        a6: '全程 HTTPS 传输，文件仅用于转换，完成后定期清理。我们不会对外共享您的文件或信息。'
      },
      security: {
        sslDesc: '256位加密传输',
        dataCenterDesc: 'ISO 27001认证',
        accessDesc: '多重身份验证'
      },
      tools: {
        jfifToJpg: 'JFIF转JPG',
        jpgToJfif: 'JPG转JFIF',
        jfifToPng: 'JFIF转PNG',
        pngToJfif: 'PNG转JFIF',
        jfifToWebp: 'JFIF转WebP',
        webpToJfif: 'WebP转JFIF',
        jfifToBmp: 'JFIF转BMP',
        bmpToJfif: 'BMP转JFIF',
        jfifToGif: 'JFIF转GIF',
        gifToJfif: 'GIF转JFIF',
        jpgToPng: 'JPG转PNG',
        pngToJpg: 'PNG转JPG',
        jpgToWebp: 'JPG转WebP',
        webpToJpg: 'WebP转JPG',
        jpgToBmp: 'JPG转BMP',
        bmpToJpg: 'BMP转JPG',
        jpgToGif: 'JPG转GIF',
        gifToJpg: 'GIF转JPG',
        pngToWebp: 'PNG转WebP',
        webpToPng: 'WebP转PNG',
        pngToBmp: 'PNG转BMP',
        bmpToPng: 'BMP转PNG',
        pngToGif: 'PNG转GIF',
        gifToPng: 'GIF转PNG',
        webpToBmp: 'WebP转BMP',
        bmpToWebp: 'BMP转WebP',
        webpToGif: 'WebP转GIF',
        gifToWebp: 'GIF转WebP',
        bmpToGif: 'BMP转GIF',
        gifToBmp: 'GIF转BMP'
      },
      footer: {
        description: '一键完成 jfif to jpg 在线转换。免费、快速、稳定，支持批量与高质量输出。',
        howToUse: '如何使用',
        formatKnowledge: '格式知识',
        startConversion: '开始转换',
        converterLinks: {
          jfifToJpg: 'JFIF 转 JPG',
          pngToJpg: 'PNG 转 JPG',
          bmpToJpg: 'BMP 转 JPG',
          webpToJpg: 'WEBP 转 JPG'
        },
        aboutLinks: {
          privacy: '隐私政策',
          terms: '服务条款',
          about: '关于我们'
        }
      },
    },
    preview: {
      sectionTitle: '图片预览',
      emptyTitle: '暂无图片',
      emptyDesc: '请先上传图片文件开始转换',
      original: '原始',
      converted: '转换后',
      download: '下载',
      details: '查看详情',
      reconvert: '重新转换',
      waiting: '等待转换',
      clickToStart: '点击下方转换按钮开始转换',
    },
    converter: {
      header: { title: '图片格式转换器', batch: '批量转换', history: '历史记录', help: '帮助' },
      upload: '上传图片',
      stats: { uploaded: '已上传', converted: '已转换', progress: '转换进度' },
    },
    tools: {
      header: { title: '工具箱' },
      nav: { home: '首页', converter: '转换器', help: '帮助' },
      hero: { title: '强大的图片处理工具箱', subtitle: '提供多种图片处理工具，满足您的各种需求。从格式转换到图片编辑，从单张处理到批量操作，我们都有专业的解决方案。' },
      categories: { convert: '图片转换', process: '图片处理', doc: '文档工具', batch: '批量工具' },
      card: { new: '新功能', useNow: '立即使用' },
      cards: {
        'png-to-jpg': { title: 'PNG转JPG', desc: '将PNG图片转换为JPG格式，支持批量转换' },
        'bmp-to-jpg': { title: 'BMP转JPG', desc: '将BMP图片转换为JPG格式，保持图片质量' },
        'gif-to-jpg': { title: 'GIF转JPG', desc: '将GIF动画转换为JPG静态图片' },
        'webp-to-jpg': { title: 'WebP转JPG', desc: '将WebP图片转换为JPG格式，兼容性更好' },
        'image-compress': { title: '图片压缩', desc: '智能压缩图片，减小文件大小，保持质量' },
        'image-resize': { title: '图片调整', desc: '调整图片尺寸，支持批量处理' },
        'image-rotate': { title: '图片旋转', desc: '旋转和翻转图片，支持多种角度' },
        'image-crop': { title: '图片裁剪', desc: '精确裁剪图片，支持自定义区域' },
        'image-to-pdf': { title: '图片转PDF', desc: '将多张图片合并为PDF文档' },
        'pdf-to-image': { title: 'PDF转图片', desc: '将PDF页面转换为图片格式' },
        'batch-convert': { title: '批量转换', desc: '批量转换多种格式，提高工作效率' },
        'batch-rename': { title: '批量重命名', desc: '批量重命名图片文件，支持多种规则' },
      },
      why: { title: '为什么选择我们的工具箱？' },
    },
  },
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem('locale');
    if (saved === 'en' || saved === 'zh-CN') return saved;
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('locale', locale);
    document.documentElement.lang = locale === 'zh-CN' ? 'zh' : 'en';
  }, [locale]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);

  const t = useCallback(
    (key: string) => {
      const parts = key.split('.');
      let obj: any = defaultMessages[locale];
      for (const p of parts) {
        if (obj && typeof obj === 'object' && p in obj) {
          obj = (obj as any)[p];
        } else {
          obj = undefined;
          break;
        }
      }
      return typeof obj === 'string' ? obj : key;
    },
    [locale]
  );

  const value = useMemo<I18nContextValue>(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextValue => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}; 