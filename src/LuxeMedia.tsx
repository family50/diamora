import React, { useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface LuxeMediaProps {
  variant?: 'image' | 'text' | 'title' | 'circle' | 'video';
  width?: string | number;
  height?: string | number;
  count?: number;
  className?: string;
  children?: React.ReactNode;
}

const LuxeMedia: React.FC<LuxeMediaProps> = ({ 
  variant = 'image', 
  width, 
  height, 
  count = 1,
  className,
  children
}) => {
  const [loading, setLoading] = useState(true);

  const getDimensions = () => {
    switch(variant) {
      case 'title': return { h: 32, w: width || '60%' };
      case 'text': return { h: 16, w: width || '100%' };
      case 'circle': return { h: height || 60, w: width || 60 };
      case 'video': return { h: height || '100%', w: width || '100%' };
      default: return { h: height || '100%', w: width || '100%' };
    }
  };

  const dim = getDimensions();

  // دالة لإيقاف التحميل يدوياً
  const handleLoad = () => setLoading(false);

  return (
    <SkeletonTheme baseColor="#EBE7F0" highlightColor="#f0e3f7">
      <div 
        className={`luxe-media-container ${className}`} 
        style={{ 
          position: 'relative', 
          width: '100%', 
          height: variant === 'video' ? '100%' : 'auto',
          display: 'block'
        }}
      >
        {/* السكيلتون */}
        {loading && (
          <div style={{ 
            position: variant === 'video' || variant === 'image' ? 'absolute' : 'relative',
            top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 
          }}>
            <Skeleton 
              width={dim.w} 
              height={dim.h} 
              circle={variant === 'circle'} 
              count={count}
              duration={1.8}
              style={{ borderRadius: variant === 'circle' ? '50%' : '12px' }}
            />
          </div>
        )}

        {/* المحتوى الحقيقي */}
        {children && (
          <div 
            className="luxe-real-content"
            style={{ 
              opacity: loading ? 0 : 1, 
              transition: 'opacity 0.5s ease-in-out',
              width: '100%',
              height: '100%'
            }}
            // استخدام المستمعات العادية لضمان التغطية
            onLoad={handleLoad} 
            onLoadedData={handleLoad}
          >
            {/* استنساخ العنصر وإضافة onLoad له يدوياً لزيادة التأكيد */}
         {React.Children.map(children, (child) => {
  if (React.isValidElement(child)) {
    // هنا بنقول لـ TS إننا بنتعامل مع عنصر HTML يقبل الـ Props اللي محتاجينها
    return React.cloneElement(child as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
      onLoad: handleLoad,
      onLoadedData: handleLoad,
    });
  }
  return child;
})}
          </div>
        )}
      </div>
    </SkeletonTheme>
  );
};

export default LuxeMedia;