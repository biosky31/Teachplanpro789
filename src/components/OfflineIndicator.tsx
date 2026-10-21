import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-18 md:bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-slate-900/95 border border-amber-500/60 px-3.5 py-2 text-xs font-bold text-amber-300 shadow-xl backdrop-blur-xs animate-fadeIn">
      <WifiOff className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
      <span>وضع عدم الاتصال — كافة الخطط والتحضير وبنك الأسئلة محفوظة ومتاحة محلياً 100%</span>
    </div>
  );
};
