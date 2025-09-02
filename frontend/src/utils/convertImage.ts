export type OutputFormat = 'jpg' | 'jpeg' | 'png' | 'webp' | 'bmp' | 'gif';

export interface ConvertOptions {
	format: OutputFormat;
	quality?: number; // 0-100
	resize?: 'original' | 'small' | 'medium' | 'large' | { width: number; height: number };
	maintainAspectRatio?: boolean;
	compressionLevel?: 'none' | 'low' | 'medium' | 'high';
	autoRotate?: boolean;
	clearMetadata?: boolean;
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
	
	// 应用自动旋转（基于EXIF数据）
	if (options.autoRotate) {
		// 这里可以添加EXIF旋转处理逻辑
		// 由于浏览器限制，我们暂时跳过复杂的EXIF处理
		console.log('Auto-rotate enabled (EXIF processing would be implemented here)');
	}
	
	ctx.drawImage(img, 0, 0, width, height);

	const mime = mimeForFormat(options.format);
	let quality = typeof options.quality === 'number' ? Math.min(100, Math.max(0, options.quality)) / 100 : 0.92;
	
	// 根据压缩等级调整质量
	if (options.compressionLevel) {
		switch (options.compressionLevel) {
			case 'none':
				quality = Math.max(quality, 0.95);
				break;
			case 'low':
				quality = Math.max(quality, 0.85);
				break;
			case 'medium':
				quality = Math.max(quality * 0.9, 0.7);
				break;
			case 'high':
				quality = Math.max(quality * 0.8, 0.5);
				break;
		}
	}

	return new Promise((resolve, reject) => {
		canvas.toBlob((blob) => {
			if (!blob) return reject(new Error('Failed to export image'));
			const url = URL.createObjectURL(blob);
			resolve({ blob, url, width, height });
		}, mime, mime.includes('jpeg') || mime.includes('webp') ? quality : undefined);
	});
} 