import React from 'react';
import { 
  X, 
  Layers, 
  FileText, 
  CalendarDays, 
  BookMarked, 
  Lightbulb, 
  HelpCircle, 
  Calendar, 
  ShieldCheck, 
  BookOpen, 
  CheckCircle2, 
  Printer, 
  Lock, 
  Sparkles,
  ChevronLeft,
  Mail,
  Award,
  School
} from 'lucide-react';
import { MainTabType } from '../NavigationTabs';
import { GradeConfig, GradeKey } from '../../types/curriculum';
import { GRADES_CONFIG } from '../../data/gradesRegistry';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: MainTabType;
  onSelectTab: (tab: MainTabType) => void;
  activeGradeKey: GradeKey;
  onSelectGradeKey: (key: GradeKey) => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  activeGradeKey,
  onSelectGradeKey
}) => {
  if (!isOpen) return null;

  const navItems = [
    {
      id: 'catalog' as MainTabType,
      label: 'فهرسة الكتاب وخريطة المحتوى',
      badge: '160 صفحة',
      icon: Layers,
      color: 'text-emerald-500'
    },
    {
      id: 'deep_extraction' as MainTabType,
      label: 'الاستخراج والتحليل المعمق (الوحدات 1-12)',
      badge: 'كامل النصوص',
      icon: FileText,
      color: 'text-teal-500'
    },
    {
      id: 'study_plan' as MainTabType,
      label: 'الخطة الفصلية وتوزيع الحصص',
      badge: '15 أسبوعاً',
      icon: CalendarDays,
      color: 'text-blue-500'
    },
    {
      id: 'official_calendar_and_goals' as MainTabType,
      label: 'التقويم الوزاري وبنك الأهداف (1447/1448هـ)',
      badge: 'قرار رسمي',
      icon: Calendar,
      color: 'text-amber-500'
    },
    {
      id: 'daily_prep' as MainTabType,
      label: 'مساعد التحضير اليومي للمعلم',
      badge: 'كراس التحضير',
      icon: BookMarked,
      color: 'text-purple-500'
    },
    {
      id: 'linguistic_treasury' as MainTabType,
      label: 'الثروة المفاهيمية والمعجم الشامل',
      badge: 'معجم + شروح',
      icon: Lightbulb,
      color: 'text-yellow-500'
    },
    {
      id: 'exam_bank' as MainTabType,
      label: 'بنك الأسئلة والتقويم الامتحاني',
      badge: 'مصنف وزارياً',
      icon: HelpCircle,
      color: 'text-rose-500'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden no-print animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-in Drawer Container (from right for RTL) */}
      <div className="fixed inset-y-0 right-0 max-w-xs sm:max-w-sm w-full bg-slate-900 text-white shadow-2xl flex flex-col border-l border-emerald-800/40 transform transition-transform duration-300 ease-in-out">
        {/* Drawer Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-950 to-slate-900 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">منصة خبير المناهج</h3>
              <span className="text-[10px] text-emerald-300 block">وزارة التربية والتعليم والبحث العلمي</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin">
          {/* Section 1: Strictly Isolated Grade Switcher */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 px-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>الصفوف والمراحل الدراسية</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                عزل تام للبيانات
              </span>
            </div>

            <div className="bg-slate-800/60 p-2 rounded-2xl border border-slate-700/60 space-y-1.5">
              {GRADES_CONFIG.map((grade) => {
                const isSelected = activeGradeKey === grade.key;
                const isAvailable = grade.status === 'active';

                return (
                  <button
                    key={grade.key}
                    onClick={() => {
                      onSelectGradeKey(grade.key);
                      onClose();
                    }}
                    className={`w-full text-right p-2.5 rounded-xl transition-all flex items-center justify-between text-xs ${
                      isSelected
                        ? 'bg-emerald-700 text-white font-bold shadow-md shadow-emerald-900/30 ring-2 ring-emerald-400/50'
                        : isAvailable
                        ? 'bg-slate-800 text-slate-200 hover:bg-slate-700/80 font-medium'
                        : 'bg-slate-800/80 text-amber-200 hover:bg-slate-700/80 border border-amber-500/30'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                        isSelected ? 'bg-white text-emerald-900' : isAvailable ? 'bg-slate-700 text-emerald-400' : 'bg-slate-800 text-slate-600'
                      }`}>
                        {grade.gradeNumber}
                      </span>
                      <div>
                        <span className="block font-bold">{grade.title}</span>
                        <span className="text-[10px] opacity-75">{grade.stageName}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {isAvailable ? (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isSelected ? 'bg-amber-400 text-slate-900' : 'bg-emerald-900/60 text-emerald-300'
                        }`}>
                          متاح ومكتمل
                        </span>
                      ) : (
                        <span className="text-[9px] bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5" />
                          <span>في الانتظار</span>
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="text-[10px] text-slate-400 px-1 leading-normal">
              🔒 <strong>ضمان العزل:</strong> قاعدة بيانات ومحتويات كل صف مفصولة برمجياً ومحلياً ولا يحدث أي تداخل عند رفع الأجزاء اللاحقة.
            </p>
          </div>

          {/* Section 2: Main Application Navigation */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-400 px-1 block mb-1">أقسام ومحتويات المنصة:</span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    onClose();
                  }}
                  className={`w-full text-right p-3 rounded-2xl transition-all flex items-center justify-between text-xs ${
                    isActive
                      ? 'bg-gradient-to-l from-emerald-800 to-teal-800 text-white font-bold shadow-md shadow-emerald-900/30 ring-1 ring-emerald-500'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : item.color}`} />
                    <span>{item.label}</span>
                  </div>

                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    isActive ? 'bg-amber-400 text-slate-900' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Section 3: Teacher & Intellectual Preparation Rights Card */}
          <div className="bg-slate-800/90 rounded-2xl p-3 border border-amber-500/30 text-xs space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-amber-300 font-bold text-[11px]">
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>حقوق الإعداد والتطوير</span>
              </span>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                المعدّ المعتمد
              </span>
            </div>

            <div className="space-y-1 pt-1">
              <div className="text-white font-extrabold text-xs flex items-center justify-between">
                <span>أ. بايسكاي (BIOSKY30)</span>
                <span className="text-[10px] text-slate-400 font-normal">معلم لغة عربية</span>
              </div>
              <div className="text-[11px] text-emerald-300 flex items-center gap-1 font-semibold">
                <School className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>مدرسة إشراق اليمن</span>
              </div>
              <div className="text-[10px] text-slate-300 flex items-center gap-1 font-mono pt-0.5">
                <Mail className="w-3 h-3 text-amber-400 shrink-0" />
                <span>BIOSKY30@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>طبعة 1444هـ معتمدة</span>
          </div>

          <button
            onClick={() => {
              onClose();
              window.print();
            }}
            className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>طباعة</span>
          </button>
        </div>
      </div>
    </div>
  );
};
