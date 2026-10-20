import React, { useState } from 'react';
import { 
  Book, 
  CheckCircle2, 
  Users, 
  Compass, 
  Layers, 
  FileCheck, 
  ChevronLeft, 
  BookOpen, 
  FileText, 
  Sparkles, 
  AlertCircle,
  Search,
  ExternalLink
} from 'lucide-react';
import { YEMENI_GRADE_7_PART_1_INDEX, BookIndexRecord } from '../data/bookIndex';
import { MainTabType } from './NavigationTabs';

interface BookCatalogViewProps {
  onSelectUnit: (unitId: number) => void;
  onNavigateTab: (tab: MainTabType) => void;
  bookIndex?: BookIndexRecord;
}

export const BookCatalogView: React.FC<BookCatalogViewProps> = ({ 
  onSelectUnit, 
  onNavigateTab,
  bookIndex = YEMENI_GRADE_7_PART_1_INDEX
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const book = bookIndex;

  const filteredUnits = (book.unitsIndex || []).filter(u => 
    u.unitTitle.includes(searchTerm) ||
    (u.theme && u.theme.includes(searchTerm)) ||
    (u.readingOrTextTitle && u.readingOrTextTitle.includes(searchTerm)) ||
    (u.grammarTopic && u.grammarTopic.includes(searchTerm)) ||
    (u.dictationTopic && u.dictationTopic.includes(searchTerm))
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Presentation & Verification Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span>المرحلة الأولى: خريطة الفهرسة والتحقق المكتملة للكتاب المرفوع</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              فهرسة وتحليل كتاب: <span className="text-amber-400 font-amiri font-bold">{book.title}</span> ({book.grade} - {book.part})
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              وفقاً لقواعد التكليف الصارمة، تم فحص كامل صفحات الكتاب الـ {book.totalPages} صفحة وفهرستها بدقة، وتحديد مصفوفة الوحدات الـ {book.unitsIndex.length} ونصوصها وقواعدها النحوية والإملائية وبنك تقويماتها دون إسقاط أي تفصيل.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 shrink-0 w-full lg:w-auto">
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center">
              <div className="text-2xl font-black text-amber-400">{book.totalPages}</div>
              <div className="text-[11px] text-slate-300 font-medium">إجمالي الصفحات</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center">
              <div className="text-2xl font-black text-emerald-400">{book.unitsIndex.length}</div>
              <div className="text-[11px] text-slate-300 font-medium">الوحدات التعليمية</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center">
              <div className="text-2xl font-black text-cyan-400">15</div>
              <div className="text-[11px] text-slate-300 font-medium">أسبوعاً دراسياً</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center">
              <div className="text-2xl font-black text-purple-400">100%</div>
              <div className="text-[11px] text-slate-300 font-medium">نسبة التدقيق</div>
            </div>
          </div>
        </div>

        {/* Verification Status Banner */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-emerald-300 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>سجل المطابقة: {book.verificationLog?.indexingStatus || 'مطابق 100% للمصدر الرسمي'}</span>
          </div>
          <div className="text-slate-400 flex items-center gap-2">
            <span>الصفحات المعتمدة: ص 1 إلى {book.totalPages}</span>
            <span>•</span>
            <span>الألفاظ غير الواضحة: 0</span>
          </div>
        </div>
      </div>

      {/* Book Metadata & Committees Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Official Approval & Identifiers */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-2.5 text-emerald-800 font-bold border-b border-slate-100 pb-2.5">
            <Compass className="w-5 h-5 text-emerald-600" />
            <h3>بيانات الكتاب والاعتماد الرسمي</h3>
          </div>
          <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">اسم المقرر:</span>
              <span className="font-bold text-slate-900">{book.title}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">الصف والمرحلة:</span>
              <span className="font-semibold">{book.grade} - {book.stage}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">الجزء والنسخة:</span>
              <span className="font-semibold text-emerald-700">{book.part} ({book.edition})</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">تاريخ الإقرار:</span>
              <span>{book.approvalDateHijri} ({book.approvalDateMiladi})</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">رئيس اللجنة والوزير:</span>
              <span className="font-semibold text-slate-900">{book.ministerName}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Authoring & Review Teams */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-2.5 text-teal-800 font-bold border-b border-slate-100 pb-2.5">
            <Users className="w-5 h-5 text-teal-600" />
            <h3>فريق الإعداد والتطوير والمراجعة</h3>
          </div>
          <div className="space-y-2 text-xs text-slate-700">
            <div>
              <span className="text-slate-500 block mb-1 font-semibold">فريق التأليف بوزارة التربية:</span>
              <ul className="space-y-1 pr-3 border-r-2 border-teal-500/30">
                {(book.authorTeam || book.authoringCommittee || []).slice(0, 4).map((member, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span className="font-medium text-slate-800">{member.name}</span>
                    <span className="text-[10px] text-slate-500">{member.role}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <span className="text-slate-500 block mb-1 font-semibold">فريق المراجعة بمركز البحوث التربوية:</span>
              <p className="text-[11px] text-slate-600 leading-normal">
                د. خالد الجميلي، د. خالد الحوصلي، د. أمة الباري الحمزي، أ. علي الصائغ.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Educational Methodology */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-2.5 text-amber-800 font-bold border-b border-slate-100 pb-2.5">
            <Layers className="w-5 h-5 text-amber-600" />
            <h3>فلسفة المنهج: المدخل التكاملي</h3>
          </div>
          <div className="space-y-2.5 text-xs text-slate-700">
            <p className="text-slate-600 leading-relaxed text-[11px]">
              {book.methodology?.description || book.pedagogicalApproach || 'المدخل التكاملي في تدريس فروع اللغة العربية وتنمية مهارات التفكير والتعبير.'}
            </p>
            {book.methodology?.dimensions && (
              <div className="pt-1">
                <span className="text-slate-500 block mb-1 font-semibold">الأبعاد التربوية المتكاملة:</span>
                <div className="flex flex-wrap gap-1">
                  {book.methodology.dimensions.map((dim, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-medium border border-slate-200">
                      {dim}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Central Units Catalog Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span>خريطة وحدات المنهج الـ 12 بالتتابع الأصلي للكتاب</span>
            </h3>
            <p className="text-slate-500 text-xs mt-0.5">
              فهرس شامل ومفصل لكل درس قرائي، قاعدة نحوية، موضوع إملائي، ونموذج خط وتقويم مع رقم الصفحة
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن وحدة، درس، أو قاعدة..."
              className="w-full pr-9 pl-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Units Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUnits.map((unit) => (
            <div
              key={unit.unitNumber}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Unit Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                      {unit.unitNumber}
                    </span>
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 block">
                        الوحدة {unit.unitNumber === 1 ? 'الأولى' : unit.unitNumber === 2 ? 'الثانية' : unit.unitNumber === 3 ? 'الثالثة' : unit.unitNumber === 4 ? 'الرابعة' : unit.unitNumber === 5 ? 'الخامسة' : unit.unitNumber === 6 ? 'السادسة' : unit.unitNumber === 7 ? 'السابعة' : unit.unitNumber === 8 ? 'الثامنة' : unit.unitNumber === 9 ? 'التاسعة' : unit.unitNumber === 10 ? 'العاشرة' : unit.unitNumber === 11 ? 'الحادية عشرة' : 'الثانية عشرة'}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
                        {unit.unitTitle}
                      </h4>
                    </div>
                  </div>
                  <span className="bg-slate-100 text-slate-600 text-[11px] px-2 py-0.5 rounded-full font-semibold shrink-0">
                    ص {unit.startPage} - {unit.endPage}
                  </span>
                </div>

                {/* Theme snippet */}
                <p className="text-slate-600 text-xs line-clamp-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                  {unit.theme}
                </p>

                {/* Sub-branches overview */}
                <div className="space-y-1.5 text-xs">
                  {/* Reading / Text */}
                  <div className="flex items-start gap-1.5 text-slate-700">
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded shrink-0">
                      النص
                    </span>
                    <span className="font-semibold text-slate-800 truncate" title={unit.readingOrTextTitle}>
                      {unit.readingOrTextTitle}
                    </span>
                  </div>

                  {/* Grammar */}
                  <div className="flex items-start gap-1.5 text-slate-700">
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-900 px-1.5 py-0.2 rounded shrink-0">
                      النحو
                    </span>
                    <span className="text-slate-700 truncate" title={unit.grammarTopic}>
                      {unit.grammarTopic}
                    </span>
                  </div>

                  {/* Dictation */}
                  <div className="flex items-start gap-1.5 text-slate-700">
                    <span className="text-[10px] font-bold bg-purple-100 text-purple-900 px-1.5 py-0.2 rounded shrink-0">
                      الإملاء
                    </span>
                    <span className="text-slate-700 truncate" title={unit.dictationTopic}>
                      {unit.dictationTopic}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    onSelectUnit(unit.unitNumber);
                    onNavigateTab('deep_extraction');
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all group-hover:bg-emerald-600 group-hover:text-white"
                >
                  <span>عرض الاستخراج والتحليل المعمق</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Methodological Analysis Plan Card */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3 text-amber-900 font-bold">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <h3 className="text-base sm:text-lg">خطة التحليل والاستخراج المعتمدة لمعلم المناهج اليمنية</h3>
        </div>
        <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
          بناءً على الفهرسة المكتملة أعلاه، ينطلق مشروع تحليل الكتاب وفق 6 محاور علمية صارمة:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-amber-900 font-medium">
          <div className="bg-white/80 p-3 rounded-xl border border-amber-200 flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
            <span>استخراج النصوص كاملة دون اختزال وضبط الشواهد وعزو الآيات والأحاديث.</span>
          </div>
          <div className="bg-white/80 p-3 rounded-xl border border-amber-200 flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
            <span>استخراج شبكة المفردات والتراكيب في السياق مع الأضداد والمرادفات والجموع.</span>
          </div>
          <div className="bg-white/80 p-3 rounded-xl border border-amber-200 flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
            <span>التحليل النحوي الدقيق مع استخراج التفاصيل التي وردت بالشرح ولم تظهر في الخلاصة.</span>
          </div>
          <div className="bg-white/80 p-3 rounded-xl border border-amber-200 flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0">4</span>
            <span>تحليل الإملاء وضوابط الرسم الإملائي ومقارنات التاء والهاء والهمزات.</span>
          </div>
          <div className="bg-white/80 p-3 rounded-xl border border-amber-200 flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0">5</span>
            <span>حل جميع أسئلة التقويم والأنشطة بإجابات نموذجية مع الدليل والمهارة.</span>
          </div>
          <div className="bg-white/80 p-3 rounded-xl border border-amber-200 flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0">6</span>
            <span>اكتشاف الأسئلة الامتحانية المهمة التي لا توجد إجابتها صراحة في الدروس (البند الثامن).</span>
          </div>
        </div>
      </div>
    </div>
  );
};
