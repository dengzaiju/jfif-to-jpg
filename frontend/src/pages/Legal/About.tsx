import React, { useEffect } from 'react';

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
			inLanguage: 'zh-CN',
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

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200">
			<header className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center">
							<a href="/" className="text-sm text-gray-600 hover:text-gray-900">← Back to Home</a>
							<h1 className="ml-4 text-xl font-bold text-gray-900">About jfiftojpg.site</h1>
						</div>
					</div>
				</div>
			</header>

			<main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8 text-left">
					<p className="text-gray-800">jfiftojpg.site is a focused, free web tool for image format conversion. We help everyone convert JFIF to JPG—and also to PNG, WebP, BMP, and GIF—quickly, securely, and without sign-up. The site runs on a modern, reliable serverless stack powered by Cloudflare.</p>

					<hr className="my-8" />

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold text-gray-900">Our Mission</h2>
						<p className="text-gray-800">We believe everyday file conversion should be simple, fast, and accessible to everyone. That’s why jfiftojpg.site focuses on a clean experience with powerful options—quality, size, and format—while keeping everything free and private.</p>
					</section>

					<section className="mt-8 space-y-4">
						<h2 className="text-2xl font-semibold text-gray-900">Our Story</h2>
						<p className="text-gray-800">We started jfiftojpg.site to solve a specific pain point: converting legacy JFIF images into widely compatible formats on any device. Over time, we expanded to support JPG, PNG, WebP, BMP, and GIF with lightweight controls and a minimal UI inspired by the best of modern web tools.</p>
					</section>

					<section className="mt-8 space-y-4">
						<h2 className="text-2xl font-semibold text-gray-900">By the Numbers</h2>
						<ul className="list-disc pl-6 text-gray-800 space-y-1">
							<li>5+ output formats supported (JPG / PNG / WebP / BMP / GIF)</li>
							<li>0 sign-up required — 100% free</li>
							<li>Files auto-deleted within 8 hours</li>
							<li>Client-first UX, mobile-friendly</li>
						</ul>
					</section>

					<section className="mt-8 space-y-4">
						<h2 className="text-2xl font-semibold text-gray-900">Our Technology</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
							<div>
								<h3 className="text-xl font-semibold text-gray-900">Frontend</h3>
								<p>React 18, TypeScript, Vite, Tailwind CSS</p>
							</div>
							<div>
								<h3 className="text-xl font-semibold text-gray-900">Backend</h3>
								<p>Cloudflare Workers, Hono</p>
							</div>
							<div>
								<h3 className="text-xl font-semibold text-gray-900">Storage</h3>
								<p>Cloudflare R2 (temporary storage; auto-delete within 8 hours)</p>
							</div>
							<div>
								<h3 className="text-xl font-semibold text-gray-900">Infrastructure</h3>
								<p>Cloudflare (Global CDN, SSL/TLS, security)</p>
							</div>
						</div>
					</section>

					<section className="mt-8 space-y-4">
						<h2 className="text-2xl font-semibold text-gray-900">Testing & Monitoring</h2>
						<ul className="list-disc pl-6 text-gray-800 space-y-1">
							<li>Integration testing of API health, upload, conversion, and CORS</li>
							<li>Manual UI verification against reference designs</li>
							<li>Cloudflare analytics and logs for basic monitoring</li>
						</ul>
					</section>

					<section className="mt-8 space-y-4">
						<h2 className="text-2xl font-semibold text-gray-900">Transparency & Privacy</h2>
						<ul className="list-disc pl-6 text-gray-800 space-y-1">
							<li>No account required, no tracking beyond what's necessary to run the service</li>
							<li>Files are used only for conversion and removed automatically</li>
							<li>See our <a href="/privacy" className="text-blue-600 hover:text-blue-800 underline">Privacy Policy</a> for details</li>
						</ul>
					</section>

					<div className="mt-10 p-4 bg-gray-50 border border-gray-200 rounded text-sm text-gray-600">
						<p>Website: https://WWW.jfiftojpg.site</p>
						
						 
					</div>
				</div>
			</main>
		</div>
	);
}; 