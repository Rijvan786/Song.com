import React from 'react';
import '../style/Skeleton.scss';

export function Skeleton({ width, height, borderRadius, className = '', variant = 'rectangular' }) {
  const style = {
    width: width || '100%',
    height: height || '20px',
    borderRadius: borderRadius || (variant === 'circular' ? '50%' : '12px'),
  };

  return <div className={`skeleton-item skeleton-${variant} ${className}`} style={style} />;
}

export function FormSkeleton() {
  return (
    <div className="skeleton-form-container">
      <div className="skeleton-header">
        <Skeleton variant="circular" width="56px" height="56px" className="skeleton-center" />
        <Skeleton width="180px" height="28px" className="skeleton-center mt-3" />
        <Skeleton width="240px" height="16px" className="skeleton-center mt-2" />
      </div>
      <div className="skeleton-body mt-4">
        <Skeleton width="100px" height="14px" className="mb-2" />
        <Skeleton height="48px" className="mb-3" />
        <Skeleton width="100px" height="14px" className="mb-2" />
        <Skeleton height="48px" className="mb-3" />
        <Skeleton height="48px" className="mt-4 skeleton-btn" />
        <div className="skeleton-divider mt-3 mb-3">
          <Skeleton height="1px" width="100%" />
        </div>
        <Skeleton height="48px" className="skeleton-btn-alt" />
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="skeleton-page-wrapper">
      <div className="skeleton-hero">
        <Skeleton width="280px" height="36px" className="skeleton-center mb-3" />
        <Skeleton width="380px" height="18px" className="skeleton-center mb-4" />
      </div>
      <div className="skeleton-grid">
        {[1, 2, 3].map((item) => (
          <div key={item} className="skeleton-card">
            <Skeleton variant="circular" width="48px" height="48px" className="mb-3" />
            <Skeleton width="70%" height="20px" className="mb-2" />
            <Skeleton width="90%" height="14px" />
          </div>
        ))}
      </div>
      <div className="skeleton-player-box mt-5">
        <Skeleton height="90px" borderRadius="16px" />
      </div>
    </div>
  );
}

export function FaceExpressionSkeleton() {
  return (
    <div className="skeleton-expression-container">
      <Skeleton width="220px" height="32px" className="skeleton-center mb-4" />
      <div className="skeleton-video-box mb-4">
        <Skeleton width="100%" height="310px" borderRadius="16px" />
      </div>
      <Skeleton width="180px" height="24px" className="skeleton-center mb-3" />
      <Skeleton width="240px" height="48px" borderRadius="12px" className="skeleton-center" />
    </div>
  );
}

export default Skeleton;
