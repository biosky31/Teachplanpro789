import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  CalendarDays, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  Award, 
  Search, 
  Printer, 
  ChevronLeft,
  ChevronRight,
  Sparkles,
  AlertTriangle,
  Download,
  FileText,
  Settings,
  X,
  Copy,
  Check,
  Filter,
  Layers,
  ShieldCheck,
  Eye,
  Maximize2
} from 'lucide-react';
import { SEMESTER_1_STUDY_PLAN } from '../data/studyPlanData';
import { YEMEN_OFFICIAL_CALENDAR_1447_1448 } from '../data/officialCalendar';
import { 
  generateWordDocumentHtml, 
  downloadWordDocument, 
  ExportMetadata, 
  PlanRowData 
} from '../utils/wordExport';
import { GradeConfig, WeeklySchedulePlan, PeriodSchedule } from '../types/curriculum';

interface StudyPlanViewProps {
  onSelectPeriodForPrep: (weekNum: number, periodNum: number) => void;
  activeGradeConfig?: GradeConfig;
  studyPlan?: WeeklySchedulePlan[];
}

export const StudyPlanView: React.FC<StudyPlanViewProps> = ({ 
  onSelectPeriodForPrep,
  activeGradeConfig,
  studyPlan
}) => {
  // Navigation & View Mode
  const [viewMode, setViewMode] = useState<'table' | 'weekly_cards' | 'print_preview'>('table');
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [filterType, setFilterType] = useState<'all' | 'regular' | 'review'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const isSemester2 = activeGradeConfig?.partNumber === 2;
  const currentPlan = studyPlan && studyPlan.length > 0 ? studyPlan : SEMESTER_1_STUDY_PLAN;
  const dateMapping = isSemester2 
    ? (YEMEN_OFFICIAL_CALENDAR_1447_1448.weekDatesMappingS2 || [])
    : YEMEN_OFFICIAL_CALENDAR_1447_1448.weekDatesMappingS1;

  // Export & Customization Modal State
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [copiedStatus, setCopiedStatus] = useState<boolean>(false);
  const [exportMeta, setExportMeta] = useState<ExportMetadata>({
    schoolName: 'مدرسة الشهيد الثلايا الحديثة',
    governorate: 'أمانة العاصمة / صنعاء',
    directorate: 'مديرية السبعين',
    teacherName: 'أ. أحمد محمد الحكيمي',
    supervisorName: 'أ. عبدالله صالح القحطاني',
    principalName: 'أ. نبيل عبدالرحمن القدسي',
    gradeTitle: activeGradeConfig ? activeGradeConfig.title : 'الصف السابع الأساسي - الجزء الأول',
    semesterTitle: isSemester2 ? 'الفصل الدراسي الثاني' : 'الفصل الدراسي الأول',
    academicYear: '1447 - 1448هـ / 2025 - 2026م',
    fontFamily: 'Cairo',
    colorTheme: isSemester2 ? 'navy' : 'emerald',
    weeksPerPage: 3
  });

  // Build the unified 7-column dataset for all 15 weeks
  const fullPlanRows: PlanRowData[] = useMemo(() => {
    return currentPlan.map((week) => {
      const calDate = dateMapping.find(
        (w) => w.weekNumber === week.weekNumber
      );

      // Extract unique behavioral objectives
      const allObjectives: string[] = [];
      const allStrategies: string[] = [];
      const allAssessments: string[] = [];

      week.periods.forEach((p: PeriodSchedule) => {
        p.objectives.forEach((obj: string) => {
          if (!allObjectives.includes(obj)) allObjectives.push(obj);
        });
        if (p.suggestedStrategy && !allStrategies.includes(p.suggestedStrategy)) {
          allStrategies.push(p.suggestedStrategy);
        }
        if (p.assessmentFocus && !allAssessments.includes(p.assessmentFocus)) {
          allAssessments.push(p.assessmentFocus);
        }
      });

      // Default tools & educational aids based on subject & branch
      const toolsAndAids = [
        'الكتاب المدرسي المعتمد (طبعة المناهج)',
        'السبورة التفاعلية والبطاقات الملونة',
        'شواهد من القرآن الكريم والشعر العربي',
        'معجم الصف وقواميس المفردات'
      ];

      // Extract overall page range for the week
      const firstPage = week.periods[0]?.pageRange || '';
      const lastPage = week.periods[week.periods.length - 1]?.pageRange || '';
      const weekPageRange = firstPage && lastPage ? `${firstPage} إلى ${lastPage}` : 'وفق كراس المنهج';

      // Examination & notes
      let notesAndExams = 'متابعة كراس الواجبات والتقويم التكويني المستمر';
      if (week.weekNumber === 5) {
        notesAndExams = isSemester2 
          ? '⚡ امتحان الشهر الأول للفصل الثاني (التقويم التكويني الأول - 15 درجة)'
          : '⚡ امتحان الشهر الأول (التقويم الشهري الأول - 15 درجة)';
      } else if (week.weekNumber === 10) {
        notesAndExams = isSemester2
          ? '⚡ امتحان الشهر الثاني للفصل الثاني (التقويم التكويني الثاني - 15 درجة)'
          : '⚡ امتحان الشهر الثاني (التقويم الشهري الثاني - 15 درجة)';
      } else if (week.weekNumber === 15) {
        notesAndExams = isSemester2
          ? '🏆 اختبارات نهاية الفصل الدراسي الثاني (تبدأ 18 شعبان 1448هـ)'
          : '🏆 اختبارات نهاية الفصل الدراسي الأول (وفق التقويم الوزاري)';
      }

      return {
        weekNumber: week.weekNumber,
        isReviewWeek: week.isReviewWeek,
        hijriDates: calDate ? `${calDate.startDaySaturdayHijri} - ${calDate.endDayWednesdayHijri}` : (week.hijriDates || ''),
        miladiDates: calDate ? `${calDate.startDaySaturdayMiladi} - ${calDate.endDayWednesdayMiladi}` : (week.miladiDates || ''),
        unitAndLessons: `${week.title} — (${week.unitCoverage})`,
        pageRange: weekPageRange,
        behavioralObjectives: allObjectives,
        strategies: allStrategies,
        toolsAndAids: toolsAndAids,
        assessmentAndEvidence: allAssessments,
        notesAndExams: week.monthlyExamNotice || notesAndExams
      };
    });
  }, [currentPlan, dateMapping, isSemester2]);

  // Filtered rows for UI
  const filteredRows = useMemo(() => {
    return fullPlanRows.filter((r) => {
      // Filter by type
      if (filterType === 'regular' && r.isReviewWeek) return false;
      if (filterType === 'review' && !r.isReviewWeek) return false;

      // Filter by search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = r.unitAndLessons.toLowerCase().includes(q);
        const matchObjectives = r.behavioralObjectives.some((obj) => obj.toLowerCase().includes(q));
        const matchWeek = r.weekNumber.toString().includes(q);
        return matchTitle || matchObjectives || matchWeek;
      }
      return true;
    });
  }, [fullPlanRows, filterType, searchQuery]);

  // Active week data for card view
  const activeWeekData = currentPlan.find((w) => w.weekNumber === selectedWeek) || currentPlan[0];
  const activeWeekDate = dateMapping.find((w) => w.weekNumber === selectedWeek);

  // Handle Export Word
  const handleExportWord = () => {
    const docHtml = generateWordDocumentHtml(exportMeta, fullPlanRows);
    const fileName = `الخطة_الفصلية_للغة_العربية_${exportMeta.gradeTitle.replace(/\s+/g, '_')}_1448H.doc`;
    downloadWordDocument(docHtml, fileName);
    setIsExportModalOpen(false);
  };

  // Handle Copy as Plain Text / TSV for Excel
  const handleCopyTable = () => {
    const header = ['الأسبوع', 'التاريخ الهجري والميلادي', 'الوحدة والدروس المقررة', 'الأهداف السلوكية (أن + الفعل)', 'الاستراتيجيات', 'الوسائل ومصادر التعلم', 'أساليب التقويم', 'الملاحظات'].join('\t');
    const body = fullPlanRows.map(r => [
      r.weekNumber,
      `${r.hijriDates} / ${r.miladiDates}`,
      r.unitAndLessons,
      r.behavioralObjectives.join('; '),
      r.strategies.join('; '),
      r.toolsAndAids.join('; '),
      r.assessmentAndEvidence.join('; '),
      r.notesAndExams
    ].join('\t')).join('\n');

    navigator.clipboard.writeText(`${header}\n${body}`).then(() => {
      setCopiedStatus(true);
      setTimeout(() => setCopiedStatus(false), 2500);
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-5 sm:p-7 text-white shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>الخطة الدراسية الفصلية المعتمدة — التقويم المدرسي اليمني 1447/1448هـ</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-snug">
              مولد الخطة الفصلية من 7 أعمدة • 15 أسبوعاً • 6 حصص أسبوعياً
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              توزيع تكاملي لفروع اللغة العربية (نصوص وقراءة، نحو، إملاء، خط، تعبير، تقويم) مصاغ بأهداف إجرائية سلوكية (أن + الفعل السلوكي) مع استراتيجيات التدريس المقترحة والوسائل وأساليب التقويم، قابلة للتصدير الفوري إلى وورد (Word .doc) والطباعة المتوازنة.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full lg:w-auto">
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>تصدير وورد (.doc)</span>
            </button>

            <button
              onClick={() => window.print()}
              className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-white/20 transition-all active:scale-95"
            >
              <Printer className="w-4 h-4 text-emerald-300" />
              <span>طباعة فورية</span>
            </button>

            <button
              onClick={handleCopyTable}
              className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 border border-white/20 transition-all"
              title="نسخ بيانات الخطة كجدول للاكسل"
            >
              {copiedStatus ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiedStatus ? 'تم النسخ!' : 'نسخ للإكسل'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. View Mode Selector Bar */}
      <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 no-print">
        {/* Toggle Mode Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              viewMode === 'table'
                ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>جدول الخطة المعتمدة (7 أعمدة)</span>
          </button>

          <button
            onClick={() => setViewMode('weekly_cards')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              viewMode === 'weekly_cards'
                ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarDays className="w-4 h-4 text-blue-600" />
            <span>توزيع الحصص الست (السبت-الأربعاء)</span>
          </button>

          <button
            onClick={() => setViewMode('print_preview')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              viewMode === 'print_preview'
                ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-4 h-4 text-amber-600" />
            <span>معاينة فواصل الصفحات والطباعة</span>
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ابحث في الدروس أو الأهداف..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 text-xs shrink-0">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                filterType === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              الكل (15)
            </button>
            <button
              onClick={() => setFilterType('regular')}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                filterType === 'regular' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              الوحدات (12)
            </button>
            <button
              onClick={() => setFilterType('review')}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                filterType === 'review' ? 'bg-amber-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              المراجعات (3)
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* VIEW 1: FULL 7+ COLUMN SEMESTER PLAN TABLE                     */}
      {/* ============================================================== */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Table Header Info Bar */}
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <h3 className="font-bold text-slate-900 text-sm">
                الخطة الفصلية من 7 أعمدة لمادة لغتي العربية ({activeGradeConfig?.title || 'الصف السابع'} — {isSemester2 ? 'الجزء الثاني يدرس في الفصل الثاني' : 'الجزء الأول يدرس في الفصل الأول'})
              </h3>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-emerald-800 font-semibold bg-emerald-100 px-2 py-0.5 rounded-full">
                {filteredRows.length} أسبوعاً معروضاً
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600"></span>
                <span>أن + الفعل السلوكي</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-300"></span>
                <span>أسابيع المراجعة والامتحانات</span>
              </span>
            </div>
          </div>

          {/* Table Container with Horizontal Scroll for Mobile */}
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse text-xs">
              <thead>
                <tr className="bg-emerald-900 text-white font-bold border-b border-emerald-950">
                  <th className="py-3 px-3 text-center w-16 border-l border-emerald-800">الأسبوع</th>
                  <th className="py-3 px-3 w-36 border-l border-emerald-800">التاريخ (التقويم الوزاري)</th>
                  <th className="py-3 px-3 w-56 border-l border-emerald-800">الوحدة والدروس المقررة والصفحات</th>
                  <th className="py-3 px-4 min-w-[260px] border-l border-emerald-800">الأهداف السلوكية الإجرائية (أن + الفعل)</th>
                  <th className="py-3 px-3 w-40 border-l border-emerald-800">استراتيجيات التدريس المقترحة</th>
                  <th className="py-3 px-3 w-36 border-l border-emerald-800">الوسائل ومصادر التعلم</th>
                  <th className="py-3 px-3 w-36 border-l border-emerald-800">أدلة التعلم وأساليب التقويم</th>
                  <th className="py-3 px-3 w-32">الملاحظات والامتحانات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredRows.map((row, idx) => {
                  const isReview = row.isReviewWeek;
                  return (
                    <tr
                      key={row.weekNumber}
                      className={`hover:bg-emerald-50/40 transition-colors align-top ${
                        isReview ? 'bg-amber-50/70' : idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                      }`}
                    >
                      {/* Col 1: Week Number */}
                      <td className="py-3 px-3 text-center border-l border-slate-200 font-bold">
                        <div className={`w-8 h-8 mx-auto rounded-xl flex flex-col items-center justify-center ${
                          isReview ? 'bg-amber-200 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                        }`}>
                          <span className="text-xs font-black">{row.weekNumber}</span>
                        </div>
                        <span className={`text-[10px] mt-1 block font-semibold ${isReview ? 'text-amber-800' : 'text-slate-500'}`}>
                          {isReview ? 'مراجعة' : 'دراسة'}
                        </span>
                      </td>

                      {/* Col 2: Calendar Dates */}
                      <td className="py-3 px-3 border-l border-slate-200 space-y-1">
                        <div className="font-bold text-emerald-900 bg-emerald-50 px-2 py-1 rounded border border-emerald-200/80">
                          <span className="text-[10px] text-emerald-600 block">هجري:</span>
                          <span className="text-[11px] leading-tight block">{row.hijriDates}</span>
                        </div>
                        <div className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[10px]">
                          <span className="text-slate-400 block">ميلادي:</span>
                          <span className="block">{row.miladiDates}</span>
                        </div>
                      </td>

                      {/* Col 3: Unit & Lessons */}
                      <td className="py-3 px-3 border-l border-slate-200">
                        <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug">
                          {row.unitAndLessons}
                        </h4>
                        <span className="inline-block mt-2 bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-bold text-[10px]">
                          {row.pageRange}
                        </span>
                      </td>

                      {/* Col 4: Behavioral Objectives (أن + الفعل) */}
                      <td className="py-3 px-4 border-l border-slate-200">
                        <ul className="space-y-1.5 pr-2 border-r-2 border-emerald-400/50">
                          {row.behavioralObjectives.map((obj, i) => (
                            <li key={i} className="text-slate-800 leading-relaxed text-[11px]">
                              • <span className="font-bold text-emerald-800">{obj.slice(0, obj.indexOf(' ') + 1)}</span>
                              {obj.slice(obj.indexOf(' ') + 1)}
                            </li>
                          ))}
                        </ul>
                      </td>

                      {/* Col 5: Strategies */}
                      <td className="py-3 px-3 border-l border-slate-200">
                        <ul className="space-y-1 text-slate-700 text-[11px]">
                          {row.strategies.map((strat, i) => (
                            <li key={i} className="bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded border border-emerald-200/60 font-medium leading-tight">
                              {strat}
                            </li>
                          ))}
                        </ul>
                      </td>

                      {/* Col 6: Tools & Aids */}
                      <td className="py-3 px-3 border-l border-slate-200">
                        <ul className="space-y-1 text-slate-600 text-[10px]">
                          {row.toolsAndAids.map((tool, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-emerald-600">•</span>
                              <span>{tool}</span>
                            </li>
                          ))}
                        </ul>
                      </td>

                      {/* Col 7: Assessment & Evidence */}
                      <td className="py-3 px-3 border-l border-slate-200">
                        <ul className="space-y-1 text-slate-700 text-[11px]">
                          {row.assessmentAndEvidence.map((ev, i) => (
                            <li key={i} className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-[10px] leading-tight font-medium">
                              ✓ {ev}
                            </li>
                          ))}
                        </ul>
                      </td>

                      {/* Col 8: Notes & Exams */}
                      <td className="py-3 px-3 font-semibold text-[11px]">
                        {isReview ? (
                          <div className="bg-amber-100 border border-amber-300 text-amber-900 p-2 rounded-lg font-bold text-[10px] leading-tight">
                            {row.notesAndExams}
                          </div>
                        ) : (
                          <span className="text-slate-500 text-[10px] block leading-tight">
                            {row.notesAndExams}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
            <div>
              <span>إجمالي الحصص المخططة ({isSemester2 ? 'للفصل الثاني' : 'للفصل الأول'}): <strong>90 حصة</strong> (15 أسبوعاً × 6 حصص من السبت إلى الأربعاء)</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsExportModalOpen(true)}
                className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تخصيص وتصدير وورد</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW 2: 6 PERIODS PER WEEK CARDS (ORIGINAL DRILL-DOWN)        */}
      {/* ============================================================== */}
      {viewMode === 'weekly_cards' && (
        <div className="space-y-4">
          {/* 15 Weeks Pills Bar */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <span className="text-xs font-bold text-slate-700 block">اختر الأسبوع الدراسي لاستعراض جدول حصصه الست:</span>
            <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-15 gap-1.5 overflow-x-auto py-1">
              {currentPlan.map((w) => {
                const isSelected = selectedWeek === w.weekNumber;
                const isReview = w.isReviewWeek;
                return (
                  <button
                    key={w.weekNumber}
                    onClick={() => setSelectedWeek(w.weekNumber)}
                    className={`py-2 px-1 rounded-xl text-center transition-all flex flex-col items-center justify-center gap-0.5 border ${
                      isSelected
                        ? 'bg-emerald-700 text-white font-black shadow-md border-emerald-600 ring-2 ring-emerald-500/30'
                        : isReview
                        ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold border-amber-300'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold border-slate-200'
                    }`}
                  >
                    <span className="text-[10px] opacity-75">أسبوع</span>
                    <span className="text-sm font-black">{w.weekNumber}</span>
                    {isReview && (
                      <span className={`text-[8px] px-1 rounded-full ${isSelected ? 'bg-amber-400 text-slate-900' : 'bg-amber-200 text-amber-900'}`}>
                        مراجعة
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Week Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    activeWeekData.isReviewWeek
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}>
                    {activeWeekData.isReviewWeek ? 'أسبوع مراجعة وامتحان' : 'أسبوع دراسي نمطي'}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500 font-medium">{activeWeekData.unitCoverage}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  الأسبوع {activeWeekData.weekNumber}: {activeWeekData.title}
                </h3>
                {activeWeekDate && (
                  <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs">
                    <span className="bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      <span>التقويم الوزاري الهجري: {activeWeekDate.startDaySaturdayHijri} إلى {activeWeekDate.endDayWednesdayHijri}</span>
                    </span>
                    <span className="bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-lg border border-slate-200">
                      الموافق ميلادياً: {activeWeekDate.startDaySaturdayMiladi} إلى {activeWeekDate.endDayWednesdayMiladi}
                    </span>
                  </div>
                )}
              </div>

              {activeWeekData.monthlyExamNotice && (
                <div className="bg-amber-50 border border-amber-300 px-4 py-2 rounded-xl text-xs font-bold text-amber-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{activeWeekData.monthlyExamNotice}</span>
                </div>
              )}
            </div>

            {/* 6 Periods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeWeekData.periods.map((period: PeriodSchedule) => (
                <div
                  key={period.periodNumber}
                  className="bg-slate-50/70 hover:bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all flex flex-col justify-between group space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="w-6 h-6 rounded-lg bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">
                          {period.periodNumber}
                        </span>
                        <span className="font-bold text-emerald-800">{period.day}</span>
                      </div>
                      <span className="bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded text-[11px] font-semibold">
                        {period.pageRange}
                      </span>
                    </div>

                    <div className="text-[11px] font-bold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-100 inline-block">
                      الفرع: <span className="text-emerald-800">{period.branch}</span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-emerald-700 transition-colors">
                      {period.topic}
                    </h4>

                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-bold text-slate-500 block">الأهداف السلوكية الإجرائية:</span>
                      <ul className="text-[11px] text-slate-600 space-y-1 pr-2 border-r-2 border-emerald-400/40">
                        {period.objectives.map((obj: string, i: number) => (
                          <li key={i} className="line-clamp-2">• {obj}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 text-[10px] text-slate-500 space-y-0.5">
                      <div>
                        <span className="font-semibold text-slate-700">استراتيجية مقترحة: </span>
                        <span>{period.suggestedStrategy}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">التقويم المركز: </span>
                        <span>{period.assessmentFocus}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectPeriodForPrep(activeWeekData.weekNumber, period.periodNumber)}
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-emerald-600/10 hover:bg-emerald-600 text-emerald-800 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>توليد التحضير اليومي لهذه الحصة</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW 3: PRINT PREVIEW & BALANCED PAGE BREAKS (A4 LANDSCAPE)   */}
      {/* ============================================================== */}
      {viewMode === 'print_preview' && (
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 text-xs text-amber-900 flex items-center justify-between no-print">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                هذه المعاينة تحاكي الصفحات المطبوعة الفعلية (A4 بالعرض) مع فواصل صفحات متوازنة بمعدل {exportMeta.weeksPerPage || 3} أسابيع في الصفحة الواحدة وترويسة وزارة التربية اليمنية وتواقيع الإدارة في نهاية كل صفحة.
              </span>
            </div>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-1.5 shrink-0 shadow-sm hover:bg-emerald-800"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة المستند</span>
            </button>
          </div>

          {/* Render Balanced Pages */}
          {Array.from({ length: Math.ceil(fullPlanRows.length / (exportMeta.weeksPerPage || 3)) }).map((_, pageIdx) => {
            const weeksPerPage = exportMeta.weeksPerPage || 3;
            const pageRows = fullPlanRows.slice(pageIdx * weeksPerPage, (pageIdx + 1) * weeksPerPage);
            const totalPages = Math.ceil(fullPlanRows.length / weeksPerPage);

            return (
              <div 
                key={pageIdx}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-slate-300 space-y-4 print:shadow-none print:border-none print:p-0 print:m-0 print:break-after-page"
              >
                {/* Official Ministry Header for Each Page */}
                <div className="border-b-2 border-emerald-800 pb-3 flex items-start justify-between text-xs">
                  <div className="text-right space-y-0.5">
                    <p className="font-bold text-slate-900">الجمهورية اليمنية</p>
                    <p className="text-slate-700">وزارة التربية والتعليم والبحث العلمي</p>
                    <p className="text-slate-600">مكتب التربية بمحافظة: <u>{exportMeta.governorate}</u></p>
                    <p className="text-slate-600">مديرية: <u>{exportMeta.directorate}</u> — مدرسة: <u>{exportMeta.schoolName}</u></p>
                  </div>

                  <div className="text-center">
                    <h2 className="text-lg font-black text-emerald-800 font-['Amiri',serif]">
                      خطة توزيع المنهاج الدراسي للفصل الدراسي الأول
                    </h2>
                    <h3 className="font-bold text-slate-900 text-sm">
                      مادة: لغتي العربية — {exportMeta.gradeTitle}
                    </h3>
                    <p className="text-amber-800 font-bold text-[11px]">
                      وفق التقويم المدرسي المعتمد للعام {exportMeta.academicYear}
                    </p>
                  </div>

                  <div className="text-left space-y-0.5 text-slate-600">
                    <p><strong>المعلم:</strong> {exportMeta.teacherName}</p>
                    <p><strong>الموجه:</strong> {exportMeta.supervisorName}</p>
                    <p><strong>نظام الحصص:</strong> 6 حصص أسبوعياً (السبت-الأربعاء)</p>
                    <p className="text-emerald-800 font-bold">الصفحة {pageIdx + 1} من {totalPages}</p>
                  </div>
                </div>

                {/* Page Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-right border-collapse text-[10px]">
                    <thead>
                      <tr className="bg-emerald-800 text-white font-bold">
                        <th className="p-2 border border-slate-700 w-12 text-center">الأسبوع</th>
                        <th className="p-2 border border-slate-700 w-28">التاريخ الوزاري</th>
                        <th className="p-2 border border-slate-700 w-44">الوحدة والدروس</th>
                        <th className="p-2 border border-slate-700 min-w-[200px]">الأهداف السلوكية (أن + الفعل)</th>
                        <th className="p-2 border border-slate-700 w-32">الاستراتيجيات</th>
                        <th className="p-2 border border-slate-700 w-28">الوسائل</th>
                        <th className="p-2 border border-slate-700 w-28">أساليب التقويم</th>
                        <th className="p-2 border border-slate-700 w-24 text-center">الملاحظات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageRows.map((r, rIdx) => (
                        <tr 
                          key={r.weekNumber}
                          className={`align-top ${r.isReviewWeek ? 'bg-amber-100/60 font-semibold' : rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                        >
                          <td className="p-2 border border-slate-300 text-center font-bold">
                            <span className="text-xs text-emerald-800">{r.weekNumber}</span><br/>
                            <span className="text-[8px] text-slate-500">{r.isReviewWeek ? 'مراجعة' : 'دراسة'}</span>
                          </td>
                          <td className="p-2 border border-slate-300">
                            <strong>هـ:</strong> {r.hijriDates}<br/>
                            <span className="text-slate-500"><strong>م:</strong> {r.miladiDates}</span>
                          </td>
                          <td className="p-2 border border-slate-300">
                            <strong className="text-slate-900 block">{r.unitAndLessons}</strong>
                            <span className="text-slate-600 text-[9px] bg-slate-200 px-1 rounded inline-block mt-1">{r.pageRange}</span>
                          </td>
                          <td className="p-2 border border-slate-300">
                            <ul className="space-y-1">
                              {r.behavioralObjectives.map((obj, i) => (
                                <li key={i}>• {obj}</li>
                              ))}
                            </ul>
                          </td>
                          <td className="p-2 border border-slate-300 text-emerald-800 font-medium">
                            {r.strategies.map((st, i) => (
                              <div key={i}>• {st}</div>
                            ))}
                          </td>
                          <td className="p-2 border border-slate-300 text-slate-600">
                            {r.toolsAndAids.map((tl, i) => (
                              <div key={i}>• {tl}</div>
                            ))}
                          </td>
                          <td className="p-2 border border-slate-300">
                            {r.assessmentAndEvidence.map((ev, i) => (
                              <div key={i}>✓ {ev}</div>
                            ))}
                          </td>
                          <td className="p-2 border border-slate-300 text-center font-bold text-amber-900">
                            {r.notesAndExams}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Signatures Footer */}
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-700">
                  <div className="text-center w-1/3">
                    <p className="font-bold">معلم المادة:</p>
                    <p className="mt-1">{exportMeta.teacherName}</p>
                    <p className="text-slate-400 text-[10px] mt-2">التوقيع: .....................</p>
                  </div>
                  <div className="text-center w-1/3">
                    <p className="font-bold">الموجه التربوي المختص:</p>
                    <p className="mt-1">{exportMeta.supervisorName}</p>
                    <p className="text-slate-400 text-[10px] mt-2">التوقيع: .....................</p>
                  </div>
                  <div className="text-center w-1/3">
                    <p className="font-bold">مدير المدرسة:</p>
                    <p className="mt-1">{exportMeta.principalName}</p>
                    <p className="text-slate-400 text-[10px] mt-2">الختم والتوقيع: .....................</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ============================================================== */}
      {/* EXPORT CUSTOMIZATION MODAL (TEACHER, SCHOOL, FONTS & THEMES)   */}
      {/* ============================================================== */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 no-print animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-emerald-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black">تخصيص وتصدير الخطة الفصلية (Word .doc)</h3>
                  <p className="text-xs text-emerald-200">تنسيق عربي احترافي مع فواصل صفحات متوازنة</p>
                </div>
              </div>
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">اسم المعلم:</label>
                  <input
                    type="text"
                    value={exportMeta.teacherName}
                    onChange={(e) => setExportMeta({ ...exportMeta, teacherName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">اسم المدرسة:</label>
                  <input
                    type="text"
                    value={exportMeta.schoolName}
                    onChange={(e) => setExportMeta({ ...exportMeta, schoolName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">المحافظة:</label>
                  <input
                    type="text"
                    value={exportMeta.governorate}
                    onChange={(e) => setExportMeta({ ...exportMeta, governorate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">المديرية:</label>
                  <input
                    type="text"
                    value={exportMeta.directorate}
                    onChange={(e) => setExportMeta({ ...exportMeta, directorate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">الموجه التربوي:</label>
                  <input
                    type="text"
                    value={exportMeta.supervisorName}
                    onChange={(e) => setExportMeta({ ...exportMeta, supervisorName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">مدير المدرسة:</label>
                  <input
                    type="text"
                    value={exportMeta.principalName}
                    onChange={(e) => setExportMeta({ ...exportMeta, principalName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  />
                </div>
              </div>

              {/* Design Customizations */}
              <div className="pt-3 border-t border-slate-200 space-y-3">
                <span className="font-bold text-slate-800 text-sm block">خيارات التنسيق والطباعة:</span>

                {/* Color Scheme */}
                <div>
                  <label className="font-semibold text-slate-700 block mb-1.5">النسق اللوني للجداول والترويسة:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'emerald', label: 'الزمردي الرسمي', color: 'bg-emerald-700' },
                      { id: 'navy', label: 'الكحلي الملكي', color: 'bg-blue-900' },
                      { id: 'burgundy', label: 'العنابي الأكاديمي', color: 'bg-rose-900' },
                      { id: 'classic_black', label: 'أحادي (أبيض وأسود)', color: 'bg-slate-800' }
                    ].map((theme) => (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setExportMeta({ ...exportMeta, colorTheme: theme.id as any })}
                        className={`p-2 rounded-xl border text-center transition-all flex items-center gap-2 justify-center ${
                          exportMeta.colorTheme === theme.id
                            ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/20 font-bold'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full ${theme.color}`}></span>
                        <span className="text-[11px]">{theme.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Family */}
                <div>
                  <label className="font-semibold text-slate-700 block mb-1.5">نوع الخط العربي:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'Cairo', label: 'خط كايرو الحديث' },
                      { id: 'Amiri', label: 'خط الأميري النسخي' },
                      { id: 'Traditional Arabic', label: 'الخط العربي التقليدي' },
                      { id: 'Tahoma', label: 'خط تاهوما الرسمي' }
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setExportMeta({ ...exportMeta, fontFamily: f.id as any })}
                        className={`py-2 px-1 rounded-xl border text-center transition-all ${
                          exportMeta.fontFamily === f.id
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="text-[11px]">{f.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Weeks per page */}
                <div>
                  <label className="font-semibold text-slate-700 block mb-1.5">تقسيم فواصل الصفحات (توازن الصفحة):</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setExportMeta({ ...exportMeta, weeksPerPage: 3 })}
                      className={`p-2.5 rounded-xl border text-right transition-all ${
                        exportMeta.weeksPerPage === 3
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-bold block">3 أسابيع في كل صفحة (موصى به جداً)</span>
                      <span className="text-[10px] text-slate-500 block">يقسم الخطة إلى 5 صفحات متوازنة مريحة للقراءة والطباعة</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setExportMeta({ ...exportMeta, weeksPerPage: 4 })}
                      className={`p-2.5 rounded-xl border text-right transition-all ${
                        exportMeta.weeksPerPage === 4
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-bold block">4 أسابيع في كل صفحة</span>
                      <span className="text-[10px] text-slate-500 block">يقسم الخطة إلى 4 صفحات بأسطر أكثر كثافة</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-200 font-bold transition-colors"
              >
                إلغاء
              </button>

              <button
                onClick={handleExportWord}
                className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>تنزيل ملف وورد (.doc) فوراً</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
