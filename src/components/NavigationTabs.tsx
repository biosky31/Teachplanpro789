import React from 'react';
import { 
  FileText, 
  Layers, 
  CalendarDays, 
  Calendar,
  BookMarked, 
  HelpCircle, 
  Lightbulb
} from 'lucide-react';

export type MainTabType = 
  | 'catalog' 
  | 'deep_extraction' 
  | 'study_plan' 
  | 'daily_prep' 
  | 'linguistic_treasury' 
  | 'exam_bank'
  | 'official_calendar_and_goals';

interface NavigationTabsProps {
  activeTab: MainTabType;
  onTabChange: (tab: MainTabType) => void;
  unitsCount: number;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({ 
  activeTab, 
  onTabChange,
  unitsCount
}) => {
  const tabs = [
    {
      id: 'catalog' as MainTabType,
      label: 'فهرسة الكتاب',
      icon: Layers,
      badge: `${unitsCount} وحدات`
    },
    {
      id: 'deep_extraction' as MainTabType,
      label: 'الاستخراج المعمق',
      icon: FileText,
      badge: '12 وحدة'
    },
    {
      id: 'study_plan' as MainTabType,
      label: 'الخطة الفصلية',
      icon: CalendarDays,
      badge: '15 أسبوعاً'
    },
    {
      id: 'daily_prep' as MainTabType,
      label: 'التحضير اليومي',
      icon: BookMarked,
      badge: 'قراءة وطباعة'
    },
    {
      id: 'linguistic_treasury' as MainTabType,
      label: 'المعجم والمفاهيم',
      icon: Lightbulb,
      badge: 'معجم شامل'
    },
    {
      id: 'exam_bank' as MainTabType,
      label: 'بنك الأسئلة',
      icon: HelpCircle,
      badge: 'مؤتمت'
    },
    {
      id: 'official_calendar_and_goals' as MainTabType,
      label: 'التقويم الوزاري والأهداف',
      icon: Calendar,
      badge: 'قرار رسمي'
    }
  ];

  return (
    <nav className="bg-white border-b border-slate-200/90 shadow-2xs no-print">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex space-x-reverse space-x-1.5 overflow-x-auto py-1.5 scrollbar-none items-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 shrink-0 ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-emerald-800 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive
                      ? 'bg-amber-400 text-slate-900'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
