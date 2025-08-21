import React from 'react';

export interface LogoProps {
	className?: string;
	size?: number; // 像素尺寸，默认32
	rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
	backgroundColorClass?: string; // Tailwind 背景色类，默认 bg-blue-600
	textColorClass?: string; // Tailwind 文本色类，默认 text-white
	text?: string; // 居中文字（如 "J"），与imgSrc二选一
	imgSrc?: string; // 图片路径（如 /src/assets/logo.svg）
	imgAlt?: string;
}

const roundedClassMap: Record<NonNullable<LogoProps['rounded']>, string> = {
	none: '',
	sm: 'rounded-sm',
	md: 'rounded-md',
	lg: 'rounded-lg',
	full: 'rounded-full',
};

export const Logo: React.FC<LogoProps> = ({
	className,
	size = 32,
	rounded = 'md',
	backgroundColorClass = 'bg-blue-600',
	textColorClass = 'text-white',
	text = 'J',
	imgSrc,
	imgAlt = 'logo',
}) => {
	const style: React.CSSProperties = { width: size, height: size };
	const radiusClass = roundedClassMap[rounded];
	return (
		<div
			className={`${backgroundColorClass} ${radiusClass} flex items-center justify-center ${className || ''}`.trim()}
			style={style}
		>
			{imgSrc ? (
				<img src={imgSrc} alt={imgAlt} style={{ width: size * 0.75, height: size * 0.75 }} />
			) : (
				<span className={`${textColorClass} font-bold`} style={{ fontSize: Math.round(size * 0.45) }}>{text}</span>
			)}
		</div>
	);
}; 