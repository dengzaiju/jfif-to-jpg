import React, { useEffect } from 'react';

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
			inLanguage: 'zh-CN',
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

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200">
			<header className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center">
							<a href="/" className="text-sm text-gray-600 hover:text-gray-900">← Back to Home</a>
							<h1 className="ml-4 text-xl font-bold text-gray-900">Privacy Policy</h1>
						</div>
					</div>
				</div>
			</header>

			<main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8">
					<div className="space-y-6 text-gray-800">
						<p>This policy sets out jfiftojpg.site's privacy practices in connection with all services provided by us.</p>
						<p>JFIF to JPG Converter aims to protect your privacy when you use our services and communicate with us. We take the protection of privacy very seriously and have measures in place to ensure that your information remains secure and private. As defined by applicable privacy regulations (including GDPR), jfiftojpg.site is the Data Controller of your information.</p>
						<p>In the questions and answers section below, we describe how we protect your information and your rights regarding your personal information.</p>
						<p>If you provide us with personal data of other individuals or organizations, please make sure they understand our privacy policy and only provide such data if you are explicitly authorized to do so.</p>
						<p>This privacy policy has been drafted bearing in mind data regulations such as the EU General Data Protection Regulation (GDPR).</p>
					</div>

					<hr className="my-8" />

					<section className="space-y-6 text-left">
						<h2 className="text-2xl font-semibold text-gray-900">Questions and Answers</h2>

						{/* 1 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">1. What personal data does jfiftojpg.site collect through its website?</h3>
							<p className="italic text-gray-700">Short version: We only collect data necessary to provide and improve our service.</p>
							<p className="text-gray-800">When you visit our website, we collect your IP address and basic technical information (browser type, operating system, screen size). We also work with limited third-party services that may collect technical data. Details are outlined below.</p>

							<div className="mt-4 space-y-4">
								<h4 className="font-medium text-gray-900">1.1 Account</h4>
								<p className="italic text-gray-700">Short version: We do not create user accounts for our service.</p>
								<p className="text-gray-800">Our service is free and does not require registration. We do not store account information such as names, emails, or passwords.</p>

								<h4 className="font-medium text-gray-900">1.2 Payment</h4>
								<p className="italic text-gray-700">Short version: We do not process payments.</p>
								<p className="text-gray-800">jfiftojpg.site does not offer paid subscriptions and does not process or store any payment details.</p>

								<h4 className="font-medium text-gray-900">1.3 File storage</h4>
								<p className="italic text-gray-700">Short version: Files are stored temporarily on Cloudflare R2 and deleted automatically.</p>
								<p className="text-gray-800">We store user files (uploaded/converted) on Cloudflare R2 for the purpose of conversion only. Files are automatically and permanently deleted within 8 hours. We do not access or view your files unless required to comply with legal procedures. You retain all rights and ownership of your files.</p>

								<h4 className="font-medium text-gray-900">1.4 Email</h4>
								<p className="italic text-gray-700">Short version: We generally do not send marketing emails.</p>
								<p className="text-gray-800">If you contact us, we may reply via email. We do not send promotional emails by default and you can opt out at any time.</p>

								<h4 className="font-medium text-gray-900">1.5 Performance monitoring</h4>
								<p className="italic text-gray-700">Short version: We may use error/performance monitoring to keep the service reliable.</p>
								<p className="text-gray-800">To diagnose issues, we may record error information and basic technical data (e.g., browser type, OS, screen size, IP address). Some services may use cookies; see the cookies section below.</p>
							</div>
						</div>

						{/* 2 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">2. How does jfiftojpg.site keep my personal data secure?</h3>
							<p className="italic text-gray-700">Short version: Multiple safeguards are in place to keep your data safe.</p>
							<ul className="list-disc pl-6 text-gray-800 space-y-2">
								<li>Access to data is restricted to authorized personnel bound by this policy and applicable regulations (e.g., GDPR).</li>
								<li>Data is stored with world-class providers and protected against unauthorized access.</li>
								<li>All communications between your device and our systems use SSL/TLS encryption.</li>
								<li>Stored credentials, if any, are encrypted. Regular security reviews are performed.</li>
							</ul>
						</div>

						{/* 3 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">3. What does jfiftojpg.site use my personal data for?</h3>
							<p className="italic text-gray-700">Short version: To provide and improve the conversion service.</p>
							<ul className="list-disc pl-6 text-gray-800 space-y-2">
								<li>Enabling you to use our free conversion tools</li>
								<li>Temporarily storing your files on cloud storage to process conversions</li>
								<li>Monitoring service reliability and improving product quality</li>
								<li>Preventing abuse and ensuring security</li>
								<li>Providing customer support upon request</li>
							</ul>
						</div>

						{/* 4 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">4. With whom does jfiftojpg.site share my personal data and why?</h3>
							<p className="italic text-gray-700">Short version: We never sell data. Limited sharing may occur to provide the service or comply with law.</p>
							<ul className="list-disc pl-6 text-gray-800 space-y-2">
								<li>We do not sell your data to third parties.</li>
								<li>We may disclose information if required by applicable law or to protect our rights and users.</li>
							</ul>
						</div>

						{/* 5 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">5. How can I view, update, or delete my personal data?</h3>
							<p className="italic text-gray-700">Short version: Contact us to exercise your rights.</p>
							<p className="text-gray-800">You have the right to access, update, or delete personal data we hold. Files uploaded to jfiftojpg.site are permanently deleted automatically within 8 hours; you may also delete them earlier where available.</p>
						</div>

						{/* 6 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">6. Where and how does jfiftojpg.site store my files?</h3>
							<p className="italic text-gray-700">Short version: Cloudflare R2 (regional) with strong security and automatic deletion.</p>
							<p className="text-gray-800">All files are stored on Cloudflare R2. We do not access or view your files unless legally required. You retain all rights and ownership.</p>
						</div>

						{/* 7 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">7. Which countries is my personal data sent to and why?</h3>
							<p className="italic text-gray-700">Short version: Cross-border transfers may occur; protection is ensured regardless of location.</p>
							<p className="text-gray-800">Your data may be processed in the United States, the European Union, the United Kingdom, or other regions deemed adequate under GDPR. We ensure appropriate safeguards are in place.</p>
						</div>

						{/* 8 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">8. How and why does jfiftojpg.site use cookies?</h3>
							<p className="italic text-gray-700">Short version: We use session and limited-duration cookies; some third-party services also use cookies.</p>
							<p className="text-gray-800">Session cookies remember changes during a session and are deleted when you close your browser. A limited-duration cookie may record anonymous usage (e.g., credits used) to enable the free plan without registration. Cookies we use do not collect personally identifiable information.</p>
							<p className="text-gray-800">Third-party services may include Cloudflare (DDoS protection) and Google Analytics (usage analytics). They do not receive personal data from us but may track your usage on our website.</p>
						</div>

						{/* 9 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">9. How does jfiftojpg.site manage social media privacy?</h3>
							<p className="italic text-gray-700">Short version: Engagement on social platforms may allow those platforms to track activity.</p>
							<p className="text-gray-800">If you choose to share or follow our service on platforms like Facebook, X (Twitter), or Reddit, please refer to their respective privacy policies.</p>
						</div>

						{/* 10 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">10. Why do you track behavior and systems?</h3>
							<p className="italic text-gray-700">Short version: To improve reliability and user experience while minimizing personal data.</p>
							<p className="text-gray-800">We track aggregate usage, system metrics, and errors to improve the service. We avoid collecting personal data where possible.</p>
						</div>

						{/* 11 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">11. How long do you keep my personal information?</h3>
							<p className="italic text-gray-700">Short version: Only as long as legally or operationally necessary.</p>
							<p className="text-gray-800">Uploaded files are deleted automatically within 8 hours. Personal data, where applicable, is retained only as long as necessary and then deleted within a maximum of three years.</p>
						</div>

						{/* 12 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">12. Can this Privacy Policy change?</h3>
							<p className="italic text-gray-700">Short version: Yes, we may update this policy.</p>
							<p className="text-gray-800">As regulations evolve and our product improves, we may update this policy. Please check this page regularly for the latest version.</p>
						</div>

						{/* 13 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">13. What are my legal rights?</h3>
							<p className="italic text-gray-700">Short version: Rights under GDPR and other applicable regulations.</p>
							<p className="text-gray-800">You may have the right to access, rectify, delete, restrict processing, or request portability of your personal data. Identity verification may be required. We may decline requests where we have statutory obligations.</p>
						</div>

						{/* 14 */}
						<div>
							<h3 className="text-xl font-semibold text-gray-900">14. Why do I have to accept these terms?</h3>
							<p className="italic text-gray-700">Short version: By using our service, you consent to processing described here.</p>
							<p className="text-gray-800">Our service processes data across borders to provide image conversion. By using jfiftojpg.site, you agree to the processing of your personal data in accordance with this policy.</p>
						</div>
					</section>

					<div className="mt-10 p-4 bg-gray-50 border border-gray-200 rounded text-sm text-gray-600">
						This policy complies with applicable laws including the EU GDPR and other relevant data protection regulations.
					</div>
				</div>
			</main>
		</div>
	);
}; 