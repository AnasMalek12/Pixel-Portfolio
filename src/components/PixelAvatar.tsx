
import React from 'react';

interface PixelAvatarProps {
  src: string;
  alt: string;
  className?: string;
}

const PixelAvatar: React.FC<PixelAvatarProps> = ({ src, alt, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-full rounded-full overflow-hidden border-4 border-pixel-purple bg-pixel-darkPurple p-1">
        <div className="w-full h-full rounded-full overflow-hidden">
          <img 
            src={src} 
            alt={alt} 
            className="w-full h-full object-cover"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      </div>
    </div>
  );
};

export default PixelAvatar;
