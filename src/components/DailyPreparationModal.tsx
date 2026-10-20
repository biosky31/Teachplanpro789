import React, { useState } from 'react';
import { 
  X, 
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
  Bookmark
} from 'lucide-react';
import { UNITS_EXTRACTED_DATA } from '../data/unitsDetailData';
import { YEMEN_OFFICIAL_CALENDAR_1447_1448 } from '../data/officialCalendar';
import { PEDAGOGICAL_GOALS_LIST, PedagogicalGoalItem } from '../data/pedagogicalGoalsBank';
import { UnitData, GradeConfig } from '../types/curriculum';

interface DailyPreparationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialUnitId?: number;
  initialWeek?: number;
  initialPeriod?: number;
  unitsData?: UnitData[];
  activeGradeConfig?: GradeConfig;
}

export const DailyPreparationModal: React.FC<DailyPreparationModalProps> = ({
  isOpen,
  onClose,
  initialUnitId,
  initialWeek = 1,
  initialPeriod = 1,
  unitsData,
  activeGradeConfig
}) => {
  if (!isOpen) return null;

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

  const unit = data.find(u => u.id === selectedUnitId) || data[0];
  const readingLesson = unit.lessons.find(l => l.branch === 'texts' || l.branch === 'reading');
  const grammarLesson = unit.lessons.find(l => l.branch === 'grammar');
  const dictationLesson = unit.lessons.find(l => l.branch === 'dictation');

  const isSemester2 = activeGradeConfig?.partNumber === 2;
  const dateList = isSemester2 
    ? (YEMEN_OFFICIAL_CALENDAR_1447_1448.weekDatesMappingS2 || [])
    : YEMEN_OFFICIAL_CALENDAR_1447_1448.weekDatesMappingS1;

  // Get matching week date from official calendar
  const weekMapping = dateList.find(w => w.weekNumber === (isSemester2 ? unit.id - 12 : unit.id)) || 
                      dateList[0] || 
                      YEMEN_OFFICIAL_CALENDAR_1447_1448.weekDatesMappingS1[0];

  // Selected pedagogical goal details
  const activeGoal = PEDAGOGICAL_GOALS_LIST.find(g => g.code === selectedGoalCode) || PEDAGOGICAL_GOALS_LIST[0];

  const handleCopy = () => {
    const textToCopy = `خطة التحضير اليومي النموذجي لمادة لغتي العربية
المدرسة: ${schoolName}
المعلم / المعدّ: ${teacherName}
البريد الإلكتروني: ${teacherEmail}
الصف: ${activeGradeConfig ? activeGradeConfig.title : 'الصف التاسع الأساسي'}
الوحدة: ${unit.unitNumberArabic} - ${unit.title}
التاريخ الهجري الرسمي: ${weekMapping.startDaySaturdayHijri} (الموافق: ${weekMapping.startDaySaturdayMiladi})
الهدف الأساسي [${activeGoal.code}]: ${activeGoal.statement}
الاستراتيجية المعتمدة: ${activeGoal.strategy}
مؤشر التحقق: ${activeGoal.verificationIndicator}
المهمة التطبيقية: ${activeGoal.appliedTask}
التمايز والدعم: ${activeGoal.differentiationAndSupport}`;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-5xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[96vh]">
        {/* Modal Header - Low-Profile */}
        <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between shrink-0 no-print border-b border-emerald-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-900 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold">مساعد التحضير اليومي والقراءة المباشرة</h3>
                <span className="bg-emerald-800 text-emerald-200 text-[10px] px-2 py-0.2 rounded-full font-bold">
                  التقويم الوزاري 1447/1448هـ
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs font-semibold flex items-center gap-1 transition-colors"
              title="نسخ الخطة"
            >
              <Copy className="w-3.5 h-3.5 text-amber-300" />
              <span>{isCopied ? 'تم النسخ' : 'نسخ'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-white text-xs font-semibold flex items-center gap-1 transition-colors"
              title="طباعة كراس التحضير"
            >
              <Printer className="w-3.5 h-3.5 text-amber-300" />
              <span>طباعة</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Controls Strip - Sleek and compact */}
        <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs shrink-0 no-print">
          <div>
            <label className="block text-slate-500 font-bold mb-0.5">الوحدة المقررة:</label>
            <select
              value={selectedUnitId}
              onChange={(e) => setSelectedUnitId(Number(e.target.value))}
              className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1 font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            >
              {data.map(u => (
                <option key={u.id} value={u.id}>
                  {u.unitNumberArabic}: {u.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-500 font-bold mb-1">يوم الحصة ورقمها:</label>
            <div className="flex items-center gap-1.5">
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-2/3 bg-white border border-slate-300 rounded-xl px-2 py-1.5 font-semibold text-slate-800"
              >
                <option value="السبت">السبت (حصة 1)</option>
                <option value="الأحد">الأحد (حصة 2)</option>
                <option value="الإثنين">الإثنين (حصة 3)</option>
                <option value="الثلاثاء">الثلاثاء (حصة 4 / 5)</option>
                <option value="الأربعاء">الأربعاء (حصة 6)</option>
              </select>
              <select
                value={selectedPeriodNum}
                onChange={(e) => setSelectedPeriodNum(Number(e.target.value))}
                className="w-1/3 bg-white border border-slate-300 rounded-xl px-2 py-1.5 font-semibold text-slate-800 text-center"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>حصة {num}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-500 font-bold mb-1">الهدف والاستراتيجية المعتمدة:</label>
            <select
              value={selectedGoalCode}
              onChange={(e) => setSelectedGoalCode(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 font-semibold text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 truncate"
            >
              {PEDAGOGICAL_GOALS_LIST.map(g => (
                <option key={g.id} value={g.code}>
                  [{g.code}] {g.domain}: {g.strategy}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-500 font-bold mb-1">بيانات المعلم والمدرسة:</label>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  placeholder="اسم المعلم / المعدّ"
                  className="w-1/2 bg-white border border-slate-300 px-2 py-1 rounded-lg text-xs"
                />
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="اسم المدرسة"
                  className="w-1/2 bg-white border border-slate-300 px-2 py-1 rounded-lg text-xs"
                />
              </div>
              <input
                type="email"
                value={teacherEmail}
                onChange={(e) => setTeacherEmail(e.target.value)}
                placeholder="البريد الإلكتروني (المعدّ)"
                className="w-full bg-white border border-slate-300 px-2 py-1 rounded-lg text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Printable Lesson Plan Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-900 bg-white">
          {/* Official Ministry Header in Print */}
          <div className="border-b-2 border-slate-800 pb-4 text-center space-y-1">
            <div className="text-xs font-bold text-slate-600">
              الجمهورية اليمنية • وزارة التربية والتعليم والبحث العلمي • قطاع المناهج والتوجيه
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 font-amiri">
              كراس التحضير اليومي النموذجي لمادة لغتي العربية
            </h2>
            <div className="flex flex-wrap justify-between items-center text-xs text-slate-700 pt-2 px-2 font-semibold">
              <span>المدرسة: {schoolName}</span>
              <span>الصف: {activeGradeConfig ? activeGradeConfig.title : 'الصف التاسع الأساسي'}</span>
              <span>المعلم / المعدّ: {teacherName} (<span className="font-mono text-emerald-800">{teacherEmail}</span>)</span>
              <span className="text-emerald-800 font-bold">
                تاريخ الأسبوع بالتقويم الوزاري: {weekMapping.startDaySaturdayHijri} ({weekMapping.startDaySaturdayMiladi})
              </span>
            </div>
          </div>

          {/* Lesson Metadata Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-300">
            <table className="w-full text-center text-xs divide-y divide-slate-200">
              <thead className="bg-slate-100 font-bold text-slate-800">
                <tr>
                  <th className="p-2.5">الوحدة</th>
                  <th className="p-2.5">اليوم والحصة</th>
                  <th className="p-2.5">الفرع التعليمي</th>
                  <th className="p-2.5">عنوان الدرس</th>
                  <th className="p-2.5">نطاق الصفحات</th>
                  <th className="p-2.5">رمز الهدف الوزاري</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-semibold text-slate-900">
                <tr>
                  <td className="p-2.5 bg-slate-50">{unit.unitNumberArabic}</td>
                  <td className="p-2.5 text-emerald-800">{selectedDay} (حصة {selectedPeriodNum})</td>
                  <td className="p-2.5">{activeGoal.domain}</td>
                  <td className="p-2.5 text-slate-900">{readingLesson?.title || unit.title}</td>
                  <td className="p-2.5">ص {unit.pageRange[0]} - {unit.pageRange[1]}</td>
                  <td className="p-2.5 font-mono text-emerald-700 font-bold">{activeGoal.code}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 1: Themes & Motivational Setup */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-3 text-xs">
            <h4 className="font-bold text-emerald-800 text-sm flex items-center gap-2 border-b border-slate-200 pb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>أولاً: الفكرة العامة والتهيئة الحافزة (المدخل التمهيدي)</span>
            </h4>
            <div className="space-y-2 text-slate-700">
              <p className="leading-relaxed">
                <strong className="text-slate-900">الموضوع المحوري للوحدة: </strong>
                {unit.theme}
              </p>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <strong className="text-emerald-900 block mb-1">التهيئة الحافزة المقترحة (5 دقائق):</strong>
                <p className="leading-relaxed">
                  طرح سؤال مثير للتفكير مرتبط بالواقع الإيماني والوطني، واستدعاء خبرات الطلاب السابقة، وعرض الشاهد المحوري من الكتاب المدرسي لإثارة الفضول العلمي وربط المتعلم بهويته ولغته.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Behavioral Objectives & Verified Indicators */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-white space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>ثانياً: الأهداف السلوكية الإجرائية (مربوطة ببنك الأهداف والاستراتيجيات المتدرج)</span>
              </h4>
              <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                مستوى الصف 7: تأسيس
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100 space-y-1">
                <span className="font-bold text-blue-900 block text-xs">1. الهدف المعرفي المستهدف:</span>
                <p className="text-slate-800 font-semibold leading-relaxed">
                  {activeGoal.statement}
                </p>
                <div className="text-[11px] text-slate-600 pt-1 border-t border-blue-100">
                  <strong>مؤشر التحقق: </strong>{activeGoal.verificationIndicator}
                </div>
              </div>

              <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 space-y-1">
                <span className="font-bold text-emerald-900 block text-xs">2. الهدف المهاري التطبيقي:</span>
                <p className="text-slate-800 font-semibold leading-relaxed">
                  أن يطبق الطالب مهارة ({activeGoal.subSkill}) في أمثلة ونصوص جديدة بنجاح.
                </p>
                <div className="text-[11px] text-slate-600 pt-1 border-t border-emerald-100">
                  <strong>دليل التعلم: </strong>{activeGoal.learningEvidence}
                </div>
              </div>

              <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-100 space-y-1">
                <span className="font-bold text-amber-900 block text-xs">3. الهدف الوجداني القيمي:</span>
                <p className="text-slate-800 font-semibold leading-relaxed">
                  أن يتمثل الطالب القيم الإيمانية والوطنية الواردة في موضوع الوحدة ({unit.title}).
                </p>
                <div className="text-[11px] text-slate-600 pt-1 border-t border-amber-100">
                  <strong>مؤشر التحقق: </strong>المشاركة الفاعلة وحسن الاستماع والاعتزاز بالعربية.
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Teaching Strategy, Aids, & Applied Task */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-2">
              <span className="font-bold text-slate-900 block text-sm">
                ثالثاً: الاستراتيجية والمهمة التطبيقية المعتمدة:
              </span>
              <div className="space-y-1.5 text-slate-700">
                <div>
                  <strong className="text-emerald-900">الاستراتيجية التدريسية: </strong>
                  <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold">
                    {activeGoal.strategy}
                  </span>
                </div>
                <div>
                  <strong className="text-slate-800 block mb-0.5">المهمة التطبيقية الصفية:</strong>
                  <p className="bg-white p-2.5 rounded-lg border border-slate-200 leading-relaxed">
                    {activeGoal.appliedTask}
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-2">
              <span className="font-bold text-slate-900 block text-sm">
                رابعاً: التمايز والدعم والوسائل التعليمية:
              </span>
              <div className="space-y-1.5 text-slate-700">
                <div>
                  <strong className="text-slate-800 block mb-0.5">خطة التمايز والدعم:</strong>
                  <p className="bg-white p-2.5 rounded-lg border border-slate-200 leading-relaxed">
                    {activeGoal.differentiationAndSupport}
                  </p>
                </div>
                <div>
                  <strong className="text-slate-800">الوسائل ومصادر التعلم: </strong>
                  <span>الكتاب المدرسي (ص {unit.pageRange[0]}-{unit.pageRange[1]})، السبورة، بطاقات الكلمات، والكراسة.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Classroom Procedure Steps */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-white space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">
              خامساً: سير التدريس وإجراءات الأنشطة الصفية (30 دقيقة)
            </h4>
            <div className="space-y-2 text-slate-700 leading-relaxed">
              <p>
                <strong>1. العرض والنمذجة: </strong>
                نمذجة المعلم للمهارة المستهدفة بالاستراتيجية المقررة ({activeGoal.strategy})، وتقديم مثال توضيحي محلول أمام الطلاب.
              </p>
              <p>
                <strong>2. الممارسة الموجهة: </strong>
                إشراك الطلاب في استخراج الشواهد وحل التدريبات اللغوية والنحوية في مجموعات ثنائية أو تعاونية مع التوجيه والتغذية الراجعة.
              </p>
              <p>
                <strong>3. الممارسة المستقلة: </strong>
                تكليف كل طالب بحل تدريب فردي في كراسته لقياس تحقق الهدف وإتقان المهارة.
              </p>
            </div>
          </div>

          {/* Section 5: Evaluation & Homework */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="border border-slate-200 rounded-2xl p-4 bg-emerald-50/40 space-y-2">
              <span className="font-bold text-emerald-950 block text-sm">سادساً: أساليب التقويم:</span>
              <ul className="space-y-1 text-slate-800 pr-2">
                <li>• <strong>تقويم تكويني: </strong> أسئلة شفهية وتغذية راجعة فورية أثناء تطبيق الاستراتيجية.</li>
                <li>• <strong>تقويم ختامي: </strong> حل مسألة أو إعراب جملة أو استخراج ظاهرة من تقويم الوحدة ص {unit.pageRange[1]}.</li>
              </ul>
            </div>

            <div className="border border-slate-200 rounded-2xl p-4 bg-amber-50/40 space-y-2">
              <span className="font-bold text-amber-950 block text-sm">سابعاً: الواجب المنزلي والتأمل الذاتي:</span>
              <ul className="space-y-1 text-slate-800 pr-2">
                <li>• <strong>التكليف المنزلي: </strong> كتابة فقرة تطبيقة أو حفظ الشاهد في كراسة الواجب.</li>
                <li>• <strong>التأمل الذاتي للمعلم: </strong> قياس نسبة الإتقان وتدوين التعديلات للحصة القادمة.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex items-center justify-between shrink-0 no-print">
          <div className="text-xs text-slate-500">
            نموذج كراس التحضير متكامل مع التقويم المدرسي الوزاري والبنك التربوي للأهداف.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{isCopied ? 'تم النسخ!' : 'نسخ الخطة'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة كراس التحضير الرسمي</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
