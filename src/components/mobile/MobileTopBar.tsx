import React from 'react';
import { Menu, BookOpen, Printer, ChevronDown, CheckCircle2, ShieldCheck, GraduationCap } from 'lucide-react';
import { GradeConfig, GradeKey } from '../../types/curriculum';
import { GRADES_CONFIG } from '../../data/gradesRegistry';

interface MobileTopBarProps {
  onOpenDrawer: () => void;
  activeGrade: GradeConfig;
  onOpenPrepModal: () => void;
  onSelectGradeKey: (key: GradeKey) => void;
}

export const MobileTopBar: React.FC<MobileTopBarProps> = ({
  onOpenDrawer,
  activeGrade,
  onOpenPrepModal,
  onSelectGradeKey
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-emerald-800/40 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3">
        {/* Right side: Drawer Toggle Button (RTL Menu) & App Title */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenDrawer}
            className="w-9 h-9 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 active:scale-95 text-white flex items-center justify-center transition-all shadow-xs border border-emerald-600/50"
            aria-label="فتح القائمة الجانبية"
          >
            <Menu className="w-5 h-5 text-amber-300" />
          </button>

          {/* App title and isolated grade badge */}
          <div className="flex flex-col text-right">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-tight text-white">خبير المناهج</span>
              <span className="text-amber-400 font-bold text-xs hidden xs:inline">| لغتي العربية</span>
            </div>
            {/* Mobile Grade trigger pill */}
            <button
              onClick={onOpenDrawer}
              className="flex md:hidden items-center gap-1 text-[11px] font-bold text-emerald-300 hover:text-emerald-200 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="truncate max-w-[130px]">{activeGrade.title}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Center: Integrated Sleek Desktop Grade Switcher (Low Profile) */}
        <div className="hidden md:flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700/80">
          <div className="flex items-center gap-1 text-[11px] text-slate-400 px-2 font-bold shrink-0">
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            <span>المقرر:</span>
          </div>

          <div className="flex items-center gap-1 flex-wrap">
            {GRADES_CONFIG.map((g) => {
              const isCurrent = g.key === activeGrade.key;
              const isAvailable = g.status === 'active';
              return (
                <button
                  key={g.key}
                  onClick={() => onSelectGradeKey(g.key)}
                  className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all flex items-center gap-1 ${
                    isCurrent
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                  }`}
                  title={`${g.title} (${g.stageName})`}
                >
                  {g.key === 'grade7_p1' && 'سابع (ج1)'}
                  {g.key === 'grade7_p2' && 'سابع (ج2)'}
                  {g.key === 'grade8_p1' && 'ثامن (ج1)'}
                  {g.key === 'grade8_p2' && 'ثامن (ج2)'}
                  {g.key === 'grade9_p1' && 'تاسع (ج1)'}
                  {g.key === 'grade9_p2' && 'تاسع (ج2) 🎓'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Left side: Quick Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Isolation status indicator */}
          <div className="hidden lg:flex items-center gap-1 bg-emerald-950/70 border border-emerald-700/60 px-2 py-1 rounded-lg text-[10px] text-emerald-300 font-medium">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>بيانات معزولة 100%</span>
          </div>

          <button
            onClick={onOpenPrepModal}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
            title="الانتقال المباشر لكراس التحضير اليومي"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>كراس التحضير</span>
          </button>

          <button
            onClick={() => window.print()}
            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center border border-white/10 transition-colors"
            title="طباعة الصفحة الحالية"
          >
            <Printer className="w-4 h-4 text-emerald-300" />
          </button>
        </div>
      </div>
    </header>
  );
};
