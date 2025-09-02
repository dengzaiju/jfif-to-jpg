import React, { useEffect } from 'react';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { useI18n } from '../../hooks/useI18n';

export const Terms: React.FC = () => {
	useEffect(() => {
		const title = 'Terms of Service | JFIF to JPG (jfif to jpg) Converter | jfiftojpg.site';
		const description = "Terms for using jfiftojpg.site’s free jfif to jpg converter. Simple use, no sign-up, secure processing, and fair-use rules.";
		const canonicalUrl = 'https://www.jfiftojpg.site/terms';

		document.title = title;

		const setMeta = (name: string, content: string) => {
			let tag = document.querySelector(`meta[name=\"${name}\"]`) as HTMLMetaElement | null;
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

		const cleanup1 = upsertJsonLd('ld-terms-webpage', {
			"@context": 'https://schema.org',
			"@type": 'WebPage',
			name: 'Terms of Service – JFIF to JPG Converter (jfif to jpg)',
			url: canonicalUrl,
			inLanguage: 'en',
			description: description
		});

		const cleanup2 = upsertJsonLd('ld-terms-breadcrumb', {
			"@context": 'https://schema.org',
			"@type": 'BreadcrumbList',
			itemListElement: [
				{ "@type": 'ListItem', position: 1, name: 'Home', item: 'https://www.jfiftojpg.site/' },
				{ "@type": 'ListItem', position: 2, name: 'Terms', item: canonicalUrl }
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
							<h1 className="ml-4 text-xl font-bold text-gray-900">{locale === 'zh-CN' ? '服务条款' : 'Terms of Service'}</h1>
						</div>
						<LanguageSwitcher />
					</div>
				</div>
			</header>

			<main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8">
					<div className="space-y-6 text-gray-800 text-left">
						<p className="text-left leading-relaxed">{locale === 'zh-CN' ? '通过使用我们的网站，您接受这些使用条款，包括我们的隐私政策。如果您不同意，您的补救措施是停止使用我们的网站。我们可能会不时更新这些使用条款，因此您每次使用我们的网站时都应该重新访问。' : 'By using our website you accept these terms of use, including our Privacy Policy. If you don\'t agree, your remedy is to stop using our website. We may update these terms of use from time to time, so you should revisit each time you use our website.'}</p>
					</div>

					<hr className="my-8" />

					<section className="space-y-6 text-left">
						<h2 className="text-2xl font-semibold text-gray-900">{locale === 'zh-CN' ? '条款和条件' : 'Terms and Conditions'}</h2>

						{/* Entire Agreement */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '完整协议' : 'Entire Agreement'}</h3>
							<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '这些使用条款构成了您与我们之间关于您使用我们网站的完整理解。' : 'These terms of use form the entire understanding between you and us with respect to your use of our website.'}</p>
						</div>

						{/* No Unlawful or Prohibited Use */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '禁止非法或禁止使用' : 'No Unlawful or Prohibited Use'}</h3>
							<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '作为您使用本网站的条件，您保证不会将本网站用于任何非法或这些使用条款禁止的目的。' : 'As a condition of your use of this website, you warrant that you will not use this website for any purpose that is unlawful or prohibited by these terms of use.'}</p>
						</div>

						{/* Links Disclaimer */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '链接免责声明' : 'Links Disclaimer'}</h3>
							<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '我们无法控制通过我们网站链接访问的信息。您使用链接的风险由您自己承担。' : 'We have no control over the information accessed through links from our site. You use links at your own risk.'}</p>
						</div>

						{/* Termination/Access Restriction */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '终止/访问限制' : 'Termination/Access Restriction'}</h3>
							<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '我们保留随时终止您访问本网站和相关服务或其任何部分的权利，恕不另行通知。' : 'We reserve the right to terminate your access to this website and the related services or any portion of it at any time, without notice.'}</p>
						</div>

						{/* Disclaimer */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '免责声明' : 'Disclaimer'}</h3>
							<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '本网站包含的任何内容均按"原样"提供，不提供任何形式的保证或条件。虽然我们努力确保我们网站内容的正确性，但我们无法保证其可靠性、准确性或完整性，因为这些信息一直在变化。您同意我们提供的任何信息或建议不构成医疗、法律或财务建议或任何其他受监管行业的建议，用户不应完全依赖任何此类信息或建议。' : 'Anything contained on this website is provided "as is" without warranty or condition of any kind. While we attempt to ensure that the content of our website is correct, we cannot guarantee its reliability, accuracy or completeness because this information changes all the time. You agree that no information or advice provided by us constitutes medical, legal or financial advice or advice of any other regulated industry and users should not rely exclusively on any such information or advice.'}</p>
						</div>

						{/* Limitation of Liability */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '责任限制' : 'Limitation of Liability'}</h3>
							<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '我们不会对您或任何其他个人或实体因您以任何方式使用本网站而产生的任何损害承担责任。此外，在法律暗示保证的情况下，您承认并同意对我们的总责任仅限于您为作为诉讼标的的特定服务支付的总金额，即使这些服务是免费提供给您的。此责任限制适用于法律允许的最大范围，并应在本协议终止或到期或您使用本网站或本网站上的服务后继续有效。' : 'We will not be liable to you or any other person or entity for any damages whatsoever arising as a result of your use of this website in any way. In addition, where warranties are implied by law, you acknowledge and agree that the total aggregate liability to us is limited to the total amount paid by you for the particular services that are the subject of the cause of action, even if those services were provided to you without cost. This limitation of liability applies to the fullest extent permitted by law, and shall survive any termination or expiration of this agreement or your use of this website or the services found on this website.'}</p>
						</div>

						{/* Applicable Law */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '适用法律' : 'Applicable Law'}</h3>
							<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '如果有关本网站"jfiftojpg.site"的任何事项被提交到法院，无论是仲裁前还是仲裁后，查看者、访问者、会员、订阅者或客户同意，除非在此另有规定，唯一和适当的管辖权应为网站所有者所在的州、市和国家。如果诉讼在联邦法院进行，适当的法院应为距离网站所有者地址最近的联邦法院。' : 'If any matter concerning this website "jfiftojpg.site" shall be brought before a court of law, pre- or post-arbitration, viewer, visitor, member, subscriber or customer agrees that the sole and proper jurisdiction to be the state, city and country of the website owner unless otherwise here specified. In the event that litigation is in a federal court, the proper court shall be the closest federal court to the website owner\'s address.'}</p>
						</div>

						{/* File ownership and privacy */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '文件所有权和隐私' : 'File Ownership and Privacy'}</h3>
							<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '当您使用我们的服务时，您向我们提供您的文件。您的文件是您的。这些条款不给我们任何对您文件的权利，除了使我们能够提供服务的有限权利。我们需要您的许可来做诸如转换您的文件和临时存储它们（通过仅对您可用的私人URL来下载转换后的文件）等事情。为了转换和交付转换后的文件，我们需要访问和存储您的文件。您给予我们做这些事情的许可。另请注意，我们在转换后8小时内从我们的服务器中删除所有文件。' : 'When you use our Services, you provide us with your files. Your files are yours. These Terms don\'t give us any rights to Your Files except for the limited rights that enable us to offer the Services. We need your permission to do things like converting Your Files and temporarily storing them (via a private URL that is only available to you for downloading the converted file). To convert and deliver converted files, we need to access and store your files. You give us permission to do those things. Please also note that we remove all files from our servers within 8 hours of conversion.'}</p>
						</div>

						{/* Prohibition of Uploading Copyrighted Content */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '禁止上传受版权保护的内容' : 'Prohibition of Uploading Copyrighted Content'}</h3>
							<div className="space-y-4">
								<div>
									<h4 className="font-medium text-gray-900">{locale === 'zh-CN' ? '用户责任' : 'User Responsibility'}</h4>
									<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '严格禁止用户上传、分享或分发侵犯任何第三方版权或其他知识产权的任何内容。通过使用我们的服务，您同意不会上传您没有合法权利分发的内容。' : 'Users are strictly prohibited from uploading, sharing, or distributing any content that infringes on the copyrights or other intellectual property rights of any third party. By using our services, you agree that you will not upload any content you do not have the legal right to distribute.'}</p>
								</div>
								
								<div>
									<h4 className="font-medium text-gray-900">{locale === 'zh-CN' ? '禁止规避工具' : 'Prohibition of Circumvention Tools'}</h4>
									<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '您同意不使用我们的服务上传或转换来自使用技术保护措施（TPM）或数字版权管理（DRM）系统的来源的内容，如YouTube、iTunes或其他流媒体服务，除非获得适当授权。严格禁止任何绕过或规避DRM或复制保护技术的尝试。' : 'You agree not to use our services to upload or convert content from sources that use technological protection measures (TPMs) or digital rights management (DRM) systems, such as YouTube, iTunes, or other streaming services, without proper authorization. Any attempt to bypass or circumvent DRM or copy-protection technology is strictly prohibited.'}</p>
								</div>
								
								<div>
									<h4 className="font-medium text-gray-900">{locale === 'zh-CN' ? '违规后果' : 'Consequences of Violation'}</h4>
									<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '如果您违反这些条款，您的访问可能会被暂停或终止，任何侵权内容将被立即删除。重复违规可能导致对我们的服务永久禁止。' : 'If you violate these terms, your access may be suspended or terminated, and any infringing content will be removed promptly. Repeated violations may result in a permanent ban on our services.'}</p>
								</div>
								
								<div>
									<h4 className="font-medium text-gray-900">{locale === 'zh-CN' ? '用户验证和责任' : 'User Verification and Accountability'}</h4>
									<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '用户可能需要验证他们对上传的任何内容的所有权或权利。您有责任确保您使用我们的服务不违反任何法律或第三方权利。' : 'Users may be required to verify their ownership or rights to any content they upload. You are responsible for ensuring that your use of our service does not violate any laws or third-party rights.'}</p>
								</div>
								
								<div>
									<h4 className="font-medium text-gray-900">{locale === 'zh-CN' ? '监控和合规' : 'Monitoring and Compliance'}</h4>
									<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '虽然我们不主动监控上传到我们平台的所有内容，但我们保留审查、删除或禁用访问任何我们认为违反我们条款的内容的权利，包括但不限于侵犯知识产权的内容。' : 'While we do not actively monitor all content uploaded to our platform, we reserve the right to review, remove, or disable access to any content that we believe, in our sole discretion, violates our terms, including but not limited to, content that infringes on intellectual property rights.'}</p>
								</div>
								
								<div>
									<h4 className="font-medium text-gray-900">{locale === 'zh-CN' ? 'DMCA合规' : 'DMCA Compliance'}</h4>
									<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? 'jfiftojpg.site是根据17 U.S.C. §512的在线服务提供商，通常被称为《数字千年版权法》（"DMCA"）。DMCA的相关部分规定，您可以请求在线服务提供商禁用对侵权材料的访问。jfiftojpg.site遵守《数字千年版权法》（DMCA）的规定。如果您认为您的受版权保护的作品未经您的许可被上传到我们的平台，您可以向我们的指定代理提交DMCA删除通知。' : 'jfiftojpg.site is an Online Service Provider pursuant to 17 U.S.C. §512, commonly known as the Digital Millennium Copyright Act ("DMCA"). The DMCA provides in pertinent part that you can request an Online Service Provider to disable access to infringing material. jfiftojpg.site complies with the provisions of the Digital Millennium Copyright Act (DMCA). If you believe that your copyrighted work has been uploaded to our platform without your permission, you may submit a DMCA takedown notice to our designated agent.'}</p>
								</div>
								
								<div>
									<h4 className="font-medium text-gray-900">{locale === 'zh-CN' ? '提交DMCA通知' : 'Submission of DMCA Notices'}</h4>
									<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '要提交DMCA删除通知，请提供以下信息：' : 'To file a DMCA takedown notice, please provide the following information:'}</p>
									<ul className="list-disc pl-6 text-gray-800 space-y-2 mt-2">
										{locale === 'zh-CN' ? (
											<>
												<li>版权所有者或经授权代表其行事的人的实体或电子签名；</li>
												<li>声称被侵权的受版权保护作品的识别；</li>
												<li>侵权材料的识别和合理充分的信息，使我们能够定位该材料；</li>
												<li>您的联系信息，包括您的地址、电话号码和电子邮件地址；</li>
												<li>声明您善意地相信材料的使用未经版权所有者、其代理人或法律授权；</li>
												<li>声明通知中的信息准确，并且在伪证处罚下，您有权代表版权所有者行事。</li>
											</>
										) : (
											<>
												<li>A physical or electronic signature of the copyright owner or a person authorized to act on their behalf;</li>
												<li>Identification of the copyrighted work claimed to have been infringed;</li>
												<li>Identification of the infringing material and information reasonably sufficient to permit us to locate the material;</li>
												<li>Your contact information, including your address, telephone number, and email address;</li>
												<li>A statement that you have a good faith belief that the use of the material is not authorized by the copyright owner, its agent, or the law;</li>
												<li>A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the copyright owner.</li>
											</>
										)}
									</ul>
								</div>
								
								<div>
									<h4 className="font-medium text-gray-900">{locale === 'zh-CN' ? '反通知' : 'Counter-Notification'}</h4>
									<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '如果您认为您的内容因错误或错误识别而被删除或禁用，您可以提交反通知。要提交反通知，请提供以下信息：' : 'If you believe that your content was removed or disabled by mistake or misidentification, you may submit a counter-notification. To file a counter-notification, please provide the following information:'}</p>
									<ul className="list-disc pl-6 text-gray-800 space-y-2 mt-2">
										{locale === 'zh-CN' ? (
											<>
												<li>您的实体或电子签名；</li>
												<li>已被删除或访问已被禁用的材料的识别，以及该材料在被删除或禁用之前出现的位置；</li>
												<li>在伪证处罚下的声明，您善意地相信材料因错误或材料错误识别而被删除或禁用；</li>
												<li>您的姓名、地址、电话号码和电子邮件地址；</li>
												<li>声明您同意您所在地区的联邦法院管辖权，或者如果您的地址在美国境外，则同意jfiftojpg.site所在地区的联邦法院管辖权，并且您将接受提供原始DMCA通知的人或该人的代理人的送达。</li>
											</>
										) : (
											<>
												<li>Your physical or electronic signature;</li>
												<li>Identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or disabled;</li>
												<li>A statement under penalty of perjury that you have a good faith belief that the material was removed or disabled as a result of a mistake or misidentification of the material;</li>
												<li>Your name, address, telephone number, and email address;</li>
												<li>A statement that you consent to the jurisdiction of the federal court in your district, or if your address is outside of the United States, the jurisdiction of the federal court in the district where jfiftojpg.site is located, and that you will accept service of process from the person who provided the original DMCA notification or an agent of such person.</li>
											</>
										)}
									</ul>
								</div>
								
								<div>
									<h4 className="font-medium text-gray-900">{locale === 'zh-CN' ? '重复侵权者' : 'Repeat Infringers'}</h4>
									<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? 'jfiftojpg.site将终止被确定为重复侵权者的用户访问。' : 'jfiftojpg.site will terminate user access determined to be repeat infringers.'}</p>
								</div>
								
								<div>
									<h4 className="font-medium text-gray-900">{locale === 'zh-CN' ? '版权代理' : 'Copyright Agent'}</h4>
									<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '我们的指定版权代理接收侵权通知可以通过以下方式联系：' : 'Our Designated Copyright Agent to receive notification of claimed infringement can be reached at:'}</p>
									<div className="mt-2 text-gray-800">
										<p className="text-left leading-relaxed">Email: dmca@jfiftojpg.site</p>
									</div>
								</div>
								
								<div>
									<h4 className="font-medium text-gray-900">{locale === 'zh-CN' ? '政策更新' : 'Policy Updates'}</h4>
									<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '我们保留随时更新此政策的权利。重要变更将通过我们的网站通知用户。' : 'We reserve the right to update this policy at any time. Users will be notified of significant changes through our website.'}</p>
								</div>
								
								<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '通过使用我们的服务，您承认并同意遵守这些关于上传受版权保护内容和处理DMCA报告的条款。' : 'By using our services, you acknowledge and agree to comply with these terms regarding the uploading of copyrighted content and the handling of DMCA reports.'}</p>
							</div>
						</div>

						{/* Service Information */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '服务信息' : 'Service Information'}</h3>
							<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? 'jfiftojpg.site提供免费的图像格式转换服务。我们不提供付费订阅、计费或账户管理。我们的服务旨在简单、易用且对所有用户免费。' : 'jfiftojpg.site provides free image format conversion services. We do not offer paid subscriptions, billing, or account management. Our service is designed to be simple, accessible, and free for all users.'}</p>
						</div>

						{/* Copyright */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '版权' : 'Copyright'}</h3>
							<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '本网站的所有内容均由jfiftojpg.site拥有版权。除非另有说明，我们拥有或被许可使用我们网站上所有材料的版权。如果您需要复制本网站任何内容的许可，请联系我们。我们可能能够也可能无法授权使用，特别是其他公司的商标或材料。仅允许您个人使用我们的版权材料，这意味着您只能访问、下载或打印此类材料供个人使用。明确禁止任何形式的商业使用。' : 'All contents of this website are copyright by jfiftojpg.site. Unless otherwise specified, we own or are licensed to use the copyright in all material on our website. Please contact us should you require permission to reproduce any of the contents of this site. We may or may not be able to authorize use, particularly of trademarks or materials of other companies. Only your personal use of our copyright materials is permitted, which means that you may access, download, or print such materials for your personal use only. Commercial use of any sort is expressly prohibited.'}</p>
						</div>

						{/* Material Connection Disclosure */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">{locale === 'zh-CN' ? '实质性关联披露' : 'Material Connection Disclosure'}</h3>
							<p className="text-gray-800 text-left leading-relaxed">{locale === 'zh-CN' ? '我们可能会推广其他个人或企业提供的产品或服务，我们可能会从您进行的任何购买中获得联盟佣金。您不会被要求购买我们推荐的任何东西。在购买本网站jfiftojpg.site上提到的产品或服务之前，您应该始终进行自己的尽职调查。所有推荐都是基于作者在网站上提到产品或服务时的意见善意做出的。' : 'We may promote products or services offered by other individuals or businesses and we may be paid affiliate commissions on any purchase you make. You will not be required to purchase anything we recommend. You should always perform your own due diligence before purchasing a product or service mentioned on this website jfiftojpg.site. All recommendations are made in good faith based upon the opinion of the writer at the time a product or service is mentioned on the website.'}</p>
						</div>
					</section>

					<div className="mt-10 p-4 bg-gray-50 border border-gray-200 rounded text-sm text-gray-600 text-left">
						<p className="text-left leading-relaxed">{locale === 'zh-CN' ? '服务联系：support@jfiftojpg.site' : 'Service Contact: support@jfiftojpg.site'}</p>
						<p className="mt-2 text-left leading-relaxed">{locale === 'zh-CN' ? '这些条款符合适用的法律和法规。' : 'These terms comply with applicable laws and regulations.'}</p>
					</div>
				</div>
			</main>
		</div>
	);
}; 