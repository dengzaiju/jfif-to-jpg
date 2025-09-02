/**
 * Meta标签管理工具
 * 用于动态设置页面的SEO相关标签
 */

export interface MetaConfig {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

export class MetaManager {
  /**
   * 设置页面标题
   */
  static setTitle(title: string): void {
    document.title = title;
  }

  /**
   * 设置Meta Description
   */
  static setDescription(description: string): void {
    let tag = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'description');
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', description);
  }

  /**
   * 设置Meta Keywords
   */
  static setKeywords(keywords: string): void {
    let tag = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null;
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'keywords');
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', keywords);
  }

  /**
   * 设置Canonical URL
   */
  static setCanonical(url: string): void {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  /**
   * 设置Open Graph标签
   */
  static setOpenGraph(ogTitle?: string, ogDescription?: string, ogImage?: string): void {
    if (ogTitle) {
      let tag = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', 'og:title');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', ogTitle);
    }

    if (ogDescription) {
      let tag = document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', 'og:description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', ogDescription);
    }

    if (ogImage) {
      let tag = document.querySelector('meta[property="og:image"]') as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', 'og:image');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', ogImage);
    }
  }

  /**
   * 设置Twitter Card标签
   */
  static setTwitterCard(twitterTitle?: string, twitterDescription?: string): void {
    if (twitterTitle) {
      let tag = document.querySelector('meta[name="twitter:title"]') as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'twitter:title');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', twitterTitle);
    }

    if (twitterDescription) {
      let tag = document.querySelector('meta[name="twitter:description"]') as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'twitter:description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', twitterDescription);
    }
  }

  /**
   * 批量设置所有Meta标签
   */
  static setAll(config: MetaConfig): void {
    this.setTitle(config.title);
    this.setDescription(config.description);
    
    if (config.keywords) {
      this.setKeywords(config.keywords);
    }
    
    if (config.canonical) {
      this.setCanonical(config.canonical);
    }
    
    this.setOpenGraph(config.ogTitle, config.ogDescription, config.ogImage);
    this.setTwitterCard(config.twitterTitle, config.twitterDescription);
  }

  /**
   * 清理动态添加的Meta标签
   */
  static cleanup(): void {
    // 清理动态添加的meta标签（保留HTML中的静态标签）
    const dynamicMetaTags = document.querySelectorAll('meta[data-dynamic="true"]');
    dynamicMetaTags.forEach(tag => tag.remove());
  }
}

// 预定义的Meta配置
export const META_CONFIGS = {
  home: {
    title: 'JFIF to JPG 在线转换器 | 免费图片格式转换工具',
    description: '免费在线JFIF转JPG转换器，支持批量转换、质量调节、尺寸调整。拖拽上传，一键转换JFIF、PNG、WebP、BMP、GIF等格式，快速安全无需注册。',
    keywords: 'JFIF转JPG,JFIF to JPG,图片转换器,在线转换,批量转换,图片格式转换,WebP转JPG,PNG转JPG',
    canonical: 'https://jfiftojpg.site/',
    ogTitle: 'JFIF to JPG 在线转换器 - 免费图片格式转换工具',
    ogDescription: '免费在线JFIF转JPG转换器，支持批量转换、质量调节、尺寸调整。拖拽上传，一键转换多种格式。',
    twitterTitle: 'JFIF to JPG 在线转换器',
    twitterDescription: '免费在线JFIF转JPG转换器，支持批量转换、质量调节、尺寸调整。'
  },
  about: {
    title: '关于我们 - JFIF to JPG 转换器',
    description: '了解jfiftojpg.site的故事和使命。我们专注于提供简单、快速、安全的图片格式转换服务，支持JFIF、JPG、PNG、WebP、BMP、GIF等格式。',
    canonical: 'https://jfiftojpg.site/about',
    ogTitle: 'About - JFIF to JPG Converter',
    ogDescription: 'Learn about jfiftojpg.site — a simple, fast, secure tool for jfif to jpg and other image formats. Free, no account, files auto-deleted.',
    twitterTitle: 'About - JFIF to JPG Converter',
    twitterDescription: 'Learn about jfiftojpg.site — a simple, fast, secure tool for jfif to jpg and other image formats.'
  },
  privacy: {
    title: '隐私政策 - JFIF to JPG 转换器',
    description: 'jfiftojpg.site的隐私政策。我们重视您的隐私，承诺保护您的个人信息，采用安全的数据处理方式。',
    canonical: 'https://jfiftojpg.site/privacy',
    ogTitle: 'Privacy Policy - JFIF to JPG Converter',
    ogDescription: 'Privacy policy for jfiftojpg.site. We value your privacy and are committed to protecting your personal information with secure data processing.',
    twitterTitle: 'Privacy Policy - JFIF to JPG Converter',
    twitterDescription: 'Privacy policy for jfiftojpg.site. We value your privacy and are committed to protecting your personal information.'
  },
  terms: {
    title: '服务条款 - JFIF to JPG 转换器',
    description: 'jfiftojpg.site的服务条款。使用我们的服务即表示您同意这些条款，包括我们的隐私政策。',
    canonical: 'https://jfiftojpg.site/terms',
    ogTitle: 'Terms of Service - JFIF to JPG Converter',
    ogDescription: 'Terms for using jfiftojpg.site\'s free jfif to jpg converter. Simple use, no sign-up, secure processing, and fair-use rules.',
    twitterTitle: 'Terms of Service - JFIF to JPG Converter',
    twitterDescription: 'Terms for using jfiftojpg.site\'s free jfif to jpg converter. Simple use, no sign-up, secure processing.'
  }
}; 