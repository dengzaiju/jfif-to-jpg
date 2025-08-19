import React, { useEffect } from 'react';

export const Terms: React.FC = () => {
	useEffect(() => {
		const title = 'Terms of Service | JFIF to JPG (jfif to jpg) Converter | jfiftojpg.site';
		const description = "Terms for using jfiftojpg.site’s free jfif to jpg converter. Simple use, no sign-up, secure processing, and fair-use rules.";
		const canonicalUrl = 'https://www.jfiftojpg.site/terms';

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

		const cleanup1 = upsertJsonLd('ld-terms-webpage', {
			"@context": 'https://schema.org',
			"@type": 'WebPage',
			name: 'Terms of Service – JFIF to JPG Converter (jfif to jpg)',
			url: canonicalUrl,
			inLanguage: 'zh-CN',
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

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200">
			<header className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center">
							<a href="/" className="text-sm text-gray-600 hover:text-gray-900">← Back to Home</a>
							<h1 className="ml-4 text-xl font-bold text-gray-900">Terms of Service</h1>
						</div>
					</div>
				</div>
			</header>

			<main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8">
					<div className="space-y-6 text-gray-800">
						<p>By using our website you accept these terms of use, including our Privacy Policy. If you don't agree, your remedy is to stop using our website. We may update these terms of use from time to time, so you should revisit each time you use our website.</p>
					</div>

					<hr className="my-8" />

					<section className="space-y-6 text-left">
						<h2 className="text-2xl font-semibold text-gray-900">Terms and Conditions</h2>

						{/* Entire Agreement */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">Entire Agreement</h3>
							<p className="text-gray-800">These terms of use form the entire understanding between you and us with respect to your use of our website.</p>
						</div>

						{/* No Unlawful or Prohibited Use */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">No Unlawful or Prohibited Use</h3>
							<p className="text-gray-800">As a condition of your use of this website, you warrant that you will not use this website for any purpose that is unlawful or prohibited by these terms of use.</p>
						</div>

						{/* Links Disclaimer */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">Links Disclaimer</h3>
							<p className="text-gray-800">We have no control over the information accessed through links from our site. You use links at your own risk.</p>
						</div>

						{/* Termination/Access Restriction */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">Termination/Access Restriction</h3>
							<p className="text-gray-800">We reserve the right to terminate your access to this website and the related services or any portion of it at any time, without notice.</p>
						</div>

						{/* Disclaimer */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">Disclaimer</h3>
							<p className="text-gray-800">Anything contained on this website is provided "as is" without warranty or condition of any kind. While we attempt to ensure that the content of our website is correct, we cannot guarantee its reliability, accuracy or completeness because this information changes all the time. You agree that no information or advice provided by us constitutes medical, legal or financial advice or advice of any other regulated industry and users should not rely exclusively on any such information or advice.</p>
						</div>

						{/* Limitation of Liability */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">Limitation of Liability</h3>
							<p className="text-gray-800">We will not be liable to you or any other person or entity for any damages whatsoever arising as a result of your use of this website in any way. In addition, where warranties are implied by law, you acknowledge and agree that the total aggregate liability to us is limited to the total amount paid by you for the particular services that are the subject of the cause of action, even if those services were provided to you without cost. This limitation of liability applies to the fullest extent permitted by law, and shall survive any termination or expiration of this agreement or your use of this website or the services found on this website.</p>
						</div>

						{/* Applicable Law */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">Applicable Law</h3>
							<p className="text-gray-800">If any matter concerning this website "jfiftojpg.site" shall be brought before a court of law, pre- or post-arbitration, viewer, visitor, member, subscriber or customer agrees that the sole and proper jurisdiction to be the state, city and country of the website owner unless otherwise here specified. In the event that litigation is in a federal court, the proper court shall be the closest federal court to the website owner's address.</p>
						</div>

						{/* File ownership and privacy */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">File Ownership and Privacy</h3>
							<p className="text-gray-800">When you use our Services, you provide us with your files. Your files are yours. These Terms don't give us any rights to Your Files except for the limited rights that enable us to offer the Services. We need your permission to do things like converting Your Files and temporarily storing them (via a private URL that is only available to you for downloading the converted file). To convert and deliver converted files, we need to access and store your files. You give us permission to do those things. Please also note that we remove all files from our servers within 8 hours of conversion.</p>
						</div>

						{/* Prohibition of Uploading Copyrighted Content */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">Prohibition of Uploading Copyrighted Content</h3>
							<div className="space-y-4">
								<div>
									<h4 className="font-medium text-gray-900">User Responsibility</h4>
									<p className="text-gray-800">Users are strictly prohibited from uploading, sharing, or distributing any content that infringes on the copyrights or other intellectual property rights of any third party. By using our services, you agree that you will not upload any content you do not have the legal right to distribute.</p>
								</div>
								
								<div>
									<h4 className="font-medium text-gray-900">Prohibition of Circumvention Tools</h4>
									<p className="text-gray-800">You agree not to use our services to upload or convert content from sources that use technological protection measures (TPMs) or digital rights management (DRM) systems, such as YouTube, iTunes, or other streaming services, without proper authorization. Any attempt to bypass or circumvent DRM or copy-protection technology is strictly prohibited.</p>
								</div>
								
								<div>
									<h4 className="font-medium text-gray-900">Consequences of Violation</h4>
									<p className="text-gray-800">If you violate these terms, your access may be suspended or terminated, and any infringing content will be removed promptly. Repeated violations may result in a permanent ban on our services.</p>
								</div>
								
								<div>
									<h4 className="font-medium text-gray-900">User Verification and Accountability</h4>
									<p className="text-gray-800">Users may be required to verify their ownership or rights to any content they upload. You are responsible for ensuring that your use of our service does not violate any laws or third-party rights.</p>
								</div>
								
								<div>
									<h4 className="font-medium text-gray-900">Monitoring and Compliance</h4>
									<p className="text-gray-800">While we do not actively monitor all content uploaded to our platform, we reserve the right to review, remove, or disable access to any content that we believe, in our sole discretion, violates our terms, including but not limited to, content that infringes on intellectual property rights.</p>
								</div>
								
								<div>
									<h4 className="font-medium text-gray-900">DMCA Compliance</h4>
									<p className="text-gray-800">jfiftojpg.site is an Online Service Provider pursuant to 17 U.S.C. §512, commonly known as the Digital Millennium Copyright Act ("DMCA"). The DMCA provides in pertinent part that you can request an Online Service Provider to disable access to infringing material. jfiftojpg.site complies with the provisions of the Digital Millennium Copyright Act (DMCA). If you believe that your copyrighted work has been uploaded to our platform without your permission, you may submit a DMCA takedown notice to our designated agent.</p>
								</div>
								
								<div>
									<h4 className="font-medium text-gray-900">Submission of DMCA Notices</h4>
									<p className="text-gray-800">To file a DMCA takedown notice, please provide the following information:</p>
									<ul className="list-disc pl-6 text-gray-800 space-y-2 mt-2">
										<li>A physical or electronic signature of the copyright owner or a person authorized to act on their behalf;</li>
										<li>Identification of the copyrighted work claimed to have been infringed;</li>
										<li>Identification of the infringing material and information reasonably sufficient to permit us to locate the material;</li>
										<li>Your contact information, including your address, telephone number, and email address;</li>
										<li>A statement that you have a good faith belief that the use of the material is not authorized by the copyright owner, its agent, or the law;</li>
										<li>A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the copyright owner.</li>
									</ul>
								</div>
								
								<div>
									<h4 className="font-medium text-gray-900">Counter-Notification</h4>
									<p className="text-gray-800">If you believe that your content was removed or disabled by mistake or misidentification, you may submit a counter-notification. To file a counter-notification, please provide the following information:</p>
									<ul className="list-disc pl-6 text-gray-800 space-y-2 mt-2">
										<li>Your physical or electronic signature;</li>
										<li>Identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or disabled;</li>
										<li>A statement under penalty of perjury that you have a good faith belief that the material was removed or disabled as a result of a mistake or misidentification of the material;</li>
										<li>Your name, address, telephone number, and email address;</li>
										<li>A statement that you consent to the jurisdiction of the federal court in your district, or if your address is outside of the United States, the jurisdiction of the federal court in the district where jfiftojpg.site is located, and that you will accept service of process from the person who provided the original DMCA notification or an agent of such person.</li>
									</ul>
								</div>
								
								<div>
									<h4 className="font-medium text-gray-900">Repeat Infringers</h4>
									<p className="text-gray-800">jfiftojpg.site will terminate user access determined to be repeat infringers.</p>
								</div>
								
								<div>
									<h4 className="font-medium text-gray-900">Copyright Agent</h4>
									<p className="text-gray-800">Our Designated Copyright Agent to receive notification of claimed infringement can be reached at:</p>
									<div className="mt-2 text-gray-800">
										<p>Email: dmca@jfiftojpg.site</p>
									</div>
								</div>
								
								<div>
									<h4 className="font-medium text-gray-900">Policy Updates</h4>
									<p className="text-gray-800">We reserve the right to update this policy at any time. Users will be notified of significant changes through our website.</p>
								</div>
								
								<p className="text-gray-800">By using our services, you acknowledge and agree to comply with these terms regarding the uploading of copyrighted content and the handling of DMCA reports.</p>
							</div>
						</div>

						{/* Service Information */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">Service Information</h3>
							<p className="text-gray-800">jfiftojpg.site provides free image format conversion services. We do not offer paid subscriptions, billing, or account management. Our service is designed to be simple, accessible, and free for all users.</p>
						</div>

						{/* Copyright */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">Copyright</h3>
							<p className="text-gray-800">All contents of this website are copyright by jfiftojpg.site. Unless otherwise specified, we own or are licensed to use the copyright in all material on our website. Please contact us should you require permission to reproduce any of the contents of this site. We may or may not be able to authorize use, particularly of trademarks or materials of other companies. Only your personal use of our copyright materials is permitted, which means that you may access, download, or print such materials for your personal use only. Commercial use of any sort is expressly prohibited.</p>
						</div>

						{/* Material Connection Disclosure */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">Material Connection Disclosure</h3>
							<p className="text-gray-800">We may promote products or services offered by other individuals or businesses and we may be paid affiliate commissions on any purchase you make. You will not be required to purchase anything we recommend. You should always perform your own due diligence before purchasing a product or service mentioned on this website jfiftojpg.site. All recommendations are made in good faith based upon the opinion of the writer at the time a product or service is mentioned on the website.</p>
						</div>
					</section>

					<div className="mt-10 p-4 bg-gray-50 border border-gray-200 rounded text-sm text-gray-600">
						<p>Service Contact: support@jfiftojpg.site</p>
						<p className="mt-2">These terms comply with applicable laws and regulations.</p>
					</div>
				</div>
			</main>
		</div>
	);
}; 