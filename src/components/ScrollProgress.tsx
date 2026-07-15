import React, { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const percent = docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 0;
      setProgress(percent);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div aria-hidden className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent">
      <div
        className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 shadow-sm"
        style={{ width: `${progress}%`, transition: 'width 150ms linear' }}
      />
    </div>
  );
}

export default ScrollProgress;
