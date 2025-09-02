import React, { useEffect } from 'react';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { useI18n } from '../../hooks/useI18n';

export const About: React.FC = () => {
	useEffect(() => {
		const title = 'About jfiftojpg.site | Free JFIF to JPG (jfif to jpg) Converter';
		const description = 'Learn about jfiftojpg.site — a simple, fast, secure tool for jfif to jpg and other image formats. Free, no account, files auto-deleted.';
		const canonicalUrl = 'https://www.jfiftojpg.site/about';

		document.title = title;

		const setMeta = (name: string, content: string) => {
			let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
			if (!tag) {
				tag = document.createElement('meta');
				tag.setAttribute('name', name);
				document.head.appendChild(tag);
			}
			tag.setAttribute('content', content);
		};

		const setCanonical = (href: string) => {
			let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
			if (!link) {
				link = document.createElement('link');
				link.setAttribute('rel', 'canonical');
				document.head.appendChild(link);
			}
			link.setAttribute('href', href);
		};

		const upsertJsonLd = (id: string, data: unknown) => {
			let script = document.getElementById(id) as HTMLScriptElement | null;
			if (!script) {
				script = document.createElement('script');
				script.type = 'application/ld+json';
				script.id = id;
				document.head.appendChild(script);
			}
			script.textContent = JSON.stringify(data);
			return () => { script && script.remove(); };
		};

		setMeta('description', description);
		setCanonical(canonicalUrl);

		const cleanup1 = upsertJsonLd('ld-about-page', {
			"@context": 'https://schema.org',
			"@type": 'AboutPage',
			name: 'About – JFIF to JPG Converter (jfif to jpg)',
			url: canonicalUrl,
			inLanguage: 'en',
			description: description
		});

		const cleanup2 = upsertJsonLd('ld-about-breadcrumb', {
			"@context": 'https://schema.org',
			"@type": 'BreadcrumbList',
			itemListElement: [
				{ "@type": 'ListItem', position: 1, name: 'Home', item: 'https://www.jfiftojpg.site/' },
				{ "@type": 'ListItem', position: 2, name: 'About', item: canonicalUrl }
			]
		});

		return () => {
			cleanup1();
			cleanup2();
		};
	}, []);

	const { t, locale } = useI18n();

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200">
			<header className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center">
							<a href="/" className="text-sm text-gray-600 hover:text-gray-900">{t('common.backHome')}</a>
							<h1 className="ml-4 text-xl font-bold text-gray-900">{locale === 'zh-CN' ? '关于 jfiftojpg.site' : 'About jfiftojpg.site'}</h1>
						</div>
						<LanguageSwitcher />
					</div>
				</div>
			</header>

			<main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8 text-left">
					<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? 'jfiftojpg.site是一个专注于图像格式转换的免费网络工具。我们帮助每个人快速、安全、无需注册地将JFIF转换为JPG——同时也支持PNG、WebP、BMP和GIF格式。该网站运行在由Cloudflare提供支持的现代、可靠的无服务器架构上。' : 'jfiftojpg.site is a focused, free web tool for image format conversion. We help everyone convert JFIF to JPG—and also to PNG, WebP, BMP, and GIF—quickly, securely, and without sign-up. The site runs on a modern, reliable serverless stack powered by Cloudflare.'}</p>

					<hr className="my-8" />

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold text-gray-900">{locale === 'zh-CN' ? '我们的使命' : 'Our Mission'}</h2>
						<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '我们相信日常文件转换应该简单、快速且对每个人都是可访问的。这就是为什么jfiftojpg.site专注于提供强大选项（质量、大小和格式）的清洁体验，同时保持一切免费和私密。' : 'We believe everyday file conversion should be simple, fast, and accessible to everyone. That\'s why jfiftojpg.site focuses on a clean experience with powerful options—quality, size, and format—while keeping everything free and private.'}</p>
					</section>

					<section className="mt-8 space-y-4">
						<h2 className="text-2xl font-semibold text-gray-900">{locale === 'zh-CN' ? '我们的故事' : 'Our Story'}</h2>
						<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '我们创建jfiftojpg.site是为了解决一个特定的痛点：在任何设备上将传统的JFIF图像转换为广泛兼容的格式。随着时间的推移，我们扩展到支持JPG、PNG、WebP、BMP和GIF，采用轻量级控制和受现代网络工具最佳实践启发的极简UI。' : 'We started jfiftojpg.site to solve a specific pain point: converting legacy JFIF images into widely compatible formats on any device. Over time, we expanded to support JPG, PNG, WebP, BMP, and GIF with lightweight controls and a minimal UI inspired by the best of modern web tools.'}</p>
					</section>

					<section className="mt-8 space-y-4">
						<h2 className="text-2xl font-semibold text-gray-900">{locale === 'zh-CN' ? '数据统计' : 'By the Numbers'}</h2>
						<ul className="list-disc pl-6 text-gray-800 space-y-1">
							{locale === 'zh-CN' ? (
								<>
									<li>支持5+种输出格式（JPG / PNG / WebP / BMP / GIF）</li>
									<li>0注册要求 — 100%免费</li>
									<li>文件在8小时内自动删除</li>
									<li>以客户为中心的UX，移动端友好</li>
								</>
							) : (
								<>
									<li>5+ output formats supported (JPG / PNG / WebP / BMP / GIF)</li>
									<li>0 sign-up required — 100% free</li>
									<li>Files auto-deleted within 8 hours</li>
									<li>Client-first UX, mobile-friendly</li>
								</>
							)}
						</ul>
					</section>

					<section className="mt-8 space-y-4">
						<h2 className="text-2xl font-semibold text-gray-900">{locale === 'zh-CN' ? '我们的技术' : 'Our Technology'}</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
							<div>
								<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '前端' : 'Frontend'}</h3>
								<p className="text-left leading-relaxed">React 18, TypeScript, Vite, Tailwind CSS</p>
							</div>
							<div>
								<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '后端' : 'Backend'}</h3>
								<p className="text-left leading-relaxed">Cloudflare Workers, Hono</p>
							</div>
							<div>
								<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '存储' : 'Storage'}</h3>
								<p className="text-left leading-relaxed">{locale === 'zh-CN' ? 'Cloudflare R2（临时存储；8小时内自动删除）' : 'Cloudflare R2 (temporary storage; auto-delete within 8 hours)'}</p>
							</div>
							<div>
								<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '基础设施' : 'Infrastructure'}</h3>
								<p className="text-left leading-relaxed">{locale === 'zh-CN' ? 'Cloudflare（全球CDN、SSL/TLS、安全）' : 'Cloudflare (Global CDN, SSL/TLS, security)'}</p>
							</div>
						</div>
					</section>

					<section className="mt-8 space-y-4">
						<h2 className="text-2xl font-semibold text-gray-900">{locale === 'zh-CN' ? '测试与监控' : 'Testing & Monitoring'}</h2>
						<ul className="list-disc pl-6 text-gray-800 space-y-1">
							{locale === 'zh-CN' ? (
								<>
									<li>API健康、上传、转换和CORS的集成测试</li>
									<li>针对参考设计的手动UI验证</li>
									<li>Cloudflare分析和日志用于基本监控</li>
								</>
							) : (
								<>
									<li>Integration testing of API health, upload, conversion, and CORS</li>
									<li>Manual UI verification against reference designs</li>
									<li>Cloudflare analytics and logs for basic monitoring</li>
								</>
							)}
						</ul>
					</section>

					<section className="mt-8 space-y-4">
						<h2 className="text-2xl font-semibold text-gray-900">{locale === 'zh-CN' ? '透明度与隐私' : 'Transparency & Privacy'}</h2>
						<ul className="list-disc pl-6 text-gray-800 space-y-1">
							{locale === 'zh-CN' ? (
								<>
									<li>无需账户，除了运行服务所必需的内容外不进行跟踪</li>
									<li>文件仅用于转换并自动删除</li>
									<li>详情请参阅我们的 <a href="/privacy" className="text-blue-600 hover:text-blue-800 underline">{locale === 'zh-CN' ? '隐私政策' : 'Privacy Policy'}</a></li>
								</>
							) : (
								<>
									<li>No account required, no tracking beyond what's necessary to run the service</li>
									<li>Files are used only for conversion and removed automatically</li>
									<li>See our <a href="/privacy" className="text-blue-600 hover:text-blue-800 underline">Privacy Policy</a> for details</li>
								</>
							)}
						</ul>
					</section>

					<div className="mt-10 p-4 bg-gray-50 border border-gray-200 rounded text-sm text-gray-600 text-left">
						<p className="text-left leading-relaxed">{locale === 'zh-CN' ? '网站：https://WWW.jfiftojpg.site' : 'Website: https://WWW.jfiftojpg.site'}</p>
					</div>
				</div>
			</main>
		</div>
	);
}; 