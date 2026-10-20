import React from 'react';
import { 
  Layers, 
  FileText, 
  CalendarDays, 
  BookMarked, 
  Menu, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { MainTabType } from '../NavigationTabs';

interface MobileBottomNavProps {
  activeTab: MainTabType;
  onSelectTab: (tab: MainTabType) => void;
  onOpenDrawer: () => void;
  onOpenPrepModal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenDrawer,
  onOpenPrepModal
}) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg no-print">
      <div className="max-w-md mx-auto px-2 py-1.5 flex items-center justify-around">
        {/* Tab 1: Catalog */}
        <button
          onClick={() => onSelectTab('catalog')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-150 ${
            activeTab === 'catalog'
              ? 'text-emerald-700 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className={`w-5 h-5 ${activeTab === 'catalog' ? 'text-emerald-700 scale-110' : 'text-slate-400'}`} />
          <span className="text-[10px] mt-0.5">الفهرس</span>
        </button>

        {/* Tab 2: Deep Extraction */}
        <button
          onClick={() => onSelectTab('deep_extraction')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-150 ${
            activeTab === 'deep_extraction'
              ? 'text-teal-700 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className={`w-5 h-5 ${activeTab === 'deep_extraction' ? 'text-teal-700 scale-110' : 'text-slate-400'}`} />
          <span className="text-[10px] mt-0.5">الاستخراج</span>
        </button>

        {/* Floating Center Button: Daily Prep Modal */}
        <button
          onClick={onOpenPrepModal}
          className="flex flex-col items-center justify-center -mt-5 relative group"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-900 shadow-lg shadow-amber-500/30 flex items-center justify-center active:scale-95 transition-transform border-2 border-white">
            <BookMarked className="w-6 h-6 text-slate-900" />
          </div>
          <span className="text-[10px] font-black text-slate-800 mt-1">التحضير</span>
        </button>

        {/* Tab 3: Study Plan */}
        <button
          onClick={() => onSelectTab('study_plan')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-150 ${
            activeTab === 'study_plan'
              ? 'text-blue-700 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <CalendarDays className={`w-5 h-5 ${activeTab === 'study_plan' ? 'text-blue-700 scale-110' : 'text-slate-400'}`} />
          <span className="text-[10px] mt-0.5">الخطة</span>
        </button>

        {/* Tab 4: Drawer Menu (المزيد) */}
        <button
          onClick={onOpenDrawer}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-slate-500 hover:text-emerald-700 transition-colors"
        >
          <Menu className="w-5 h-5 text-slate-400" />
          <span className="text-[10px] mt-0.5">القائمة</span>
        </button>
      </div>
    </div>
  );
};
