import React, { useEffect } from 'react';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { useI18n } from '../../hooks/useI18n';

export const Privacy: React.FC = () => {
	useEffect(() => {
		const title = 'Privacy Policy | JFIF to JPG (jfif to jpg) Converter | jfiftojpg.site';
		const description = 'Read how jfiftojpg.site handles your files for jfif to jpg conversion — secure, private, auto-delete within 8 hours, and GDPR-friendly.';
		const canonicalUrl = 'https://www.jfiftojpg.site/privacy';

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

		const cleanup1 = upsertJsonLd('ld-privacy-webpage', {
			"@context": 'https://schema.org',
			"@type": 'WebPage',
			name: 'Privacy Policy – JFIF to JPG Converter (jfif to jpg)',
			url: canonicalUrl,
			inLanguage: 'en',
			description: description
		});

		const cleanup2 = upsertJsonLd('ld-privacy-breadcrumb', {
			"@context": 'https://schema.org',
			"@type": 'BreadcrumbList',
			itemListElement: [
				{ "@type": 'ListItem', position: 1, name: 'Home', item: 'https://www.jfiftojpg.site/' },
				{ "@type": 'ListItem', position: 2, name: 'Privacy', item: canonicalUrl }
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
							<h1 className="ml-4 text-xl font-bold text-gray-900">{locale === 'zh-CN' ? '隐私政策' : 'Privacy Policy'}</h1>
						</div>
						<LanguageSwitcher />
					</div>
				</div>
			</header>

			<main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8">
					<div className="space-y-6 text-gray-800 text-left">
						{locale === 'zh-CN' ? (
							<>
								<p className="text-left leading-relaxed">本政策规定了jfiftojpg.site与我们提供的所有服务相关的隐私实践。</p>
								<p className="text-left leading-relaxed">JFIF转JPG转换器旨在保护您在使用我们的服务和与我们沟通时的隐私。我们非常重视隐私保护，并制定了措施确保您的信息保持安全和私密。根据适用的隐私法规（包括GDPR），jfiftojpg.site是您信息的数据控制者。</p>
								<p className="text-left leading-relaxed">在下面的问答部分中，我们描述了如何保护您的信息以及您对个人信息的权利。</p>
								<p className="text-left leading-relaxed">如果您向我们提供其他个人或组织的个人数据，请确保他们了解我们的隐私政策，并且只有在明确授权的情况下才提供此类数据。</p>
								<p className="text-left leading-relaxed">本隐私政策是在考虑欧盟通用数据保护条例（GDPR）等数据法规的情况下制定的。</p>
							</>
						) : (
							<>
								<p className="text-left leading-relaxed">This policy sets out jfiftojpg.site's privacy practices in connection with all services provided by us.</p>
								<p className="text-left leading-relaxed">JFIF to JPG Converter aims to protect your privacy when you use our services and communicate with us. We take the protection of privacy very seriously and have measures in place to ensure that your information remains secure and private. As defined by applicable privacy regulations (including GDPR), jfiftojpg.site is the Data Controller of your information.</p>
								<p className="text-left leading-relaxed">In the questions and answers section below, we describe how we protect your information and your rights regarding your personal information.</p>
								<p className="text-left leading-relaxed">If you provide us with personal data of other individuals or organizations, please make sure they understand our privacy policy and only provide such data if you are explicitly authorized to do so.</p>
								<p className="text-left leading-relaxed">This privacy policy has been drafted bearing in mind data regulations such as the EU General Data Protection Regulation (GDPR).</p>
							</>
						)}
					</div>

					<hr className="my-8" />

					<section className="space-y-6 text-left">
						<h2 className="text-2xl font-semibold text-gray-900">{locale === 'zh-CN' ? '问题与答案' : 'Questions and Answers'}</h2>

						{/* 1 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '1. jfiftojpg.site通过其网站收集哪些个人数据？' : '1. What personal data does jfiftojpg.site collect through its website?'}</h3>
							<p className="italic text-gray-700 text-left leading-relaxed">{locale === 'zh-CN' ? '简短版本：我们只收集提供和改进服务所需的数据。' : 'Short version: We only collect data necessary to provide and improve our service.'}</p>
							<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '当您访问我们的网站时，我们收集您的IP地址和基本技术信息（浏览器类型、操作系统、屏幕尺寸）。我们还与有限的第三方服务合作，这些服务可能会收集技术数据。详细信息如下。' : 'When you visit our website, we collect your IP address and basic technical information (browser type, operating system, screen size). We also work with limited third-party services that may collect technical data. Details are outlined below.'}</p>

							<div className="mt-4 space-y-4">
								<h4 className="font-medium text-gray-900">{locale === 'zh-CN' ? '1.1 账户' : '1.1 Account'}</h4>
								<p className="italic text-gray-700 text-left leading-relaxed">{locale === 'zh-CN' ? '简短版本：我们不为我们的服务创建用户账户。' : 'Short version: We do not create user accounts for our service.'}</p>
								<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '我们的服务是免费的，不需要注册。我们不存储姓名、电子邮件或密码等账户信息。' : 'Our service is free and does not require registration. We do not store account information such as names, emails, or passwords.'}</p>

								<h4 className="font-medium text-gray-900">{locale === 'zh-CN' ? '1.2 支付' : '1.2 Payment'}</h4>
								<p className="italic text-gray-700 text-left leading-relaxed">{locale === 'zh-CN' ? '简短版本：我们不处理支付。' : 'Short version: We do not process payments.'}</p>
								<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? 'jfiftojpg.site不提供付费订阅，也不处理或存储任何支付详情。' : 'jfiftojpg.site does not offer paid subscriptions and does not process or store any payment details.'}</p>

								<h4 className="font-medium text-gray-900">{locale === 'zh-CN' ? '1.3 文件存储' : '1.3 File storage'}</h4>
								<p className="italic text-gray-700 text-left leading-relaxed">{locale === 'zh-CN' ? '简短版本：文件临时存储在Cloudflare R2上并自动删除。' : 'Short version: Files are stored temporarily on Cloudflare R2 and deleted automatically.'}</p>
								<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '我们将用户文件（上传/转换）存储在Cloudflare R2上，仅用于转换目的。文件在8小时内自动永久删除。除非需要遵守法律程序，否则我们不会访问或查看您的文件。您保留所有权利和文件所有权。' : 'We store user files (uploaded/converted) on Cloudflare R2 for the purpose of conversion only. Files are automatically and permanently deleted within 8 hours. We do not access or view your files unless required to comply with legal procedures. You retain all rights and ownership of your files.'}</p>

								<h4 className="font-medium text-gray-900">{locale === 'zh-CN' ? '1.4 电子邮件' : '1.4 Email'}</h4>
								<p className="italic text-gray-700 text-left leading-relaxed">{locale === 'zh-CN' ? '简短版本：我们通常不发送营销电子邮件。' : 'Short version: We generally do not send marketing emails.'}</p>
								<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '如果您联系我们，我们可能会通过电子邮件回复。我们默认不发送促销电子邮件，您可以随时选择退出。' : 'If you contact us, we may reply via email. We do not send promotional emails by default and you can opt out at any time.'}</p>

								<h4 className="font-medium text-gray-900">{locale === 'zh-CN' ? '1.5 性能监控' : '1.5 Performance monitoring'}</h4>
								<p className="italic text-gray-700 text-left leading-relaxed">{locale === 'zh-CN' ? '简短版本：我们可能使用错误/性能监控来保持服务可靠性。' : 'Short version: We may use error/performance monitoring to keep the service reliable.'}</p>
								<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '为了诊断问题，我们可能会记录错误信息和基本技术数据（例如，浏览器类型、操作系统、屏幕尺寸、IP地址）。某些服务可能使用cookie；请参阅下面的cookie部分。' : 'To diagnose issues, we may record error information and basic technical data (e.g., browser type, OS, screen size, IP address). Some services may use cookies; see the cookies section below.'}</p>
							</div>
						</div>

						{/* 2 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '2. jfiftojpg.site如何保护我的个人数据安全？' : '2. How does jfiftojpg.site keep my personal data secure?'}</h3>
							<p className="italic text-gray-700 text-left leading-relaxed">{locale === 'zh-CN' ? '简短版本：多项保障措施到位，确保您的数据安全。' : 'Short version: Multiple safeguards are in place to keep your data safe.'}</p>
							<ul className="list-disc pl-6 text-gray-800 space-y-2">
								{locale === 'zh-CN' ? (
									<>
										<li>数据访问仅限于受本政策和适用法规（如GDPR）约束的授权人员。</li>
										<li>数据存储在世界级提供商处，并防止未经授权的访问。</li>
										<li>您的设备与我们系统之间的所有通信都使用SSL/TLS加密。</li>
										<li>存储的凭据（如有）已加密。定期进行安全审查。</li>
									</>
								) : (
									<>
										<li>Access to data is restricted to authorized personnel bound by this policy and applicable regulations (e.g., GDPR).</li>
										<li>Data is stored with world-class providers and protected against unauthorized access.</li>
										<li>All communications between your device and our systems use SSL/TLS encryption.</li>
										<li>Stored credentials, if any, are encrypted. Regular security reviews are performed.</li>
									</>
								)}
							</ul>
						</div>

						{/* 3 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '3. jfiftojpg.site将我的个人数据用于什么目的？' : '3. What does jfiftojpg.site use my personal data for?'}</h3>
							<p className="italic text-gray-700 text-left leading-relaxed">{locale === 'zh-CN' ? '简短版本：提供和改进转换服务。' : 'Short version: To provide and improve the conversion service.'}</p>
							<ul className="list-disc pl-6 text-gray-800 space-y-2">
								{locale === 'zh-CN' ? (
									<>
										<li>使您能够使用我们的免费转换工具</li>
										<li>在云存储上临时存储您的文件以处理转换</li>
										<li>监控服务可靠性并提高产品质量</li>
										<li>防止滥用并确保安全</li>
										<li>根据要求提供客户支持</li>
									</>
								) : (
									<>
										<li>Enabling you to use our free conversion tools</li>
										<li>Temporarily storing your files on cloud storage to process conversions</li>
										<li>Monitoring service reliability and improving product quality</li>
										<li>Preventing abuse and ensuring security</li>
										<li>Providing customer support upon request</li>
									</>
								)}
							</ul>
						</div>

						{/* 4 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '4. jfiftojpg.site与谁共享我的个人数据以及原因？' : '4. With whom does jfiftojpg.site share my personal data and why?'}</h3>
							<p className="italic text-gray-700 text-left leading-relaxed">{locale === 'zh-CN' ? '简短版本：我们从不销售数据。有限的共享可能发生在提供服务或遵守法律时。' : 'Short version: We never sell data. Limited sharing may occur to provide the service or comply with law.'}</p>
							<ul className="list-disc pl-6 text-gray-800 space-y-2">
								{locale === 'zh-CN' ? (
									<>
										<li>我们不会将您的数据出售给第三方。</li>
										<li>如果适用法律要求或为了保护我们的权利和用户，我们可能会披露信息。</li>
									</>
								) : (
									<>
										<li>We do not sell your data to third parties.</li>
										<li>We may disclose information if required by applicable law or to protect our rights and users.</li>
									</>
								)}
							</ul>
						</div>

						{/* 5 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '5. 我如何查看、更新或删除我的个人数据？' : '5. How can I view, update, or delete my personal data?'}</h3>
							<p className="italic text-gray-700 text-left leading-relaxed">{locale === 'zh-CN' ? '简短版本：联系我们行使您的权利。' : 'Short version: Contact us to exercise your rights.'}</p>
							<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '您有权访问、更新或删除我们持有的个人数据。上传到jfiftojpg.site的文件在8小时内自动永久删除；您也可以在可用的情况下提前删除它们。' : 'You have the right to access, update, or delete personal data we hold. Files uploaded to jfiftojpg.site are permanently deleted automatically within 8 hours; you may also delete them earlier where available.'}</p>
						</div>

						{/* 6 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '6. jfiftojpg.site在哪里以及如何存储我的文件？' : '6. Where and how does jfiftojpg.site store my files?'}</h3>
							<p className="italic text-gray-700 text-left leading-relaxed">{locale === 'zh-CN' ? '简短版本：Cloudflare R2（区域）具有强大的安全性和自动删除功能。' : 'Short version: Cloudflare R2 (regional) with strong security and automatic deletion.'}</p>
							<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '所有文件都存储在Cloudflare R2上。除非法律要求，否则我们不会访问或查看您的文件。您保留所有权利和所有权。' : 'All files are stored on Cloudflare R2. We do not access or view your files unless legally required. You retain all rights and ownership.'}</p>
						</div>

						{/* 7 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '7. 我的个人数据被发送到哪些国家以及原因？' : '7. Which countries is my personal data sent to and why?'}</h3>
							<p className="italic text-gray-700 text-left leading-relaxed">{locale === 'zh-CN' ? '简短版本：可能发生跨境传输；无论位置如何都确保保护。' : 'Short version: Cross-border transfers may occur; protection is ensured regardless of location.'}</p>
							<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '您的数据可能在美利坚合众国、欧洲联盟、联合王国或GDPR认为充分的其他地区进行处理。我们确保适当的保障措施到位。' : 'Your data may be processed in the United States, the European Union, the United Kingdom, or other regions deemed adequate under GDPR. We ensure appropriate safeguards are in place.'}</p>
						</div>

						{/* 8 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '8. jfiftojpg.site如何以及为什么使用cookie？' : '8. How and why does jfiftojpg.site use cookies?'}</h3>
							<p className="italic text-gray-700 text-left leading-relaxed">{locale === 'zh-CN' ? '简短版本：我们使用会话和有限期限的cookie；一些第三方服务也使用cookie。' : 'Short version: We use session and limited-duration cookies; some third-party services also use cookies.'}</p>
							<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '会话cookie记住会话期间的更改，当您关闭浏览器时会被删除。有限期限的cookie可能会记录匿名使用情况（例如，使用的积分）以在没有注册的情况下启用免费计划。我们使用的cookie不会收集个人身份信息。' : 'Session cookies remember changes during a session and are deleted when you close your browser. A limited-duration cookie may record anonymous usage (e.g., credits used) to enable the free plan without registration. Cookies we use do not collect personally identifiable information.'}</p>
							<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '第三方服务可能包括Cloudflare（DDoS保护）和Google Analytics（使用分析）。他们不会从我们这里接收个人数据，但可能会跟踪您在我们网站上的使用情况。' : 'Third-party services may include Cloudflare (DDoS protection) and Google Analytics (usage analytics). They do not receive personal data from us but may track your usage on our website.'}</p>
						</div>

						{/* 9 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '9. jfiftojpg.site如何管理社交媒体隐私？' : '9. How does jfiftojpg.site manage social media privacy?'}</h3>
							<p className="italic text-gray-700 text-left leading-relaxed">{locale === 'zh-CN' ? '简短版本：在社交平台上的参与可能允许这些平台跟踪活动。' : 'Short version: Engagement on social platforms may allow those platforms to track activity.'}</p>
							<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '如果您选择在Facebook、X（Twitter）或Reddit等平台上分享或关注我们的服务，请参考他们各自的隐私政策。' : 'If you choose to share or follow our service on platforms like Facebook, X (Twitter), or Reddit, please refer to their respective privacy policies.'}</p>
						</div>

						{/* 10 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '10. 为什么您要跟踪行为和系统？' : '10. Why do you track behavior and systems?'}</h3>
							<p className="italic text-gray-700 text-left leading-relaxed">{locale === 'zh-CN' ? '简短版本：在最小化个人数据的同时提高可靠性和用户体验。' : 'Short version: To improve reliability and user experience while minimizing personal data.'}</p>
							<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '我们跟踪聚合使用情况、系统指标和错误以改进服务。我们尽可能避免收集个人数据。' : 'We track aggregate usage, system metrics, and errors to improve the service. We avoid collecting personal data where possible.'}</p>
						</div>

						{/* 11 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '11. 您保留我的个人信息多长时间？' : '11. How long do you keep my personal information?'}</h3>
							<p className="italic text-gray-700 text-left leading-relaxed">{locale === 'zh-CN' ? '简短版本：仅在法律或运营上必要的时间内。' : 'Short version: Only as long as legally or operationally necessary.'}</p>
							<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '上传的文件在8小时内自动删除。个人数据（如适用）仅在必要时保留，然后在最多三年内删除。' : 'Uploaded files are deleted automatically within 8 hours. Personal data, where applicable, is retained only as long as necessary and then deleted within a maximum of three years.'}</p>
						</div>

						{/* 12 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '12. 此隐私政策可以更改吗？' : '12. Can this Privacy Policy change?'}</h3>
							<p className="italic text-gray-700 text-left leading-relaxed">{locale === 'zh-CN' ? '简短版本：是的，我们可能会更新此政策。' : 'Short version: Yes, we may update this policy.'}</p>
							<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '随着法规的发展和我们的产品改进，我们可能会更新此政策。请定期检查此页面以获取最新版本。' : 'As regulations evolve and our product improves, we may update this policy. Please check this page regularly for the latest version.'}</p>
						</div>

						{/* 13 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '13. 我的法律权利是什么？' : '13. What are my legal rights?'}</h3>
							<p className="italic text-gray-700 text-left leading-relaxed">{locale === 'zh-CN' ? '简短版本：GDPR和其他适用法规下的权利。' : 'Short version: Rights under GDPR and other applicable regulations.'}</p>
							<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '您可能有权访问、纠正、删除、限制处理或请求您的个人数据的可移植性。可能需要身份验证。在我们有法定义务的情况下，我们可能会拒绝请求。' : 'You may have the right to access, rectify, delete, restrict processing, or request portability of your personal data. Identity verification may be required. We may decline requests where we have statutory obligations.'}</p>
						</div>

						{/* 14 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '14. 为什么我必须接受这些条款？' : '14. Why do I have to accept these terms?'}</h3>
							<p className="italic text-gray-700 text-left leading-relaxed">{locale === 'zh-CN' ? '简短版本：通过使用我们的服务，您同意此处描述的处理。' : 'Short version: By using our service, you consent to processing described here.'}</p>
							<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '我们的服务跨边界处理数据以提供图像转换。通过使用jfiftojpg.site，您同意根据本政策处理您的个人数据。' : 'Our service processes data across borders to provide image conversion. By using jfiftojpg.site, you agree to the processing of your personal data in accordance with this policy.'}</p>
						</div>
					</section>

					<div className="mt-10 p-4 bg-gray-50 border border-gray-200 rounded text-sm text-gray-600 text-left">
						{locale === 'zh-CN' ? '本政策符合适用法律，包括欧盟GDPR和其他相关数据保护法规。' : 'This policy complies with applicable laws including the EU GDPR and other relevant data protection regulations.'}
					</div>
				</div>
			</main>
		</div>
	);
}; 