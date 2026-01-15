import React, { useState, useRef } from 'react';
import { ExpandableImage } from '../ExpandableImage/ExpandableImage';
import './StackedGallery.css';

interface GalleryImage {
    id: number | string;
    src: string;
    alt: string;
    interactiveSrc?: string; // Optional interactive content
    deferInteraction?: boolean; // Optional deferred interaction
    thumbnailSrc?: string; // Optional optimized thumbnail
    srcSet?: string;
    sizes?: string;
    className?: string; // Optional custom class for specific styling (e.g. iframe width)
    // New optional props
    customTrigger?: {
        label: string;
        icon?: React.ReactNode;
        className?: string;
    };
    badgeText?: string;
    enableTheaterMode?: boolean;
}

interface StackedGalleryProps {
    images: GalleryImage[];
    defaultImage?: string;
    priority?: boolean; // New prop to indicate critical path
}

export const StackedGallery: React.FC<StackedGalleryProps> = ({ images, defaultImage, priority = false }) => {
    // Determine initial active image object
    const initialImage = defaultImage
        ? images.find(img => img.src === defaultImage) || images[0]
        : images[0];

    const [activeImage, setActiveImage] = useState<GalleryImage>(initialImage);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={imageContainerRef} className="section-image gallery-container">
            {/* Main Active Image / Interactive Component */}
            <ExpandableImage
                key={activeImage.id}
                src={activeImage.src}
                alt={activeImage.alt}
                interactiveSrc={activeImage.interactiveSrc}
                deferInteraction={activeImage.deferInteraction}
                containerClassName="gallery-main-image-wrapper"
                className={`gallery-main-image ${activeImage.className || ''}`}
                isNested={true}
                // @ts-expect-error - React 18 doesn't support fetchpriority type yet
                fetchpriority={priority ? 'high' : 'auto'}
                loading={priority ? 'eager' : 'lazy'}
                srcSet={activeImage.srcSet}
                sizes={activeImage.sizes}
                customTrigger={activeImage.customTrigger}
                badgeText={activeImage.badgeText}
                enableTheaterMode={activeImage.enableTheaterMode}
            />

            {/* Stacked Cards Widget - Only show if more than 1 image */}
            {images.length > 1 && (
                <div className="stacked-gallery-widget">
                    {images.map((image, index) => (
                        <div
                            key={image.id}
                            className={`gallery-thumbnail ${activeImage.id === image.id ? 'active' : ''}`}
                            style={{
                                zIndex: images.length - index,
                                // Cycle through -5, 0, 5 degrees
                                transform: `rotate(${[-5, 0, 5][index % 3]}deg)`,
                            }}
                            onClick={() => setActiveImage(image)}
                        >
                            <img src={image.thumbnailSrc || image.src} alt={image.alt} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
