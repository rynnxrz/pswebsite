
import React, { useState, useRef } from 'react';
import { Expand } from 'lucide-react';
import './StackedGallery.css';

interface GalleryImage {
    id: number | string;
    src: string;
    alt: string;
}

interface StackedGalleryProps {
    images: GalleryImage[];
    defaultImage?: string;
}

export const StackedGallery: React.FC<StackedGalleryProps> = ({ images, defaultImage }) => {
    const [activeImage, setActiveImage] = useState(defaultImage || images[0]?.src);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    const toggleImageFullscreen = () => {
        const element = imageContainerRef.current;
        if (!element) return;
        if (!document.fullscreenElement) {
            element.requestFullscreen().catch((err) => console.error(err));
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <div ref={imageContainerRef} className="section-image gallery-container">
            {/* Main Active Image */}
            <img
                src={activeImage}
                alt="Active Gallery View"
                className="gallery-main-image"
                key={activeImage}
            />

            {/* Expand Button (shows on hover) */}
            <button
                className="expand-image-button"
                onClick={toggleImageFullscreen}
                title="Expand image"
            >
                <Expand size={16} />
            </button>

            {/* Stacked Cards Widget */}
            <div className="stacked-gallery-widget">
                {images.map((image, index) => (
                    <div
                        key={image.id}
                        className="gallery-thumbnail"
                        style={{
                            zIndex: images.length - index,
                            // Initial random rotation logic preserved (e.g. -5, 0, 5)
                            transform: `rotate(${[-5, 0, 5][index % 3]}deg)`,
                        }}
                        onClick={() => setActiveImage(image.src)}
                    >
                        <img src={image.src} alt={image.alt} />
                    </div>
                ))}
            </div>
        </div>
    );
};
