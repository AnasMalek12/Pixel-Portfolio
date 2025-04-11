
import React from 'react';
import { Minus, Maximize2, X } from 'lucide-react';

interface PixelWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const PixelWindow: React.FC<PixelWindowProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`pixel-window ${className}`}>
      <div className="pixel-window-title">
        <span className="font-pixel text-xs">{title}</span>
        <div className="flex gap-1">
          <button className="w-4 h-4 bg-gray-400 flex items-center justify-center">
            <Minus className="text-pixel-black w-3 h-3" />
          </button>
          <button className="w-4 h-4 bg-gray-400 flex items-center justify-center">
            <Maximize2 className="text-pixel-black w-3 h-3" />
          </button>
          <button className="w-4 h-4 bg-gray-400 flex items-center justify-center">
            <X className="text-pixel-black w-3 h-3" />
          </button>
        </div>
      </div>
      <div className="pixel-window-content">
        {children}
      </div>
    </div>
  );
};

export default PixelWindow;
