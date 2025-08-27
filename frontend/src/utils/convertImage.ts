export type OutputFormat = 'jpg' | 'jpeg' | 'png' | 'webp' | 'bmp' | 'gif';

export interface ConvertOptions {
	format: OutputFormat;
	quality?: number; // 0-100
	resize?: 'original' | 'small' | 'medium' | 'large' | { width: number; height: number };
	maintainAspectRatio?: boolean;
}

function createImageBitmapFromFile(file: File): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = URL.createObjectURL(file);
	});
}

function getTargetSize(
	img: HTMLImageElement,
	resize: ConvertOptions['resize'],
	maintainAspectRatio: boolean
): { width: number; height: number } {
	if (!resize || resize === 'original') {
		return { width: img.naturalWidth, height: img.naturalHeight };
	}
	if (typeof resize === 'object') {
		if (maintainAspectRatio) {
			const ratio = img.naturalWidth / img.naturalHeight;
			let { width, height } = resize;
			if (width && !height) height = Math.round(width / ratio);
			if (height && !width) width = Math.round(height * ratio);
			return { width, height };
		}
		return { width: resize.width, height: resize.height };
	}
	const map = {
		small: 0.25,
		medium: 0.5,
		large: 0.75,
	} as const;
	const scale = map[resize] ?? 1;
	return {
		width: Math.max(1, Math.round(img.naturalWidth * scale)),
		height: Math.max(1, Math.round(img.naturalHeight * scale)),
	};
}

function mimeForFormat(format: OutputFormat): string {
	if (format === 'jpg') return 'image/jpeg';
	if (format === 'bmp') return 'image/bmp';
	if (format === 'gif') return 'image/gif';
	return `image/${format}`;
}

export async function convertImageInBrowser(
	file: File,
	options: ConvertOptions
): Promise<{ blob: Blob; url: string; width: number; height: number }>
{
	const img = await createImageBitmapFromFile(file);
	const { width, height } = getTargetSize(img, options.resize ?? 'original', options.maintainAspectRatio ?? true);
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext('2d');
	if (!ctx) throw new Error('Canvas 2D context not available');
	ctx.drawImage(img, 0, 0, width, height);

	const mime = mimeForFormat(options.format);
	const quality = typeof options.quality === 'number' ? Math.min(100, Math.max(0, options.quality)) / 100 : 0.92;

	return new Promise((resolve, reject) => {
		canvas.toBlob((blob) => {
			if (!blob) return reject(new Error('Failed to export image'));
			const url = URL.createObjectURL(blob);
			resolve({ blob, url, width, height });
		}, mime, mime.includes('jpeg') || mime.includes('webp') ? quality : undefined);
	});
} 