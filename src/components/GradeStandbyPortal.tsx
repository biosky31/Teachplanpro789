import React from 'react';
import { GradeConfig, GradeKey } from '../types/curriculum';
import { 
  GraduationCap, 
  FileText, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle,
  HelpCircle,
  Clock,
  Layers,
  Award
} from 'lucide-react';

interface GradeStandbyPortalProps {
  activeGradeConfig: GradeConfig;
  onSelectGradeKey: (key: GradeKey) => void;
}

export const GradeStandbyPortal: React.FC<GradeStandbyPortalProps> = ({
  activeGradeConfig,
  onSelectGradeKey,
}) => {
  const isPart1 = activeGradeConfig.key === 'grade9_p1';
  const isPart2 = activeGradeConfig.key === 'grade9_p2';

  return (
    <div className="max-w-4xl mx-auto space-y-6 my-4 animate-fadeIn">
      {/* Hero Banner for Grade 9 */}
      <div className="bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-amber-500/30 shadow-xl relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>مرحلة الشهادة الأساسية العامة — وزارة التربية والتعليم</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {activeGradeConfig.title}
            </h2>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              أهلاً بكم في بيئة التحليل المتخصصة للصف التاسع الأساسي. هذه المرحلة تخضع لنظام الاختبارات الوزارية العامة المؤتمتة، ولذلك يتم تجهيزها بأعلى معايير الدقة والشمول.
            </p>
          </div>

          {/* Quick toggle between Part 1 and Part 2 */}
          <div className="bg-slate-800/80 p-1.5 rounded-2xl border border-amber-500/40 flex flex-col gap-1.5 w-full sm:w-auto shrink-0">
            <span className="text-[11px] text-amber-300 font-bold px-2 text-center">اختر الجزء المطلوب:</span>
            <div className="flex gap-1.5">
              <button
                onClick={() => onSelectGradeKey('grade9_p1')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  isPart1
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <span>الجزء الأول</span>
                {isPart1 && <CheckCircle2 className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => onSelectGradeKey('grade9_p2')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  isPart2
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <span>الجزء الثاني</span>
                {isPart2 && <CheckCircle2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Readiness & Direct Action Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">
              جاهزية تامة لتحليل واستخراج مقرر {activeGradeConfig.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              المنصة مجهزة بجميع المحركات المعجمية والنحوية والإملائية المعتمدة للمناهج اليمنية، وفي انتظار تزويدنا بالكتاب (ملف PDF أو نصوص الوحدات) لمباشرة الفهرسة التفصيلية والاستخراج المعمق فوراً.
            </p>
          </div>
        </div>

        {/* Action Steps Ready */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h4 className="font-bold text-sm text-slate-900">فهرسة وحصر الصفحات</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              حصر جميع وحدات الكتاب، أرقام الصفحات، نصوص القراءة، القواعد النحوية والصرفية، وموضوعات الإملاء.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h4 className="font-bold text-sm text-slate-900">استخراج المحتوى الكامل</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              استخراج النصوص كاملة، الجداول المعجمية (المعنى، المرادف، الضد)، شروح القواعد، وجداول المقارنة النحوية.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h4 className="font-bold text-sm text-slate-900">بنك الاختبارات المؤتمتة</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              أسئلة موضوعية (اختيار من متعدد وصواب وخطأ) على النمط الوزاري المعتمد لشهادة التعليم الأساسي باليمن.
            </p>
          </div>
        </div>

        {/* Information Notice */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 space-y-1">
            <span className="font-bold block">ملاحظة للمعلم والباحث:</span>
            <p className="leading-relaxed">
              يرجى إرفاق ملف كتاب الصف التاسع (سواء الجزء الأول أو الجزء الثاني بصيغة PDF أو تحديد الدروس المطلوبة)، وسأقوم فوراً بفهرسة جميع صفحاته وعرض خريطة المحتوى وخطة الاستخراج الكاملة وفق الضوابط الصارمة المحددة.
            </p>
          </div>
        </div>

        {/* Navigation to Completed Grades */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>المقررات المكتملة والمفعلة حالياً في المنصة:</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => onSelectGradeKey('grade8_p2')}
              className="px-3 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-xl text-xs font-bold border border-purple-200 transition-colors"
            >
              الصف الثامن (ج2) ⭐
            </button>
            <button
              onClick={() => onSelectGradeKey('grade8_p1')}
              className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl text-xs font-bold border border-indigo-200 transition-colors"
            >
              الصف الثامن (ج1)
            </button>
            <button
              onClick={() => onSelectGradeKey('grade7_p2')}
              className="px-3 py-1.5 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-xl text-xs font-bold border border-teal-200 transition-colors"
            >
              الصف السابع (ج2)
            </button>
            <button
              onClick={() => onSelectGradeKey('grade7_p1')}
              className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-bold border border-emerald-200 transition-colors"
            >
              الصف السابع (ج1)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
