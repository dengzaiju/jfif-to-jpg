import React, { useState, useRef } from 'react'; // 引入React库和useState钩子
import { Logo } from '../../components';
import { FileUpload } from '../../components/FileUpload'; // 引入文件上传组件
import { Settings } from '../../components/Settings'; // 引入高级设置组件
import { Conversion } from '../../components/Conversion'; // 引入转换设置组件
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { useI18n } from '../../hooks/useI18n';
import { MetaManager, META_CONFIGS } from '../../utils/metaManager'; // 引入Meta管理工具

// 定义图片文件的类型
interface ImageFile {
  id: string; // 图片唯一标识
  file: File; // 原始文件对象
  preview: string; // 预览图片的URL
  originalFormat: string; // 原始图片格式
  converted?: { // 可选，转换后的图片信息
    url: string; // 转换后图片的URL
    format: string; // 转换后图片格式
    size: number; // 转换后图片大小
    dimensions: { width: number; height: number }; // 转换后图片尺寸
  };
  justConverted?: boolean; // 转换完成后用于闪烁提示
}

// 定义高级设置的类型
interface AdvancedSettings {
  autoRotate: boolean; // 是否自动旋转
  clearMetadata: boolean; // 是否清除元数据
  theme: 'light' | 'dark'; // 主题
  imageQuality: 'low' | 'medium' | 'high'; // 图片质量
  imageSize: 'original' | 'custom' | '30%' | '50%' | '70%'; // 图片尺寸
  compressionLevel: 'none' | 'low' | 'medium' | 'high'; // 压缩等级
  outputFormat: 'jpg' | 'png' | 'webp' | 'bmp' | 'gif'; // 输出格式
  customWidth?: number; // 自定义宽度
  customHeight?: number; // 自定义高度
}

// 定义转换设置的类型
interface ConversionSettings {
  quality: number; // 图片质量
  format: 'jpg' | 'png' | 'webp' | 'bmp' | 'gif'; // 转换格式
  resize: 'original' | 'custom'; // 是否调整尺寸
  width?: number; // 目标宽度
  height?: number; // 目标高度
  maintainAspectRatio: boolean; // 是否保持宽高比
}

// Home组件，主页面
export const Home: React.FC = () => {
  const [images, setImages] = useState<ImageFile[]>([]); // 图片列表状态
  const [isConverting, setIsConverting] = useState(false); // 是否正在转换
  const [convertedCount, setConvertedCount] = useState(0); // 已转换图片数量
  const [totalCount, setTotalCount] = useState(0); // 总图片数量
  const [presetFormat, setPresetFormat] = useState<'jpg' | 'png' | 'webp' | 'bmp' | 'gif'>('jpg'); // 预设输出格式
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 控制下拉菜单的显示状态
  const dropdownTimerRef = useRef<number | null>(null); // 下拉关闭的延迟计时器
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy' | 'terms' | 'contact'>('home'); // 当前页面状态
  const { t } = useI18n();

  // 高级设置的状态
  const [advancedSettings, setAdvancedSettings] = useState<AdvancedSettings>({
    autoRotate: true, // 默认自动旋转
    clearMetadata: true, // 默认清除元数据
    theme: 'light', // 默认浅色主题
    imageQuality: 'medium', // 默认中等质量
    imageSize: 'original', // 默认原始尺寸
    compressionLevel: 'medium', // 默认中等压缩
    outputFormat: 'jpg' // 默认输出jpg
  });

  // 文件上传后的处理函数
  const handleFileSelect = (files: File[]) => {
    // 将上传的文件转为ImageFile对象
    const newImages: ImageFile[] = files.map((file, index) => ({
      id: `img-${Date.now()}-${index}`, // 生成唯一id
      file, // 文件对象
      preview: URL.createObjectURL(file), // 生成预览URL
      originalFormat: file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN', // 获取文件后缀作为格式
      justConverted: false,
    }));
    setImages(prev => [...prev, ...newImages]); // 添加到图片列表
    setTotalCount(prev => prev + files.length); // 更新总数
  };

  // 应用主题切换
  const applyTheme = (theme: 'light' | 'dark') => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-gray-900', 'text-white');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-gray-900', 'text-white');
    }
  };

  // 高级设置变更处理
  const handleSettingsChange = (newSettings: AdvancedSettings) => {
    setAdvancedSettings(newSettings); // 更新高级设置
    
    // 应用主题切换
    if (newSettings.theme !== advancedSettings.theme) {
      applyTheme(newSettings.theme);
    }
  };

  // 组件初始化时应用主题
  React.useEffect(() => {
    applyTheme(advancedSettings.theme);
    
    // 使用MetaManager设置完整的SEO标签
    MetaManager.setAll(META_CONFIGS.home);
    
    // 组件卸载时清理
    return () => {
      MetaManager.cleanup();
    };
  }, []);

  // 应用高级设置到所有图片（目前只是打印日志）
  const handleApplyToAll = () => {
    // 实际应用到所有图片的逻辑
    console.log('应用设置到所有文件:', advancedSettings);
  };

  // 重置高级设置为默认值
  const handleResetSettings = () => {
    setAdvancedSettings({
      autoRotate: true,
      clearMetadata: true,
      theme: 'light',
      imageQuality: 'medium',
      imageSize: 'original',
      compressionLevel: 'medium',
      outputFormat: 'jpg'
    });
  };

  // 单张或批量转换处理
  const handleConvert = async (settings: ConversionSettings) => {
    if (images.length === 0) {
      alert('请先上传图片文件');
      return;
    }

    setIsConverting(true);
    setConvertedCount(0);

    try {
      const results = await Promise.all(images.map(async (img) => {
        const { convertImageInBrowser } = await import('../../utils/convertImage');
        
        // 结合Conversion组件的设置和高级设置
        let finalQuality = settings.quality;
        let finalResize = settings.resize === 'original'
          ? 'original'
          : ((settings.width || settings.height)
              ? { width: settings.width || 0, height: settings.height || 0 }
              : 'original');
        
        // 应用高级设置中的图片质量
        if (advancedSettings.imageQuality === 'low') {
          finalQuality = 60;
        } else if (advancedSettings.imageQuality === 'medium') {
          finalQuality = 80;
        } else if (advancedSettings.imageQuality === 'high') {
          finalQuality = 95;
        }
        
        // 应用高级设置中的图片尺寸
        if (advancedSettings.imageSize !== 'original') {
          if (advancedSettings.imageSize === '30%') {
            finalResize = 'small';
          } else if (advancedSettings.imageSize === '50%') {
            finalResize = 'medium';
          } else if (advancedSettings.imageSize === '70%') {
            finalResize = 'large';
          } else if (advancedSettings.imageSize === 'custom' && advancedSettings.customWidth && advancedSettings.customHeight) {
            finalResize = { 
              width: advancedSettings.customWidth, 
              height: advancedSettings.customHeight 
            };
          }
        }
        
        // 调试日志：显示应用的设置
        console.log('应用高级设置:', {
          originalQuality: settings.quality,
          finalQuality,
          originalResize: settings.resize,
          finalResize,
          compressionLevel: advancedSettings.compressionLevel,
          autoRotate: advancedSettings.autoRotate,
          clearMetadata: advancedSettings.clearMetadata
        });
        
        const { blob, url, width, height } = await convertImageInBrowser(img.file, {
          format: settings.format as any,
          quality: finalQuality,
          resize: finalResize as any,
          maintainAspectRatio: settings.maintainAspectRatio,
          compressionLevel: advancedSettings.compressionLevel,
          autoRotate: advancedSettings.autoRotate,
          clearMetadata: advancedSettings.clearMetadata,
        });
        return { id: img.id, url, size: blob.size, width, height };
      }));

      setImages(prev => prev.map(img => {
        const r = results.find(x => x.id === img.id);
        if (!r) return img;
        return {
          ...img,
          converted: {
            url: r.url,
            format: settings.format,
            size: r.size,
            dimensions: { width: r.width, height: r.height },
          },
          justConverted: true,
        };
      }));

      setConvertedCount(images.length);
    } catch (e) {
      console.error(e);
      alert('转换失败，请重试。');
    } finally {
      setIsConverting(false);
      setTimeout(() => {
        setImages(prev => prev.map(img => ({ ...img, justConverted: false })));
      }, 2000);
    }
  };

  // 批量转换，直接调用handleConvert
  const handleBatchConvert = (settings: ConversionSettings) => {
    handleConvert(settings);
  };

  // 下载转换后的图片
  const handleDownload = (image: ImageFile) => {
    if (!image.converted) { // 没有转换结果时提示
      alert('图片尚未转换完成');
      return;
    }
    
    // 创建a标签进行下载
    const link = document.createElement('a'); // 创建a元素
    link.href = image.converted.url; // 设置下载链接
    link.download = `converted_${image.file.name.split('.')[0]}.${image.converted.format}`; // 设置下载文件名
    document.body.appendChild(link); // 添加到页面
    link.click(); // 触发点击下载
    document.body.removeChild(link); // 移除a标签
  };

  // 重新转换，清除converted字段
  const handleReconvert = (imageId: string) => {
    setImages(prev => prev.map(img => 
      img.id === imageId 
        ? { ...img, converted: undefined } // 清除转换结果
        : img
    ));
  };

  // 返回首页
  const goHome = () => {
    setCurrentPage('home');
  };

  // 渲染隐私政策页面
  const renderPrivacyPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200">
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={goHome}
                className="flex items-center text-gray-500 hover:text-gray-900 mr-4"
              >
                <span className="text-2xl mr-2">←</span>
                返回首页
              </button>
              <h1 className="text-xl font-bold text-gray-900">隐私政策</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">隐私政策</h1>
              <p className="text-gray-600">最后更新：2025年1月</p>
            </div>

            <div className="prose prose-gray max-w-none">
              <section className="mb-8">
                <p className="text-gray-700 mb-4">
                  本政策规定了JFIF转JPG工具站（jfiftojpg.site）在提供所有服务时的隐私保护做法。
                </p>
                <p className="text-gray-700 mb-4">
                  JFIF转JPG工具站致力于在您使用我们的服务并与我们沟通时保护您的隐私。我们非常重视隐私保护，并采取多项措施确保您的信息保持安全和私密。根据各种隐私法规的定义，您应该了解JFIF转JPG工具站是您信息的数据控制者。
                </p>
                <p className="text-gray-700 mb-4">
                  在下面概述的问答部分中，我们回答了有关我们隐私保护做法的几个问题。这些答案应该解释我们如何保护您的信息以及您对个人信息的权利。
                </p>
                <p className="text-gray-700 mb-4">
                  如果您向我们提供了其他个人或组织（例如同事）的个人数据，请确保他们了解我们的隐私政策。此外，只有在您明确授权的情况下，才向我们提供他们的数据。
                </p>
                <p className="text-gray-700 mb-4">
                  本隐私政策是在考虑《中华人民共和国网络安全法》、《中华人民共和国个人信息保护法》等数据法规的情况下制定的。
                </p>
                <p className="text-gray-700 mb-4">
                  如果您对我们的隐私政策的任何方面有进一步的问题，请使用本页底部提供的信息联系我们。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">问答部分</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">1. JFIF转JPG工具站通过其网站收集哪些个人数据？</h3>
                    <p className="text-gray-700 mb-2"><strong>简短版本：</strong>我们收集为向您提供服务所必需的数据，或可以帮助我们改进服务的数据。</p>
                    <p className="text-gray-700 mb-3">
                      访问我们的网站时，JFIF转JPG工具站会收集您的IP地址并将其存储在我们的数据库中。我们还与各种第三方服务合作，这些服务也会收集您的个人数据。这在下面有更详细的描述。
                    </p>
                    
                    <div className="ml-6 space-y-4">
                      <div>
                        <h4 className="text-lg font-medium text-gray-800 mb-2">1.1 文件上传</h4>
                        <p className="text-gray-700 mb-2"><strong>简短版本：</strong>您上传的图片文件仅用于格式转换，转换完成后立即删除。</p>
                        <p className="text-gray-700">
                          当您上传图片文件进行格式转换时，我们会临时存储您的文件以完成转换过程。所有文件都存储在安全的临时服务器中，转换完成后会在8小时内自动删除。我们不会访问或查看您的文件内容，除非此类操作是遵守法律程序所必需的。
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-medium text-gray-800 mb-2">1.2 技术信息</h4>
                        <p className="text-gray-700 mb-2"><strong>简短版本：</strong>我们收集基本的访问信息以提供服务。</p>
                        <p className="text-gray-700">
                          我们收集您的IP地址、浏览器类型、操作系统、屏幕分辨率等基本技术信息，这些信息用于提供服务、防止滥用和改善用户体验。这些信息是匿名的，不会用于识别个人身份。
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-medium text-gray-800 mb-2">1.3 使用统计</h4>
                        <p className="text-gray-700 mb-2"><strong>简短版本：</strong>我们收集匿名使用数据以改进服务。</p>
                        <p className="text-gray-700">
                          我们收集转换次数、文件大小、使用时间等匿名统计数据，这些数据用于分析服务使用情况、改进功能和优化性能。这些数据不会包含任何个人身份信息。
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">2. JFIF转JPG工具站如何保护我的个人数据安全？</h3>
                    <p className="text-gray-700 mb-2"><strong>简短版本：</strong>我们采取许多步骤来确保您的数据尽可能安全。</p>
                    <p className="text-gray-700 mb-3">
                      JFIF转JPG工具站采取多项措施来确保您的数据保持安全和私密。
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>只有授权人员才能访问您的数据。所有有权访问您信息的人员都必须遵守本隐私政策和全球隐私法规。</li>
                      <li>为确保您的数据安全，我们只与世界级的服务提供商（如Cloudflare）合作，并采取措施防止未经授权的访问。</li>
                      <li>用户设备与我们系统之间的所有通信都使用SSL加密。任何存储的密码也在我们的数据库中进行加密。</li>
                      <li>我们定期进行安全审计和更新，确保系统安全性的持续改进。</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">3. JFIF转JPG工具站将我的个人数据用于什么目的？</h3>
                    <p className="text-gray-700 mb-2"><strong>简短版本：</strong>我们使用您的个人数据是为了向您提供服务。我们注意保护您的隐私。</p>
                    <p className="text-gray-700 mb-3">
                      我们收集个人数据的目标是确保充分的支持并持续改进我们的产品。更具体地说，从您那里收集的任何信息仅用于：
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>使您能够使用我们的免费服务</li>
                      <li>在云服务器上存储您的文件</li>
                      <li>监控我们的服务以改进产品</li>
                      <li>防止服务滥用</li>
                      <li>提供客户支持</li>
                      <li>生成匿名统计报告</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">4. JFIF转JPG工具站与谁共享我的个人数据，为什么？</h3>
                    <p className="text-gray-700 mb-2"><strong>简短版本：</strong>我们只在为了向您提供服务时才与其他人共享您的个人数据。我们永远不会将您的数据出售给任何第三方。</p>
                    <p className="text-gray-700 mb-3">
                      JFIF转JPG工具站永远不会将您的数据出售给任何第三方企业，除非您明确授权我们这样做。JFIF转JPG工具站的收入完全来自免费服务。
                    </p>
                    <p className="text-gray-700 mb-3">
                      虽然JFIF转JPG工具站可能与第三方共享您的数据，但只会在以下情况下这样做：
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>如果我们被适用法律要求这样做，或者（根据我们的善意判断）如果此类行动对于遵守法律程序、回应任何法律索赔或行动、或保护JFIF转JPG工具站或其客户的权利是合理必要的，我们可能会向执法机构提供您的信息。</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">5. 我如何查看、更新或删除JFIF转JPG工具站持有的我的个人数据？</h3>
                    <p className="text-gray-700 mb-2"><strong>简短版本：</strong>如果您想查看、更新或删除您的个人数据，请联系我们。</p>
                    <p className="text-gray-700 mb-3">
                      您有权查看、更新或删除我们持有的任何个人数据。请联系我们：support@jfiftojpg.site。我们将尽快回复。
                    </p>
                    <p className="text-gray-700">
                      上传到JFIF转JPG工具站的文件会在8小时后自动永久删除。您也可以在文件自动删除之前手动永久删除文件。
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">6. JFIF转JPG工具站在哪里以及如何存储我的文件？</h3>
                    <p className="text-gray-700 mb-2"><strong>简短版本：</strong>我们将所有文件存储在Cloudflare R2上。</p>
                    <p className="text-gray-700 mb-3">
                      上传到JFIF转JPG工具站的所有文件都存储在Cloudflare R2上。通过将文件存储在Cloudflare R2上，JFIF转JPG工具站可以提供世界级的安全性，同时遵守全球隐私法规。
                    </p>
                    <p className="text-gray-700">
                      请注意，我们不会访问或查看您的文件。我们只会在您明确书面同意的情况下访问或查看您的文件，除非此类行动是遵守法律程序所必需的。您保留对文件的所有权利和所有权。
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">7. 我的个人数据被发送到哪些国家，为什么？</h3>
                    <p className="text-gray-700 mb-2"><strong>简短版本：</strong>我们将您的个人数据传输到中国境外，同时确保无论位置如何，您的数据都受到保护。</p>
                    <p className="text-gray-700 mb-3">
                      当您使用我们的服务时，您的个人数据可能会被传输到其他国家，如美国、欧盟成员国和英国。我们只在被认为符合GDPR法规的国家存储您的数据。此外，我们注意确保无论其最终位置如何，您的个人数据都受到高标准保护。
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">8. JFIF转JPG工具站如何以及为什么使用Cookie（或跟踪技术）？</h3>
                    <p className="text-gray-700 mb-2"><strong>简短版本：</strong>JFIF转JPG工具站和我们合作的一些服务使用Cookie来向您提供服务。没有Cookie的使用，我们将无法提供服务。</p>
                    <p className="text-gray-700 mb-3">
                      JFIF转JPG工具站使用两种类型的Cookie：会话Cookie和1个月Cookie。会话Cookie保存在临时内存中，一旦您关闭浏览器就会被删除。JFIF转JPG工具站使用它们来"记住"您在特定网页会话期间应用的任何更改（例如，保存对文件的更改）。
                    </p>
                    <p className="text-gray-700 mb-3">
                      1个月Cookie用于使您能够使用免费服务而无需创建账户。这个特定的Cookie存储信息，如（1）您在1个月期间使用了多少积分和（2）您在此期间处理了哪些文件。JFIF转JPG工具站使用的Cookie不收集个人身份信息。没有Cookie的使用，我们将无法提供免费服务。
                    </p>
                    <p className="text-gray-700">
                      但是，我们还使用一些使用Cookie的第三方服务。这些包括：Cloudflare（缓解DDoS攻击）、Google Analytics（分析我们网站上的用户行为）等。第三方服务不会从JFIF转JPG工具站接收个人数据，但他们可能会跟踪您在我们网站上的使用情况，并将这些数据与您访问过的其他网站的数据结合起来。
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">9. JFIF转JPG工具站如何管理社交媒体隐私？</h3>
                    <p className="text-gray-700 mb-2"><strong>简短版本：</strong>许多用户在社交媒体上分享、关注和点赞我们的服务，这具有隐私影响。</p>
                    <p className="text-gray-700">
                      JFIF转JPG工具站鼓励用户在Facebook、Twitter和Reddit等社交媒体平台上分享、关注和点赞我们的服务。用户应该知道，这种参与可能允许社交媒体公司跟踪用户活动。因此，请查看Facebook、Twitter和Reddit的具体隐私政策。
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">10. 为什么JFIF转JPG工具站跟踪我的行为和自己的系统？</h3>
                    <p className="text-gray-700 mb-2"><strong>简短版本：</strong>我们跟踪业务的各个方面以改进对您的服务。</p>
                    <p className="text-gray-700">
                      我们跟踪用户行为（这不包括查看/访问您的文件）、我们的系统指标和任何错误，以改进服务并最小化错误。在最大程度上，我们最小化个人数据的收集以维护您的隐私。
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">11. JFIF转JPG工具站保留我的个人信息多长时间？</h3>
                    <p className="text-gray-700 mb-2"><strong>简短版本：</strong>我们只在法律必要的时间内保留您的个人信息。</p>
                    <p className="text-gray-700 mb-3">
                      您有权查看、更新或删除我们持有的任何个人数据。请联系我们：support@jfiftojpg.site。我们将尽快回复。
                    </p>
                    <p className="text-gray-700">
                      上传到JFIF转JPG工具站的文件会在8小时后自动永久删除。您也可以在文件自动删除之前手动永久删除文件。关于您的个人数据，我们将在不再必要后最多三年内删除您的个人数据。
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">12. JFIF转JPG工具站可以更改本隐私政策的条款吗？</h3>
                    <p className="text-gray-700 mb-2"><strong>简短版本：</strong>是的，本隐私政策可能会更改。</p>
                    <p className="text-gray-700">
                      随着隐私法规的成熟和我们的产品改进，请注意JFIF转JPG工具站保留更新本隐私政策的权利。请定期检查此页面以获取我们政策的最新版本。
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">13. 关于我的个人数据，我有哪些法律权利？</h3>
                    <p className="text-gray-700 mb-2"><strong>简短版本：</strong>您的权利基于GDPR等全球和本地隐私法规得到保障。</p>
                    <p className="text-gray-700 mb-3">
                      您有权访问、更新和删除我们持有的任何个人数据。此外，您有权限制我们处理或将您的个人数据传输给另一个数据控制者（即数据可移植性权利）。您必须证明您的身份（例如，通过提供身份证明文件的副本）才能行使这些权利。
                    </p>
                    <p className="text-gray-700">
                      但是，请注意，如果我们有法定义务，我们可能并不总是能够遵守您的要求。如果行使您的权利与您对JFIF转JPG工具站的合同义务相冲突，这可能导致合同提前终止或其他成本。在这种情况下，我们将提前通知您。
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">14. 为什么我必须接受本隐私政策中概述的条款？</h3>
                    <p className="text-gray-700 mb-2"><strong>简短版本：</strong>您通过使用我们的服务来同意接受条款。</p>
                    <p className="text-gray-700 mb-3">
                      当您使用我们的服务时，JFIF转JPG工具站会收集数据。我们服务的性质意味着我们处理和传输您的数据跨越国界。
                    </p>
                    <p className="text-gray-700 mb-3">
                      本隐私政策旨在以简单的格式通知您所有必要的信息。我们希望您在使用我们的服务或与我们沟通之前能够做出明智的选择。
                    </p>
                    <p className="text-gray-700">
                      因此，通过使用我们的服务，您同意根据本文档中建立的条款处理您的个人数据。
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">联系我们</h2>
                <div className="space-y-4 text-gray-700">
                  <p>如果您对我们的隐私政策有任何问题或疑虑，请通过以下方式联系我们：</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>邮箱：support@jfiftojpg.site</li>
                    <li>了解我们：<a href="/about" className="text-blue-600 hover:text-blue-800 underline">关于我们</a></li>
                  </ul>
                  <p>我们将在收到请求后30个工作日内回复。</p>
                </div>
              </section>

              <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  本隐私政策遵循《中华人民共和国网络安全法》、《中华人民共和国个人信息保护法》、《欧盟通用数据保护条例》(GDPR)等相关法律法规制定。
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  // 渲染服务条款页面
  const renderTermsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200">
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={goHome}
                className="flex items-center text-gray-500 hover:text-gray-900 mr-4"
              >
                <span className="text-2xl mr-2">←</span>
                返回首页
              </button>
              <h1 className="text-xl font-bold text-gray-900">服务条款</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">服务条款</h1>
              <p className="text-gray-600">最后更新：2025年1月</p>
            </div>

            <div className="prose prose-gray max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. 服务说明</h2>
                <div className="space-y-4 text-gray-700">
                  <p>JFIF转JPG工具站（以下简称"本网站"）是一个在线图片格式转换服务平台，主要提供以下服务：</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>图片格式转换（JFIF、JPG、PNG、WebP、BMP、GIF等格式互转）</li>
                    <li>批量图片处理</li>
                    <li>图片质量调整</li>
                    <li>图片尺寸调整</li>
                  </ul>
                  <p>本服务完全免费，无需注册账户即可使用。</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. 用户责任</h2>
                <div className="space-y-4 text-gray-700">
                  <p>使用本服务时，您需要承担以下责任：</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>合法使用</strong>：确保上传的图片内容合法，不侵犯他人知识产权</li>
                    <li><strong>内容合规</strong>：不得上传含有违法、色情、暴力等不良内容的图片</li>
                    <li><strong>版权保护</strong>：确保您拥有上传图片的使用权或已获得授权</li>
                    <li><strong>合理使用</strong>：不得恶意占用服务器资源或进行攻击行为</li>
                  </ul>
                </div>
              </section>

              <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  本服务条款遵循《中华人民共和国合同法》、《中华人民共和国电子商务法》等相关法律法规制定。
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  // 渲染联系我们页面
  const renderContactPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200">
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={goHome}
                className="flex items-center text-gray-500 hover:text-gray-900 mr-4"
              >
                <span className="text-2xl mr-2">←</span>
                返回首页
              </button>
              <h1 className="text-xl font-bold text-gray-900">联系我们</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 联系信息 */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">联系信息</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                  📧
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">邮箱联系</h3>
                  <p className="text-gray-600">support@jfiftojpg.site</p>
                  <p className="text-sm text-gray-500">一般问题24小时内回复</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-4">
                  🕒
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">客服时间</h3>
                  <p className="text-gray-600">工作日 9:00 - 18:00</p>
                  <p className="text-sm text-gray-500">节假日 10:00 - 16:00</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-4">
                  🌐
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">网站地址</h3>
                  <p className="text-gray-600">https://jfiftojpg.site</p>
                  <p className="text-sm text-gray-500">7×24小时在线服务</p>
                </div>
              </div>
            </div>
          </div>

          {/* 联系表单 */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">发送消息</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  姓名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入您的姓名"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  邮箱 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入您的邮箱地址"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  消息内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请详细描述您的问题或建议..."
                />
              </div>

              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                发送消息
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  // 根据当前页面状态渲染不同内容
  if (currentPage === 'privacy') {
    return renderPrivacyPage();
  }
  
  if (currentPage === 'terms') {
    return renderTermsPage();
  }
  
  if (currentPage === 'contact') {
    return renderContactPage();
  }

  // 组件渲染
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200 font-['Comic Sans MS', 'Brush Script MT', cursive]">
      {/* Header 头部导航栏 */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* 左侧：品牌 + 导航 */}
            <div className="flex items-center gap-8">
              {/* 品牌区 */}
              <div className="flex items-center space-x-3">
                <Logo size={32} rounded="md" backgroundColorClass="bg-transparent" imgSrc="/icons/logo.svg" imgAlt="logo" />
                <div>
                  <span className="text-xl md:text-2xl font-bold text-[#646cff]">{t('common.brandName')}</span>
                  <p className="hidden sm:block text-xs md:text-sm text-[#646cff]">{t('common.brandSlogan')}</p>
                </div>
              </div>

              {/* 导航：靠左，文字更大 */}
              <nav className="relative flex items-center gap-6 text-base md:text-lg font-medium">
                <div
                  className="relative"
                  onMouseEnter={() => {
                    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
                    setIsDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    dropdownTimerRef.current = window.setTimeout(() => setIsDropdownOpen(false), 600);
                  }}
                >
                  <button className="text-[#646cff] hover:text-[#535bf2] bg-transparent px-0 py-0 focus:outline-none">{t('app.nav.others')}</button>
                  <div
                    className={`absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50 ${isDropdownOpen ? 'block' : 'hidden'}`}
                  >
                    {(['jpg','png','webp','bmp','gif'] as const).map(f => (
                      <button
                        key={f}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-[#646cff] hover:text-[#535bf2]"
                        onClick={() => {
                          setPresetFormat(f);
                          const el = document.getElementById('output-format-select');
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            (el as HTMLSelectElement).focus();
                          }
                          setIsDropdownOpen(false);
                        }}
                      >
                        {f === 'jpg' && t('app.dropdown.toJPG')}
                        {f === 'png' && t('app.dropdown.toPNG')}
                        {f === 'webp' && t('app.dropdown.toWEBP')}
                        {f === 'bmp' && t('app.dropdown.toBMP')}
                        {f === 'gif' && t('app.dropdown.toGIF')}
                      </button>
                    ))}
                  </div>
                </div>
                <a href="#features" className="text-gray-800 hover:text-blue-600">{t('app.nav.features')}</a>
                <a href="#info" className="text-gray-800 hover:text-blue-600">{t('app.nav.info')}</a>
                <a href="#faq" className="text-gray-800 hover:text-blue-600">{t('app.nav.faq')}</a>
              </nav>
            </div>

            {/* 右侧：语言切换 */}
            <div className="hidden md:block"><LanguageSwitcher /></div>
          </div>
        </div>
      </header>

      {/* Main Content 主体内容 */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* 页面标题 */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('app.title')}</h1>
            <p className="text-lg text-gray-600">{t('app.subtitle')}</p>
          </div>

          {/* 文件上传区域 */}
          <section id="file-upload" className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('app.upload.title')}</h2>
              <FileUpload 
                onFileSelect={handleFileSelect} // 上传文件回调
                maxFileSize={10} // 单文件最大10MB
                maxTotalSize={100} // 总大小最大100MB
                acceptedTypes={['image/jpeg', 'image/jfif', 'image/png', 'image/bmp', 'image/gif', 'image/webp']} // 支持的图片类型
              />
            </div>
          </section>

          {/* 预览结果区域 */}
          <section className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('app.preview.title')}</h2>
              {images.length === 0 ? ( // 没有图片时显示提示
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl text-gray-400">📷</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{t('preview.emptyTitle')}</h3>
                  <p className="text-gray-500">{t('preview.emptyDesc')}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 原始图片预览 */}
                  <div className="text-center">
                    <h4 className="text-md font-medium text-gray-900 mb-3">{t('preview.original')}</h4>
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3 border-2 border-dashed border-gray-300">
                      <img
                        src={images[0].preview} // 原图预览
                        alt={images[0].file.name} // 图片alt
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">{images[0].file.name}</p>
                      <p className="bg-gray-100 px-2 py-1 rounded text-xs">{images[0].originalFormat} • {Math.round(images[0].file.size / 1024)} KB</p>
                    </div>
                  </div>

                  {/* 转换后图片预览 */}
                  <div className="text-center">
                    <h4 className="text-md font-medium text-gray-900 mb-3">{t('preview.converted')}</h4>
                    {images[0].converted ? ( // 如果已转换
                      <div>
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3 border-2 border-dashed border-green-300">
                          <img
                            src={images[0].converted.url} // 转换后图片预览
                            alt={`converted-${images[0].file.name}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-sm text-gray-600">
                          <p className="font-medium">{images[0].file.name.split('.')[0]}.{images[0].converted.format}</p>
                          <p className="bg-green-100 px-2 py-1 rounded text-xs">{images[0].converted.format.toUpperCase()} • {Math.round(images[0].converted.size / 1024)} KB</p>
                        </div>
                        <div className="mt-4 space-x-3">
                          <button
                            onClick={() => handleDownload(images[0])} // 下载按钮
                            className={`${images[0].justConverted ? 'animate-pulse ring-2 ring-blue-300' : ''} px-4 py-2 border border-blue-300 bg-white text-blue-700 rounded hover:bg-blue-50 text-sm font-medium`}
                          >
                            {t('preview.download')} {images[0].converted.format.toUpperCase()}
                          </button>
                          <button
                            onClick={() => handleReconvert(images[0].id)} // 重新转换按钮
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm font-medium"
                          >
                            {t('preview.reconvert')}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-3 border-2 border-dashed border-gray-300">
                          <div className="text-center text-gray-400">
                            <div className="text-4xl mb-2">⏳</div>
                            <p className="text-sm">{t('preview.waiting')}</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          <p className="bg-gray-100 px-3 py-2 rounded">{t('preview.clickToStart')}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 转换设置区域 */}
          <section className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('common.conversionSettings')}</h2>
              <Conversion 
                onConvert={handleConvert} // 单张转换回调
                onBatchConvert={handleBatchConvert} // 批量转换回调
                isConverting={isConverting} // 是否正在转换
                convertedCount={convertedCount} // 已转换数量
                totalCount={totalCount} // 总数量
                presetFormat={presetFormat} // 预设输出格式
              />
            </div>
          </section>

          {/* 高级设置区域 */}
          <section className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('common.advancedSettings')}</h2>
              <Settings 
                settings={advancedSettings} // 当前高级设置
                onSettingsChange={handleSettingsChange} // 设置变更回调
                onApplyToAll={handleApplyToAll} // 应用到所有回调
                onReset={handleResetSettings} // 重置回调
              />
            </div>
          </section>

          {/* 使用说明区域 */}
          <section id="features" className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('home.howToConvert')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold mx-auto mb-3">
                    1
                  </div>
                  <h4 className="text-md font-medium text-gray-800 mb-2">{t('home.steps.selectTitle')}</h4>
                  <p className="text-gray-600 text-sm">{t('home.steps.selectDesc')}</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl font-bold mx-auto mb-3">
                    2
                  </div>
                  <h4 className="text-md font-medium text-gray-800 mb-2">{t('home.steps.convertTitle')}</h4>
                  <p className="text-gray-600 text-sm">{t('home.steps.convertDesc')}</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-xl font-bold mx-auto mb-3">
                    3
                  </div>
                  <h4 className="text-md font-medium text-gray-800 mb-2">{t('home.steps.downloadTitle')}</h4>
                  <p className="text-gray-600 text-sm">{t('home.steps.downloadDesc')}</p>
                </div>
              </div>
            </div>
          </section>

          {/* 信息介绍区域 */}
          <section id="info" className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('home.infoTitle')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* JFIF格式介绍 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-800 mb-2">{t('home.formats.jfif.title')}</h4>
                  <p className="text-gray-600 text-sm">
                    {t('home.formats.jfif.desc')}
                  </p>
                </div>
                
                {/* JPG格式介绍 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-800 mb-2">{t('home.formats.jpg.title')}</h4>
                  <p className="text-gray-600 text-sm">
                    {t('home.formats.jpg.desc')}
                  </p>
                </div>
                
                {/* PNG格式介绍 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-800 mb-2">{t('home.formats.png.title')}</h4>
                  <p className="text-gray-600 text-sm">
                    {t('home.formats.png.desc')}
                  </p>
                </div>
                
                {/* WebP格式介绍 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-800 mb-2">{t('home.formats.webp.title')}</h4>
                  <p className="text-gray-600 text-sm">
                    {t('home.formats.webp.desc')}
                  </p>
                </div>
                
                {/* BMP格式介绍 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-800 mb-2">{t('home.formats.bmp.title')}</h4>
                  <p className="text-gray-600 text-sm">
                    {t('home.formats.bmp.desc')}
                  </p>
                </div>
                
                {/* GIF格式介绍 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-800 mb-2">{t('home.formats.gif.title')}</h4>
                  <p className="text-gray-600 text-sm">
                    {t('home.formats.gif.desc')}
                  </p>
                </div>
              </div>

              {/* FAQ 常见问题 */}
              <div id="faq" className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('home.faqTitle')}</h3>
                <dl className="divide-y divide-gray-200 bg-gray-50 rounded-lg">
                  <div className="p-4">
                    <dt className="font-medium text-gray-900">{t('home.faq.q1')}</dt>
                    <dd className="mt-2 text-sm text-gray-600">{t('home.faq.a1')}</dd>
                  </div>
                  <div className="p-4">
                    <dt className="font-medium text-gray-900">{t('home.faq.q2')}</dt>
                    <dd className="mt-2 text-sm text-gray-600">{t('home.faq.a2')}</dd>
                  </div>
                  <div className="p-4">
                    <dt className="font-medium text-gray-900">{t('home.faq.q3')}</dt>
                    <dd className="mt-2 text-sm text-gray-600">{t('home.faq.a3')}</dd>
                  </div>
                  <div className="p-4">
                    <dt className="font-medium text-gray-900">{t('home.faq.q4')}</dt>
                    <dd className="mt-2 text-sm text-gray-600">{t('home.faq.a4')}</dd>
                  </div>
                  <div className="p-4">
                    <dt className="font-medium text-gray-900">{t('home.faq.q5')}</dt>
                    <dd className="mt-2 text-sm text-gray-600">{t('home.faq.a5')}</dd>
                  </div>
                  <div className="p-4">
                    <dt className="font-medium text-gray-900">{t('home.faq.q6')}</dt>
                    <dd className="mt-2 text-sm text-gray-600">{t('home.faq.a6')}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>

          {/* 相关工具区域 */}
          <section className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('home.relatedToolsTitle')}</h3>
              <div className="space-y-6">
                {/* 所有支持的转换格式 */}
                <div>
                  <h4 className="text-md font-medium text-gray-800 mb-3">{t('home.supportedFormats')}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      { key: 'jfifToJpg', tool: t('home.tools.jfifToJpg'), from: 'JFIF', to: 'JPG' },
                      { key: 'jpgToJfif', tool: t('home.tools.jpgToJfif'), from: 'JPG', to: 'JFIF' },
                      { key: 'jfifToPng', tool: t('home.tools.jfifToPng'), from: 'JFIF', to: 'PNG' },
                      { key: 'pngToJfif', tool: t('home.tools.pngToJfif'), from: 'PNG', to: 'JFIF' },
                      { key: 'jfifToWebp', tool: t('home.tools.jfifToWebp'), from: 'JFIF', to: 'WebP' },
                      { key: 'webpToJfif', tool: t('home.tools.webpToJfif'), from: 'WebP', to: 'JFIF' },
                      { key: 'jfifToBmp', tool: t('home.tools.jfifToBmp'), from: 'JFIF', to: 'BMP' },
                      { key: 'bmpToJfif', tool: t('home.tools.bmpToJfif'), from: 'BMP', to: 'JFIF' },
                      { key: 'jfifToGif', tool: t('home.tools.jfifToGif'), from: 'JFIF', to: 'GIF' },
                      { key: 'gifToJfif', tool: t('home.tools.gifToJfif'), from: 'GIF', to: 'JFIF' },
                      { key: 'jpgToPng', tool: t('home.tools.jpgToPng'), from: 'JPG', to: 'PNG' },
                      { key: 'pngToJpg', tool: t('home.tools.pngToJpg'), from: 'PNG', to: 'JPG' },
                      { key: 'jpgToWebp', tool: t('home.tools.jpgToWebp'), from: 'JPG', to: 'WebP' },
                      { key: 'webpToJpg', tool: t('home.tools.webpToJpg'), from: 'WebP', to: 'JPG' },
                      { key: 'jpgToBmp', tool: t('home.tools.jpgToBmp'), from: 'JPG', to: 'BMP' },
                      { key: 'bmpToJpg', tool: t('home.tools.bmpToJpg'), from: 'BMP', to: 'JPG' },
                      { key: 'jpgToGif', tool: t('home.tools.jpgToGif'), from: 'JPG', to: 'GIF' },
                      { key: 'gifToJpg', tool: t('home.tools.gifToJpg'), from: 'GIF', to: 'JPG' },
                      { key: 'pngToWebp', tool: t('home.tools.pngToWebp'), from: 'PNG', to: 'WebP' },
                      { key: 'webpToPng', tool: t('home.tools.webpToPng'), from: 'WebP', to: 'PNG' },
                      { key: 'pngToBmp', tool: t('home.tools.pngToBmp'), from: 'PNG', to: 'BMP' },
                      { key: 'bmpToPng', tool: t('home.tools.bmpToPng'), from: 'BMP', to: 'PNG' },
                      { key: 'pngToGif', tool: t('home.tools.pngToGif'), from: 'PNG', to: 'GIF' },
                      { key: 'gifToPng', tool: t('home.tools.gifToPng'), from: 'GIF', to: 'PNG' },
                      { key: 'webpToBmp', tool: t('home.tools.webpToBmp'), from: 'WebP', to: 'BMP' },
                      { key: 'bmpToWebp', tool: t('home.tools.bmpToWebp'), from: 'BMP', to: 'WebP' },
                      { key: 'webpToGif', tool: t('home.tools.webpToGif'), from: 'WebP', to: 'GIF' },
                      { key: 'gifToWebp', tool: t('home.tools.gifToWebp'), from: 'GIF', to: 'WebP' },
                      { key: 'bmpToGif', tool: t('home.tools.bmpToGif'), from: 'BMP', to: 'GIF' },
                      { key: 'gifToBmp', tool: t('home.tools.gifToBmp'), from: 'GIF', to: 'BMP' }
                    ].map(({ key, tool, to }) => (
                      <button 
                        key={key} 
                        onClick={() => {
                          // 设置预设格式
                          setPresetFormat(to.toLowerCase() as any);
                          // 滚动到文件选择区域
                          const fileUploadSection = document.getElementById('file-upload');
                          if (fileUploadSection) {
                            fileUploadSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }
                        }}
                        className="px-3 py-2 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors border border-blue-200 hover:border-blue-300"
                      >
                        {tool}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 安全承诺区域 */}
          <section className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('home.securityTitle')}</h3>
              <p className="text-gray-600 mb-4">{t('home.dataPriority')}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 text-xl mx-auto mb-3">
                    🔒
                  </div>
                  <h5 className="text-md font-medium text-gray-800 mb-1">{t('home.ssl')}</h5>
                  <p className="text-xs text-gray-500">{t('home.security.sslDesc')}</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xl mx-auto mb-3">
                    🏢
                  </div>
                  <h5 className="text-md font-medium text-gray-800 mb-1">{t('home.dataCenter')}</h5>
                  <p className="text-xs text-gray-500">{t('home.security.dataCenterDesc')}</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 text-xl mx-auto mb-3">
                    👤
                  </div>
                  <h5 className="text-md font-medium text-gray-800 mb-1">{t('home.access')}</h5>
                  <p className="text-xs text-gray-500">{t('home.security.accessDesc')}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer 页脚 */}
      <footer className="bg-gray-900 text-gray-300 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2">
              <Logo size={32} rounded="md" backgroundColorClass="bg-transparent" imgSrc="/icons/logo.svg" imgAlt="logo" />
                 <span className="text-lg font-semibold">{t('common.brandName')}</span>
              </div>
              <p className="mt-3 text-sm text-[#646cff]">{t('home.footer.description')}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">{t('common.converter')}</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a href="#upload" className="hover:text-white">{t('home.footer.converterLinks.jfifToJpg')}</a></li>
                <li><a href="#" className="hover:text-white">{t('home.footer.converterLinks.pngToJpg')}</a></li>
                <li><a href="#" className="hover:text-white">{t('home.footer.converterLinks.bmpToJpg')}</a></li>
                <li><a href="#" className="hover:text-white">{t('home.footer.converterLinks.webpToJpg')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">{t('tools.header.title')}</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white">{t('home.footer.howToUse')}</a></li>
                <li><a href="#faq" className="hover:text-white">{t('home.faqTitle')}</a></li>
                <li><a href="#info" className="hover:text-white">{t('home.footer.formatKnowledge')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">{t('home.footer.aboutLinks.about')}</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a href="/privacy" className="hover:text-white">{t('home.footer.aboutLinks.privacy')}</a></li>
                <li><a href="/terms" className="hover:text-white">{t('home.footer.aboutLinks.terms')}</a></li>
                <li><a href="/about" className="hover:text-white">{t('home.footer.aboutLinks.about')}</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
            <p>© 2025 {t('common.brandName')}. All rights reserved.</p>
            <div className="mt-3 md:mt-0 space-x-4">
              <a href="https://jfiftojpg.site/" className="hover:text-white">Canonical</a>
              <a href="#upload" className="hover:text-white">{t('home.footer.startConversion')}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}; 