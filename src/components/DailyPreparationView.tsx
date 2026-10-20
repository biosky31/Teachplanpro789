import React, { useState } from 'react';
import { 
  Printer, 
  Copy, 
  Check, 
  BookOpen, 
  Sparkles, 
  Award, 
  Calendar,
  Layers,
  FileCheck,
  CheckCircle2,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Settings2,
  SlidersHorizontal,
  GraduationCap,
  Clock,
  Target,
  Users,
  Compass,
  FileText
} from 'lucide-react';
import { UNITS_EXTRACTED_DATA } from '../data/unitsDetailData';
import { YEMEN_OFFICIAL_CALENDAR_1447_1448 } from '../data/officialCalendar';
import { PEDAGOGICAL_GOALS_LIST } from '../data/pedagogicalGoalsBank';
import { UnitData, GradeConfig } from '../types/curriculum';

interface DailyPreparationViewProps {
  initialUnitId?: number;
  initialWeek?: number;
  initialPeriod?: number;
  unitsData?: UnitData[];
  activeGradeConfig?: GradeConfig;
}

export const DailyPreparationView: React.FC<DailyPreparationViewProps> = ({
  initialUnitId,
  initialWeek = 1,
  initialPeriod = 1,
  unitsData,
  activeGradeConfig
}) => {
  const data = unitsData && unitsData.length > 0 ? unitsData : UNITS_EXTRACTED_DATA;
  const defaultUnitId = (initialUnitId && data.some(u => u.id === initialUnitId)) ? initialUnitId : data[0].id;

  const [selectedUnitId, setSelectedUnitId] = useState<number>(defaultUnitId);
  const [selectedDay, setSelectedDay] = useState<string>('السبت');
  const [selectedPeriodNum, setSelectedPeriodNum] = useState<number>(initialPeriod);
  const [teacherName, setTeacherName] = useState<string>(() => {
    try { return localStorage.getItem('curriculum_teacher_name') || 'أ. بايسكاي (BIOSKY30)'; } catch { return 'أ. بايسكاي (BIOSKY30)'; }
  });
  const [teacherEmail, setTeacherEmail] = useState<string>(() => {
    try { return localStorage.getItem('curriculum_teacher_email') || 'BIOSKY30@gmail.com'; } catch { return 'BIOSKY30@gmail.com'; }
  });
  const [schoolName, setSchoolName] = useState<string>(() => {
    try { return localStorage.getItem('curriculum_school_name') || 'مدرسة إشراق اليمن'; } catch { return 'مدرسة إشراق اليمن'; }
  });
  const [selectedGoalCode, setSelectedGoalCode] = useState<string>('7-QR-01');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showSettingsBar, setShowSettingsBar] = useState<boolean>(false); // default collapsed for maximum reading space!
  const [periodDuration, setPeriodDuration] = useState<40 | 35>(() => {
    try {
      const saved = localStorage.getItem('curriculum_period_duration');
      return saved === '35' ? 35 : 40;
    } catch {
      return 40;
    }
  });

  const handleUpdateTeacherName = (val: string) => {
    setTeacherName(val);
    try { localStorage.setItem('curriculum_teacher_name', val); } catch {}
  };
  const handleUpdateTeacherEmail = (val: string) => {
    setTeacherEmail(val);
    try { localStorage.setItem('curriculum_teacher_email', val); } catch {}
  };
  const handleUpdateSchoolName = (val: string) => {
    setSchoolName(val);
    try { localStorage.setItem('curriculum_school_name', val); } catch {}
  };
  const handleUpdatePeriodDuration = (dur: 40 | 35) => {
    setPeriodDuration(dur);
    try { localStorage.setItem('curriculum_period_duration', String(dur)); } catch {}
  };

  const timingBreakdown = periodDuration === 35 
    ? { warmup: '4 دقائق', activity: '24 دقيقة', closure: '7 دقائق', total: '35 دقيقة', label: 'التوقيت الشتوي / الفترات (35 دقيقة)' }
    : { warmup: '5 دقائق', activity: '27 دقيقة', closure: '8 دقائق', total: '40 دقيقة', label: 'الدوام المعتاد (40 دقيقة - أطول حصة)' };

  // Active unit and lessons
  const unit = data.find(u => u.id === selectedUnitId) || data[0];
  const readingLesson = unit.lessons.find(l => l.branch === 'texts' || l.branch === 'reading');
  const grammarLesson = unit.lessons.find(l => l.branch === 'grammar');
  const dictationLesson = unit.lessons.find(l => l.branch === 'dictation');
  const assessmentLesson = unit.lessons.find(l => l.branch === 'assessment');

  const isSemester2 = activeGradeConfig?.partNumber === 2;
  const dateList = isSemester2 
    ? (YEMEN_OFFICIAL_CALENDAR_1447_1448.weekDatesMappingS2 || [])
    : YEMEN_OFFICIAL_CALENDAR_1447_1448.weekDatesMappingS1;

  // Matching week from official calendar
  const weekMapping = dateList.find(w => w.weekNumber === (isSemester2 ? unit.id - 12 : unit.id)) || 
                      dateList[0] || 
                      YEMEN_OFFICIAL_CALENDAR_1447_1448.weekDatesMappingS1[0];

  // Active pedagogical goal
  const activeGoal = PEDAGOGICAL_GOALS_LIST.find(g => g.code === selectedGoalCode) || PEDAGOGICAL_GOALS_LIST[0];

  // Determine lesson focus based on selected period
  const getPeriodTopic = () => {
    switch (selectedPeriodNum) {
      case 1:
        return {
          title: `قراءة واعية وتحليل أفكار: ${readingLesson?.title || unit.title}`,
          branch: 'القراءة والمطالعة',
          sourcePage: readingLesson?.page || unit.pageRange[0],
          mainAim: 'إتقان القراءة الجهرية السليمة واستيعاب الفكرة العامة وتتبع الأفكار الفرعية للنص.'
        };
      case 2:
        return {
          title: `المعجم اللغوي ودلالات التراكيب في سياق: ${readingLesson?.title || unit.title}`,
          branch: 'المفردات والفهم والتحليل',
          sourcePage: (readingLesson?.page || unit.pageRange[0]) + 1,
          mainAim: 'اشتقاق المعاني السياقية وتوظيف المرادفات والأضداد في جمل لغوية فصيحة.'
        };
      case 3:
      case 4:
        return {
          title: `القواعد النحوية والصرفية: ${grammarLesson?.title || 'القاعدة النحوية'}`,
          branch: 'النحو والصرف',
          sourcePage: grammarLesson?.page || unit.pageRange[0] + 3,
          mainAim: `استنباط أحكام ${grammarLesson?.title || 'القاعدة'} وتحليل الشواهد والإعراب التام للشاهد.`
        };
      case 5:
        return {
          title: `المهارات الإملائية والخط: ${dictationLesson?.title || 'القاعدة الإملائية'}`,
          branch: 'الإملاء والرسم الكتابي',
          sourcePage: dictationLesson?.page || unit.pageRange[0] + 5,
          mainAim: `تطبيق الضوابط الإملائية في ${dictationLesson?.title || 'الدرس'} وكتابة نموذج خط الرقعة والنسخ.`
        };
      case 6:
      default:
        return {
          title: `التقويم الشامل وتطبيقات التعبير والتواصل الشفهي`,
          branch: 'التقويم والإنتاج اللغوي',
          sourcePage: assessmentLesson?.page || unit.pageRange[1],
          mainAim: 'قياس المخرجات التعليمية للأسبوع وحل الأنشطة التقويمية المقررة في الكتاب.'
        };
    }
  };

  const periodDetails = getPeriodTopic();

  const handleCopy = () => {
    const textToCopy = `كراس التحضير اليومي النموذجي لمادة لغتي العربية
المدرسة: ${schoolName}
المعلم / المعدّ: ${teacherName}
البريد الإلكتروني: ${teacherEmail}
الصف: ${activeGradeConfig ? activeGradeConfig.title : 'الصف التاسع الأساسي'}
الوحدة: ${unit.unitNumberArabic} - ${unit.title}
الحصة: ${selectedDay} (حصة ${selectedPeriodNum}) - ${periodDetails.branch}
موضوع الدرس: ${periodDetails.title}
التاريخ بالتقويم الوزاري: ${weekMapping.startDaySaturdayHijri} (الموافق: ${weekMapping.startDaySaturdayMiladi})
الهدف الأساسي [${activeGoal.code}]: ${activeGoal.statement}
الاستراتيجية التدريسية: ${activeGoal.strategy}
مؤشر التحقق: ${activeGoal.verificationIndicator}
المهمة التطبيقية: ${activeGoal.appliedTask}
التمايز والدعم: ${activeGoal.differentiationAndSupport}`;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePrevUnit = () => {
    const currentIndex = data.findIndex(u => u.id === selectedUnitId);
    if (currentIndex > 0) {
      setSelectedUnitId(data[currentIndex - 1].id);
    }
  };

  const handleNextUnit = () => {
    const currentIndex = data.findIndex(u => u.id === selectedUnitId);
    if (currentIndex < data.length - 1) {
      setSelectedUnitId(data[currentIndex + 1].id);
    }
  };

  return (
    <div className="space-y-4 animate-fadeIn pb-12">
      {/* 1. Sleek Action Bar - Minimal Vertical Profile, Maximum Reading Clearance */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3 no-print">
        {/* Left/Right quick indicators & Unit Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200/80 font-bold text-xs">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>كراس التحضير والقراءة المباشرة</span>
          </div>

          {/* Unit Switcher Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={handlePrevUnit}
              disabled={data.findIndex(u => u.id === selectedUnitId) === 0}
              className="p-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="الوحدة السابقة"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <select
              value={selectedUnitId}
              onChange={(e) => setSelectedUnitId(Number(e.target.value))}
              className="bg-white border-0 text-xs font-bold text-slate-800 py-1 px-2 rounded-lg focus:ring-1 focus:ring-emerald-600 outline-none"
            >
              {data.map(u => (
                <option key={u.id} value={u.id}>
                  {u.unitNumberArabic}: {u.title}
                </option>
              ))}
            </select>
            <button
              onClick={handleNextUnit}
              disabled={data.findIndex(u => u.id === selectedUnitId) === data.length - 1}
              className="p-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="الوحدة التالية"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Period Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
            {['السبت (ح1)', 'الأحد (ح2)', 'الإثنين (ح3)', 'الثلاثاء (ح4)', 'الثلاثاء (ح5)', 'الأربعاء (ح6)'].map((label, idx) => {
              const pNum = idx + 1;
              const isSelected = selectedPeriodNum === pNum;
              const days = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الثلاثاء', 'الأربعاء'];
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedPeriodNum(pNum);
                    setSelectedDay(days[idx]);
                  }}
                  className={`px-2 py-1 rounded-lg font-bold transition-all ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Controls: Settings Toggle, Copy, Print */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettingsBar(!showSettingsBar)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              showSettingsBar
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
            title="تعديل خيارات المعلم والاستراتيجية والمدرسة"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>خيارات الحصة</span>
            {showSettingsBar ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-all border border-slate-200"
            title="نسخ نص التحضير كاملاً"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{isCopied ? 'تم النسخ!' : 'نسخ الخطة'}</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
            title="طباعة كراس التحضير الرسمي بتنسيق الوزارة"
          >
            <Printer className="w-3.5 h-3.5 text-amber-300" />
            <span>طباعة رسمية</span>
          </button>
        </div>
      </div>

      {/* 2. Optional Collapsible Settings Drawer - Stays hidden when teacher wants pure reading */}
      {showSettingsBar && (
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-inner grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 text-xs no-print animate-fadeIn">
          <div>
            <label className="block text-slate-600 font-bold mb-1">الاستراتيجية التخصصية المعتمدة:</label>
            <select
              value={selectedGoalCode}
              onChange={(e) => setSelectedGoalCode(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 font-medium text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 truncate"
            >
              {PEDAGOGICAL_GOALS_LIST.map(g => (
                <option key={g.id} value={g.code}>
                  [{g.code}] {g.domain}: {g.strategy}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">اسم المعلم / المعدّ:</label>
            <input
              type="text"
              value={teacherName}
              onChange={(e) => handleUpdateTeacherName(e.target.value)}
              placeholder="اسم المعلم"
              className="w-full bg-white border border-slate-300 px-3 py-1.5 rounded-xl text-xs font-medium focus:ring-1 focus:ring-emerald-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">البريد الإلكتروني (المعدّ):</label>
            <input
              type="email"
              value={teacherEmail}
              onChange={(e) => handleUpdateTeacherEmail(e.target.value)}
              placeholder="البريد الإلكتروني"
              className="w-full bg-white border border-slate-300 px-3 py-1.5 rounded-xl text-xs font-mono font-medium focus:ring-1 focus:ring-emerald-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">اسم المدرسة:</label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => handleUpdateSchoolName(e.target.value)}
              placeholder="اسم المدرسة"
              className="w-full bg-white border border-slate-300 px-3 py-1.5 rounded-xl text-xs font-medium focus:ring-1 focus:ring-emerald-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">اليوم والحصة:</label>
            <div className="flex gap-2">
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-2/3 bg-white border border-slate-300 rounded-xl px-2 py-1.5 font-medium text-xs"
              >
                <option value="السبت">السبت</option>
                <option value="الأحد">الأحد</option>
                <option value="الإثنين">الإثنين</option>
                <option value="الثلاثاء">الثلاثاء</option>
                <option value="الأربعاء">الأربعاء</option>
              </select>
              <select
                value={selectedPeriodNum}
                onChange={(e) => setSelectedPeriodNum(Number(e.target.value))}
                className="w-1/3 bg-white border border-slate-300 rounded-xl px-2 py-1.5 font-medium text-xs text-center"
              >
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <option key={n} value={n}>حصة {n}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">زمن الحصة المعتمد:</label>
            <div className="flex gap-1 bg-slate-200/70 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => handleUpdatePeriodDuration(40)}
                className={`w-1/2 py-1 px-1 rounded-lg font-bold text-[11px] transition-all text-center ${
                  periodDuration === 40 ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="الدوام المعتاد الأطول (40 دقيقة)"
              >
                40 دقيقة
              </button>
              <button
                type="button"
                onClick={() => handleUpdatePeriodDuration(35)}
                className={`w-1/2 py-1 px-1 rounded-lg font-bold text-[11px] transition-all text-center ${
                  periodDuration === 35 ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="الدوام الشتوي / الفترات (35 دقيقة)"
              >
                35 دقيقة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. The Full-Page Immersive Reading Workspace (No floating cage, no tiny scrollbar) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8 print:p-0 print:border-none print:shadow-none">
        
        {/* Official Header (Visible on screen and in print) */}
        <div className="border-b-2 border-slate-800 pb-5 text-center space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-600">
            <span>الجمهورية اليمنية</span>
            <span>وزارة التربية والتعليم والبحث العلمي</span>
            <span>قطاع المناهج والتوجيه</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-amiri tracking-tight">
            كراس التحضير اليومي والتدريس الفصلي النموذجي
          </h2>
          <div className="text-xs sm:text-sm font-semibold text-emerald-800">
            مقرر «لغتي العربية» • {activeGradeConfig ? activeGradeConfig.title : 'الصف التاسع الأساسي'} ({activeGradeConfig?.stageName || 'الشهادة الأساسية العامة'})
          </div>

          {/* Teacher, School and Calendar Metadata Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 text-xs text-slate-700 font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-200 print:bg-white print:border-slate-300">
            <div><span className="text-slate-500 font-bold">المدرسة: </span>{schoolName}</div>
            <div><span className="text-slate-500 font-bold">المعلم / المعدّ: </span>{teacherName}</div>
            <div><span className="text-slate-500 font-bold">البريد: </span><span className="font-mono text-emerald-800 text-[11px]">{teacherEmail}</span></div>
            <div className="text-emerald-800 font-bold">
              <span className="text-slate-500 font-normal">التقويم الوزاري: </span>
              {weekMapping.startDaySaturdayHijri}
            </div>
          </div>
        </div>

        {/* Lesson Overview Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-5 shadow-sm border border-emerald-800/40 print:text-black print:bg-none print:border-slate-400 print:p-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 print:hidden mb-2">
                <span>{periodDetails.branch}</span>
                <span>•</span>
                <span>الصفحة {periodDetails.sourcePage}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-amiri print:text-black">
                {periodDetails.title}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200 print:text-slate-700 mt-1">
                {unit.unitNumberArabic}: {unit.title} — المفهوم المركزي: {unit.theme}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs px-4 py-3 rounded-xl border border-white/10 text-center shrink-0 print:border-slate-300 print:bg-slate-50">
              <span className="block text-[11px] text-amber-300 print:text-slate-600 font-bold">زمن الحصة</span>
              <span className="text-lg font-black text-white print:text-black">{timingBreakdown.total}</span>
            </div>
          </div>
        </div>

        {/* Section 1: Objectives & Pedagogical Framework */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card: Behavioral Objectives */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold border-b border-slate-100 pb-2.5">
              <Target className="w-5 h-5 text-emerald-600" />
              <h4 className="text-sm font-bold">الأهداف السلوكية والإجرائية للحصة</h4>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed list-disc list-inside">
              <li>{periodDetails.mainAim}</li>
              <li>أن يربط الطالب مضامين الدرس بقيم الهوية الإيمانية والمسؤولية الأخلاقية والوطنية.</li>
              <li>أن يطبق الطالب المهارة المكتسبة بحل التدريب والنشاط بدقة وكفاءة.</li>
            </ul>
          </div>

          {/* Card: Selected Pedagogical Strategy & Verification */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-teal-800 font-bold border-b border-slate-100 pb-2.5">
              <GraduationCap className="w-5 h-5 text-teal-600" />
              <h4 className="text-sm font-bold">الاستراتيجية التدريسية ومؤشر التحقق</h4>
            </div>
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              <div>
                <span className="font-bold text-slate-900 block">الاستراتيجية المعتمدة:</span>
                <span className="text-emerald-700 font-semibold">{activeGoal.strategy}</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 block">مؤشر التحقق العملي:</span>
                <span className="text-slate-600">{activeGoal.verificationIndicator}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Detailed Teaching Steps (سير الحصة التعليمية) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base border-b border-slate-200 pb-2">
            <Clock className="w-5 h-5 text-amber-600" />
            <h4>خطوات تنفيذ الدرس وتوزيع زمن الحصة ({timingBreakdown.total})</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            {/* Step 1: Warmup */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-amber-700">
                <span>1. التهيئة الحافزة والمدخل</span>
                <span className="bg-amber-100 px-2 py-0.5 rounded-full">{timingBreakdown.warmup}</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                استثارة دافعية الطلاب بطرح سؤال استكشافي أو استحضار حدث يرتبط بموضوع الدرس («{unit.title}»)، وتذكيرهم بأهمية استشعار أهداف الحصة في سلوكهم اليومي.
              </p>
            </div>

            {/* Step 2: Main Activity */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>2. العرض والنشاط التفاعلي</span>
                <span className="bg-emerald-100 px-2 py-0.5 rounded-full">{timingBreakdown.activity}</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                تطبيق استراتيجية ({activeGoal.strategy})، وتكليف الطلاب بقراءة الشواهد، واستخراج القواعد أو المفردات في مجموعات عمل تعاونية ومناقشة الحلول على السبورة.
              </p>
            </div>

            {/* Step 3: Closure & Assessment */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-teal-700">
                <span>3. الغلق والتقويم الختامي</span>
                <span className="bg-teal-100 px-2 py-0.5 rounded-full">{timingBreakdown.closure}</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                طرح أسئلة تقويمية سريعة لقياس مدى تحقق الأهداف، وتلخيص الأفكار المركزية وتوجيه الطلاب للواجب المنزلي بالكتاب المدرسي.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Essential Textual & Linguistic Extract for this Lesson */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base border-b border-slate-200 pb-2">
            <FileText className="w-5 h-5 text-emerald-700" />
            <h4>المادة العلمية والشواهد المركزية للدرس (مرجع المعلم الفوري)</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Box A: Reading Text Sample or Grammar Rule */}
            <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200/80 space-y-2">
              <div className="font-bold text-xs text-emerald-900 flex items-center justify-between">
                <span>شاهد الدرس أو نص الفقرة المستهدفة:</span>
                <span className="text-[11px] text-emerald-700">الكتاب ص {periodDetails.sourcePage}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-amiri text-justify line-clamp-6">
                {readingLesson?.originalText?.slice(0, 420) || 'الشواهد والأمثلة المستخرجة متوفرة في قسم الاستخراج المعمق للوحدة.'}...
              </p>
            </div>

            {/* Box B: Selected Vocabulary Context Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 px-3 py-2 text-xs font-bold text-slate-800 border-b border-slate-200 flex items-center justify-between">
                <span>معجم المفردات المقررة للحصة:</span>
                <span className="text-[10px] text-slate-500">من جدول المفردات الرسمي</span>
              </div>
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="p-2">الكلمة</th>
                    <th className="p-2">المعنى في السياق</th>
                    <th className="p-2">المرادف / الضد</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(readingLesson?.vocabularyTable || []).slice(0, 3).map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="p-2 font-bold text-emerald-800">{item.word}</td>
                      <td className="p-2 text-slate-700">{item.contextMeaning}</td>
                      <td className="p-2 text-slate-500">{item.synonym || item.antonym || '-'}</td>
                    </tr>
                  ))}
                  {(!readingLesson?.vocabularyTable || readingLesson.vocabularyTable.length === 0) && (
                    <tr>
                      <td colSpan={3} className="p-3 text-center text-slate-400">
                        مفردات الوحدة مسجلة بالكامل في قسم الاستخراج المعمق.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 4: Differentiation, Homework & Final Reflection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Box 1: Applied Task */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>المهمة التطبيقية:</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {activeGoal.appliedTask}
            </p>
          </div>

          {/* Box 2: Differentiation & Remediation */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-teal-600" />
              <span>مراعاة الفروق الفردية:</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {activeGoal.differentiationAndSupport}
            </p>
          </div>

          {/* Box 3: Homework & Follow-up */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Bookmark className="w-4 h-4 text-amber-600" />
              <span>الواجب المنزلي والمتابعة:</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              حل تدريبات الكتاب المدرسي ص ({periodDetails.sourcePage})، وتدوين الفائدة اللغوية في كشكول المادة.
            </p>
          </div>
        </div>

        {/* Official Signatures Strip for Print */}
        <div className="pt-8 border-t-2 border-slate-300 flex justify-between items-center text-xs text-slate-700 font-bold px-4">
          <div>توقيع معلم المادة: .......................................</div>
          <div>توقيع الموجه الفني الزائر: .......................................</div>
          <div>توقيع وختم مدير المدرسة: .......................................</div>
        </div>

      </div>
    </div>
  );
};
