'use client';

import { useEffect } from 'react';

/**
 * 在客户端注册 Service Worker，满足 Android Chrome PWA 安装条件（需 HTTPS + manifest + SW）。
 * 仅在生产环境且浏览器支持时注册。
 */
export default function PwaRegister() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
    navigator.serviceWorker.getRegistrations().then(regs => {
      regs.forEach(reg => reg.unregister().catch(e => console.warn(e)));
      if (window.caches) {
        caches.keys().then(names => names.forEach(n => caches.delete(n)));
      }
    });
  }, []);

  return null;
}
