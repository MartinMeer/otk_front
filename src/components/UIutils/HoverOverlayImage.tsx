import React from 'react';

type Props = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;           // wrapper classes
  thumbHClass?: string;         // NEW: thumbnail height classes, e.g. "h-40 md:h-48"
  overlayMaxHClass?: string;    // NEW: overlay max height, e.g. "max-h-[70vh]"
};

export function DesktopHoverOverlayImage({
  src,
  alt,
  caption,
  className,
  thumbHClass,
  overlayMaxHClass,
}: Props) {
  const thumbH = thumbHClass ?? 'h-48';
  const overlayMaxH = overlayMaxHClass ?? 'max-h-80';

  return (
    <div className={`relative ${className ?? ''}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full ${thumbH} object-contain rounded bg-gray-50 transition-transform duration-200 group-hover:scale-105`}
      />
      <div className="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="absolute inset-0 bg-black/50 rounded"></div>
        <img
          src={src}
          alt={`${alt} - полный вид`}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${overlayMaxH} w-auto h-auto object-contain rounded-lg shadow-2xl`}
        />
        {caption ? (
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white text-center px-2">
            {caption}
          </p>
        ) : null}
      </div>
    </div>
  );
}