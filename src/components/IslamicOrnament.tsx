import React from 'react';

export const CornerMandala: React.FC<{ position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }> = ({ position }) => {
  const rotationClass = {
    'top-left': 'top-0 left-0 rotate-0',
    'top-right': 'top-0 right-0 rotate-90',
    'bottom-left': 'bottom-0 left-0 -rotate-90',
    'bottom-right': 'bottom-0 right-0 rotate-180',
  }[position];

  return (
    <div className={`absolute ${rotationClass} w-20 h-20 sm:w-36 sm:h-36 md:w-56 md:h-56 pointer-events-none z-10 opacity-45 sm:opacity-80 transition-all duration-500`}>
      <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-emerald-800">
        {/* Outer Curved Framework */}
        <path d="M 0,0 C 120,0 200,80 200,200 L 195,200 C 195,85 115,5 0,5 Z" fill="currentColor" opacity="0.1" />
        <path d="M 0,0 C 110,0 180,70 180,180" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" />
        <path d="M 0,0 C 130,0 200,70 200,200" stroke="currentColor" strokeWidth="1.5" />
        
        {/* Mandala Medallion Petals */}
        <g transform="translate(180, 180) scale(0.85)">
          {/* Main big circle frame */}
          <circle cx="0" cy="0" r="160" stroke="#d4b26f" strokeWidth="3" fill="none" />
          <circle cx="0" cy="0" r="150" stroke="currentColor" strokeWidth="1" fill="none" />
          
          {/* Rotated star ornaments to create Islamic mandala */}
          {[...Array(12)].map((_, i) => (
            <g key={i} transform={`rotate(${i * 15})`}>
              <rect x="-40" y="-40" width="80" height="80" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
              <rect x="-40" y="-40" width="80" height="80" stroke="#d4b26f" strokeWidth="1" fill="none" transform="rotate(45)" opacity="0.7" />
              <path d="M 0,0 L 0,-140" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
              {/* Petal Tips */}
              <path d="M -15,-130 Q 0,-155 15,-130 Z" fill="currentColor" opacity="0.4" />
              <path d="M -8,-140 L 0,-160 L 8,-140 Z" fill="#d4b26f" opacity="0.8" />
            </g>
          ))}

          {/* Innermost layers */}
          <circle cx="0" cy="0" r="80" fill="#255146" stroke="#d4b26f" strokeWidth="2" />
          <circle cx="0" cy="0" r="60" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeDasharray="5,3" />
          <path d="M -30,0 L 30,0 M 0,-30 L 0,30" stroke="#d4b26f" strokeWidth="1.5" />
          
          {/* Decorative radiating dots */}
          {[...Array(8)].map((_, i) => (
            <circle key={i} cx="0" cy="-110" r="4" fill="#d4b26f" transform={`rotate(${i * 45})`} />
          ))}
        </g>
      </svg>
    </div>
  );
};

export const SideBorder: React.FC<{ align: 'left' | 'right' }> = ({ align }) => {
  const borderPosition = align === 'left' ? 'left-0' : 'right-0';
  const flipX = align === 'right' ? 'scale-x-[-1]' : '';

  return (
    <div className={`absolute top-0 bottom-0 ${borderPosition} w-10 md:w-16 hidden sm:block pointer-events-none z-10 ${flipX} transition-all duration-300`}>
      <svg width="100%" height="100%" viewBox="0 0 60 1000" preserveAspectRatio="none" className="text-emerald-900">
        {/* Main Pillar of Islamic Geometric Border */}
        <rect x="5" y="0" width="6" height="100%" fill="currentColor" opacity="0.9" />
        <rect x="17" y="0" width="2" height="100%" fill="#d4b26f" opacity="0.8" />
        <rect x="23" y="0" width="4" height="100%" fill="currentColor" opacity="0.3" />

        {/* Repeating tile pieces inside side borders */}
        {[...Array(25)].map((_, idx) => (
          <g key={idx} transform={`translate(15, ${idx * 40 + 20})`}>
            {/* Rub el Hizb 8 pointed star */}
            <path 
              d="M 12,0 C 15,4 15,4 19,0 C 16,3 16,3 20,4 C 16,5 16,5 19,8 C 15,5 15,5 12,9 C 9,5 9,5 5,9 C 8,5 8,5 4,4 C 8,3 8,3 4,0 C 9,4 9,4 12,0 Z" 
              fill="#d4b26f" 
              stroke="currentColor" 
              strokeWidth="0.5" 
              className="scale-75"
            />
            {/* Elegant Arabesque curve */}
            <path d="M 0,-15 C 10,-10 10,10 0,15" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
          </g>
        ))}
        
        {/* Edge line */}
        <line x1="32" y1="0" x2="32" y2="100%" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

export const SparkleStar: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15 9H22L16.5 14L18.5 21L12 17L5.5 21L7.5 14L2 9H9L12 2Z" fill="#d4b26f" stroke="#1d433b" strokeWidth="1" />
    </svg>
  );
};
