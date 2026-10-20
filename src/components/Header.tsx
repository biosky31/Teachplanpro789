import React from 'react';
import { BookOpen, Award, Calendar, Sparkles, Printer } from 'lucide-react';
import { YEMENI_GRADE_7_PART_1_INDEX } from '../data/bookIndex';

interface HeaderProps {
  onPrint?: () => void;
  activeGrade: string;
  onGradeChange: (grade: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onPrint, activeGrade, onGradeChange }) => {
  return (
    <header className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-xl border-b border-emerald-700/40">
      {/* Top Ministry Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-2 border-b border-white/10 flex flex-wrap items-center justify-between text-xs text-emerald-200">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>الجمهورية اليمنية - وزارة التربية والتعليم - قطاع المناهج والتوجيه - الإدارة العامة للمناهج</span>
        </div>
        <div className="flex items-center gap-4 mt-1 sm:mt-0">
          <span>إقرار اللجنة العليا: 1443/11/9هـ (2022/6/8م)</span>
          <span className="bg-emerald-800/80 px-2 py-0.5 rounded text-[11px] font-semibold text-emerald-100 border border-emerald-600/50">
            طبعة تجريبية 1444هـ / 2023م
          </span>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-slate-900/90 rounded-[14px] flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                  <span>منصة خبير المناهج اليمنية</span>
                  <span className="text-amber-400 text-lg sm:text-xl font-normal">| لغتي العربية</span>
                </h1>
                <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-1 rounded-full font-bold border border-amber-500/30 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  مساعد المعلم المتخصص
                </span>
              </div>
              <p className="text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
                المرجع التحليلي الرقمي الشامل: فهرسة واستخراج نصوص وقواعد الكتاب المدرسي، إعداد الخطة الفصلية (15 أسبوعاً / 6 حصص)، وتوليد التحضير اليومي النموذجي لمعلمي مرحلة التعليم الأساسي.
              </p>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex flex-wrap items-center gap-2.5 self-end md:self-center">
            {/* Grade Switcher */}
            <div className="bg-slate-800/80 p-1 rounded-xl border border-white/10 flex items-center gap-1 text-xs">
              <button
                onClick={() => onGradeChange('7-part1')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeGrade === '7-part1'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                الصف السابع (ج1)
              </button>
              <button
                onClick={() => onGradeChange('7-part2')}
                className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-300 cursor-not-allowed opacity-60 flex items-center gap-1"
                title="سيتم إلحاقه ضمن خطة التطبيق الشاملة"
              >
                <span>السابع (ج2)</span>
                <span className="text-[10px] bg-slate-700 px-1 rounded">قريباً</span>
              </button>
              <button
                onClick={() => onGradeChange('8')}
                className="px-2.5 py-1.5 rounded-lg text-slate-500 cursor-not-allowed opacity-60"
                title="ضمن التوسعة القادمة للصفوف 7-9"
              >
                الصف 8
              </button>
              <button
                onClick={() => onGradeChange('9')}
                className="px-2.5 py-1.5 rounded-lg text-slate-500 cursor-not-allowed opacity-60"
                title="ضمن التوسعة القادمة للصفوف 7-9"
              >
                الصف 9
              </button>
            </div>

            {/* Print Button */}
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-white/10 transition-colors shadow-sm"
              title="طباعة محتوى المعلم الحالي"
            >
              <Printer className="w-4 h-4 text-emerald-300" />
              <span>طباعة</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
