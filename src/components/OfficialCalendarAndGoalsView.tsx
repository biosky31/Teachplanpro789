import React, { useState } from 'react';
import { 
  Calendar, 
  CalendarDays, 
  Award, 
  Compass, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  Printer, 
  BookOpen, 
  FileCheck, 
  Filter,
  AlertTriangle
} from 'lucide-react';
import { YEMEN_OFFICIAL_CALENDAR_1447_1448 } from '../data/officialCalendar';
import { 
  PEDAGOGICAL_GOALS_LIST, 
  PEDAGOGICAL_GOALS_BANK_TITLE, 
  PROGRESSION_LADDER_PRINCIPLES 
} from '../data/pedagogicalGoalsBank';

export const OfficialCalendarAndGoalsView: React.FC = () => {
  const [subSection, setSubSection] = useState<'calendar' | 'goals_bank'>('calendar');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [goalSearch, setGoalSearch] = useState('');

  const cal = YEMEN_OFFICIAL_CALENDAR_1447_1448;

  const filteredGoals = PEDAGOGICAL_GOALS_LIST.filter(g => {
    const matchesDomain = selectedDomain === 'all' || g.domain === selectedDomain;
    const matchesSearch = 
      g.statement.includes(goalSearch) ||
      g.strategy.includes(goalSearch) ||
      g.code.includes(goalSearch) ||
      g.subSkill.includes(goalSearch);
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="space-y-2 max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>المرجعية التربوية والتنظيمية الرسمية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            التقويم المدرسي الوزاري 1447/1448هـ وبنك الأهداف والاستراتيجيات
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            القرار الوزاري للتقويم المدرسي الصادر عن وزارة التربية والتعليم والبحث العلمي (2026/2027م) ومصفوفة الأهداف السلوكية والاستراتيجيات التدريسية المتدرجة للصفوف (7 - 9).
          </p>
        </div>
      </div>

      {/* Sub-section Switcher */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-2 text-xs font-bold no-print">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSubSection('calendar')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              subSection === 'calendar'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-emerald-800'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>القرار الوزاري للتقويم المدرسي (1447/1448هـ)</span>
          </button>

          <button
            onClick={() => setSubSection('goals_bank')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              subSection === 'goals_bank'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-blue-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>بنك الأهداف والاستراتيجيات المتدرجة (صفوف 7-9)</span>
          </button>
        </div>

        <button
          onClick={() => window.print()}
          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
        >
          <Printer className="w-4 h-4 text-slate-600" />
          <span>طباعة الوثيقة</span>
        </button>
      </div>

      {/* 1. Official Calendar Section */}
      {subSection === 'calendar' && (
        <div className="space-y-6">
          {/* Ministerial Decree Box */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-700 block">وثيقة رسمية معتمدة</span>
                <h3 className="text-xl font-bold text-slate-900">
                  قرار وزير التربية والتعليم والبحث العلمي بشأن التقويم المدرسي للسنة الدراسية {cal.academicYearHijri} ({cal.academicYearMiladi})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  تاريخ القرار: {cal.decreeDateHijri} الموافق {cal.decreeDateMiladi} • الوزير: {cal.ministerName}
                </p>
              </div>

              <div className="text-center bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-2xl shrink-0">
                <span className="text-xs text-emerald-800 block font-semibold">إجمالي أيام السنة الدراسية</span>
                <span className="text-2xl font-black text-emerald-900">{cal.totalStudyDaysYear} يوماً</span>
              </div>
            </div>

            {/* Articles 1 & 2 Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">1</span>
                  <span>مادة (1): الفصل الدراسي الأول</span>
                </div>
                <div className="space-y-1 text-slate-700">
                  <div className="flex justify-between py-0.5 border-b border-slate-100">
                    <span className="text-slate-500">أيام الدراسة الفعلية:</span>
                    <span className="font-bold text-slate-900">{cal.semester1.actualStudyDays} يوماً</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-100">
                    <span className="text-slate-500">أيام اختبارات النقل:</span>
                    <span className="font-bold text-slate-900">{cal.semester1.finalExamsDays} أيام</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-100">
                    <span className="text-slate-500">إجمالي الأيام الفعلية:</span>
                    <span className="font-bold text-emerald-700">{cal.semester1.totalActualDays} يوماً (15 أسبوعاً)</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-500">بداية ونهاية الفصل الأول:</span>
                    <span className="font-semibold">{cal.semester1.startDateHijri} إلى {cal.semester1.endDateHijri}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px]">2</span>
                  <span>مادة (2): الأسبوع الدراسي وتوزيع الحصص</span>
                </div>
                <div className="space-y-2 text-slate-700">
                  <p className="bg-white p-2.5 rounded-lg border border-slate-200 font-semibold text-emerald-900">
                    {cal.semester1.weeklyDaysDescription}
                  </p>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    تتوزع حصص اللغة العربية الست على أيام الأسبوع الخمسة بمعدل حصة يومياً مع حصتين في يوم الثلاثاء وفق توزيع الخطة المنهجية المعتمدة.
                  </p>
                </div>
              </div>
            </div>

            {/* Official Events Timeline Table */}
            <div className="pt-2">
              <h4 className="font-bold text-slate-900 text-sm mb-3">
                جدول المواعيد الزمنية لفعاليات العام الدراسي والاختبارات (مادة 3):
              </h4>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-right text-xs divide-y divide-slate-200">
                  <thead className="bg-slate-100 font-bold text-slate-700">
                    <tr>
                      <th className="p-3 w-12 text-center">م</th>
                      <th className="p-3">فعاليات التقويم المدرسي</th>
                      <th className="p-3 w-24">اليوم</th>
                      <th className="p-3 w-40">التاريخ الهجري</th>
                      <th className="p-3 w-40">التاريخ الميلادي</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {cal.events.map((ev) => (
                      <tr key={ev.eventNumber} className="hover:bg-emerald-50/30 transition-colors">
                        <td className="p-3 text-center font-bold text-slate-500">{ev.eventNumber}</td>
                        <td className="p-3 font-semibold text-slate-900">{ev.title}</td>
                        <td className="p-3 text-emerald-800 font-bold">{ev.dayName}</td>
                        <td className="p-3 text-slate-700 font-medium">{ev.hijriDate}</td>
                        <td className="p-3 text-slate-600">{ev.miladiDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 15 Weeks Official Date Mapping */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="font-bold text-slate-900 text-base">
                  خريطة التواريخ الرسمية لأسابيع الفصل الدراسي الأول الـ 15
                </h4>
                <p className="text-xs text-slate-500">
                  تطابق موعد بداية كل أسبوع بالسبت وانتهائه بالأربعاء بالتقويمين الهجري والميلادي
                </p>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
                5 محرم - 17 ربيع الآخر 1448هـ
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {cal.weekDatesMappingS1.map((w) => (
                <div
                  key={w.weekNumber}
                  className={`p-3.5 rounded-xl border transition-all ${
                    w.isReviewWeek
                      ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold border-b border-black/5 pb-1.5 mb-1.5">
                    <span className="text-sm">الأسبوع {w.weekNumber}</span>
                    {w.isReviewWeek ? (
                      <span className="bg-amber-200 text-amber-900 text-[10px] px-2 py-0.5 rounded-full">مراجعة وامتحان</span>
                    ) : (
                      <span className="text-slate-500 text-[11px] font-normal">دراسة فعلية</span>
                    )}
                  </div>
                  <div className="text-[11px] space-y-0.5 text-slate-600">
                    <div>
                      <strong className="text-slate-800">الهجري: </strong>
                      <span>{w.startDaySaturdayHijri} ← {w.endDayWednesdayHijri}</span>
                    </div>
                    <div>
                      <strong className="text-slate-800">الميلادي: </strong>
                      <span>{w.startDaySaturdayMiladi} ← {w.endDayWednesdayMiladi}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. Pedagogical Goals Bank Section */}
      {subSection === 'goals_bank' && (
        <div className="space-y-6">
          {/* Progression Ladder Principles Card */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-blue-900 font-bold">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold">{PEDAGOGICAL_GOALS_BANK_TITLE}</h3>
            </div>
            <p className="text-xs text-blue-950 leading-relaxed">
              <strong>مبدأ التدرج العمري والمعرفي للصفوف (7 - 9):</strong>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-3.5 rounded-xl border border-blue-200">
                <span className="font-bold text-emerald-800 block mb-1">الصف السابع (تأسيس):</span>
                <p className="text-slate-700 leading-relaxed">{PROGRESSION_LADDER_PRINCIPLES['7']}</p>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-blue-200">
                <span className="font-bold text-blue-800 block mb-1">الصف الثامن (توسّع):</span>
                <p className="text-slate-700 leading-relaxed">{PROGRESSION_LADDER_PRINCIPLES['8']}</p>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-blue-200">
                <span className="font-bold text-purple-800 block mb-1">الصف التاسع (استقلال):</span>
                <p className="text-slate-700 leading-relaxed">{PROGRESSION_LADDER_PRINCIPLES['9']}</p>
              </div>
            </div>
          </div>

          {/* Goals Filter & Search */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-bold text-slate-700">المجال:</span>
              {['all', 'القراءة', 'النصوص', 'النحو', 'الإملاء', 'الخط', 'التعبير'].map((dom) => (
                <button
                  key={dom}
                  onClick={() => setSelectedDomain(dom)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    selectedDomain === dom
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {dom === 'all' ? 'جميع المجالات' : dom}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={goalSearch}
                onChange={(e) => setGoalSearch(e.target.value)}
                placeholder="ابحث بالرمز، الاستراتيجية، أو الهدف..."
                className="w-full pr-9 pl-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          {/* Goals Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGoals.map((g) => (
              <div
                key={g.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-shadow space-y-3 text-xs flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-800 text-white font-mono font-bold text-[11px] px-2 py-0.5 rounded">
                        {g.code}
                      </span>
                      <span className="font-bold text-slate-900 text-sm">{g.domain} - {g.subSkill}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      g.goalType === 'معرفي' ? 'bg-blue-100 text-blue-800' :
                      g.goalType === 'مهاري' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {g.goalType}
                    </span>
                  </div>

                  <p className="font-semibold text-slate-900 text-sm leading-relaxed">
                    {g.statement}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <strong className="text-slate-700 block">الاستراتيجية المعتمدة:</strong>
                      <span className="text-emerald-800 font-bold">{g.strategy}</span>
                    </div>
                    <div>
                      <strong className="text-slate-700 block">مؤشر التحقق:</strong>
                      <span className="text-slate-600">{g.verificationIndicator}</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-[11px] pt-1">
                    <div>
                      <strong className="text-slate-700">المهمة التطبيقية: </strong>
                      <span className="text-slate-600 leading-normal">{g.appliedTask}</span>
                    </div>
                    <div>
                      <strong className="text-slate-700">التمايز والدعم: </strong>
                      <span className="text-slate-600 leading-normal">{g.differentiationAndSupport}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                  <span>الوسيلة: {g.tool}</span>
                  <span>دليل التعلم: {g.learningEvidence}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
