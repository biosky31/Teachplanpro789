import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  Filter, 
  CheckCircle2, 
  Award, 
  Printer, 
  BookOpen, 
  Sparkles,
  ChevronDown,
  Layers
} from 'lucide-react';
import { UNITS_EXTRACTED_DATA } from '../data/unitsDetailData';
import { QuestionItem, UnitData } from '../types/curriculum';

interface ExamQuestionBankViewProps {
  unitsData?: UnitData[];
}

export const ExamQuestionBankView: React.FC<ExamQuestionBankViewProps> = ({ unitsData }) => {
  const [selectedUnit, setSelectedUnit] = useState<number | 'all'>('all');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedAnswers, setExpandedAnswers] = useState<Record<string, boolean>>({});

  const data = unitsData && unitsData.length > 0 ? unitsData : UNITS_EXTRACTED_DATA;

  // Collect all questions from lessons, assessments, and beyond-the-lines questions
  const allQuestions: (QuestionItem & { unitTitle: string; unitId: number })[] = [];

  data.forEach(u => {
    // Collect from lessons exercises
    u.lessons.forEach(l => {
      (l.exercises || []).forEach(ex => {
        allQuestions.push({
          ...ex,
          unitTitle: u.title,
          unitId: u.id
        });
      });
    });

    // Collect from beyond the lines questions
    (u.beyondTheLinesQuestions || []).forEach((bq, bIdx) => {
      allQuestions.push({
        id: `beyond_${u.id}_${bIdx}`,
        question: bq.question,
        answer: bq.answerText,
        sourceType: 'deduced_extra',
        pageNumber: u.pageRange[0],
        skillType: 'inference',
        difficulty: bq.priority === 'high' ? 'advanced' : 'medium',
        priority: bq.priority === 'high' ? 'core' : 'important',
        unitTitle: u.title,
        unitId: u.id
      });
    });

    // Also collect from section8Discoveries if present
    (u.section8Discoveries || []).forEach((sq: any, sIdx: number) => {
      allQuestions.push({
        id: `sec8_${u.id}_${sIdx}`,
        question: sq.question,
        answer: sq.suggestedAnswer || sq.answerText || '',
        sourceType: 'deduced_extra',
        pageNumber: u.pageRange[0],
        skillType: 'inference',
        difficulty: 'advanced',
        priority: sq.priority === 'أساسي' ? 'core' : 'important',
        unitTitle: u.title,
        unitId: u.id
      });
    });
  });

  const filteredQuestions = allQuestions.filter(q => {
    const matchesUnit = selectedUnit === 'all' || q.unitId === selectedUnit;
    const matchesSkill = selectedSkill === 'all' || q.skillType === selectedSkill;
    const matchesDiff = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    const matchesSearch = 
      q.question.includes(searchTerm) || 
      q.answer.includes(searchTerm) ||
      q.unitTitle.includes(searchTerm);
    return matchesUnit && matchesSkill && matchesDiff && matchesSearch;
  });

  const toggleAnswer = (id: string) => {
    setExpandedAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="space-y-2 max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>بنك المراجعة والأسئلة الامتحانية الوزارية الشاملة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            بنك الأسئلة الشامل: نصوص، مفردات، نحو، إملاء، وإعراب
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            يضم أسئلة الكتاب الأصلي، أسئلة الشروح النحوية، نماذج الإعراب الكاملة، وتوقعات الأسئلة الاستنتاجية المصنفة وفق المستويات المعرفية الثلاثة (سهل، متوسط، متقدم) ونوع المهارة ومستوى الأولوية.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3 no-print">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Unit Filter */}
          <div>
            <label className="block text-slate-500 mb-1 font-semibold">تصفية حسب الوحدة:</label>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="all">جميع الوحدات الدراسية</option>
              {data.map(u => (
                <option key={u.id} value={u.id}>
                  {u.unitNumberArabic}: {u.title}
                </option>
              ))}
            </select>
          </div>

          {/* Skill Filter */}
          <div>
            <label className="block text-slate-500 mb-1 font-semibold">نوع المهارة:</label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="all">جميع المهارات</option>
              <option value="direct">فهم مباشر وتعداد</option>
              <option value="inference">استنتاج وتفسير</option>
              <option value="parsing">إعراب وتطبيق نحوي</option>
              <option value="application">تطبيق وإكمال فراغ</option>
              <option value="correction">تصويب أخطاء</option>
              <option value="comparison">مقارنات نحوية وإملائية</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-slate-500 mb-1 font-semibold">مستوى الصعوبة:</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="all">كافة المستويات</option>
              <option value="easy">سهل (تذكر ومباشر)</option>
              <option value="medium">متوسط (تطبيق وفهم)</option>
              <option value="advanced">متقدم (تحليل وإعراب عميق)</option>
            </select>
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-slate-500 mb-1 font-semibold">بحث سريع:</label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحث في نص السؤال أو الإجابة..."
                className="w-full pr-9 pl-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <span>نتائج البحث المصفاة: <strong className="text-slate-800">{filteredQuestions.length}</strong> سؤالاً مع إجابتها النموذجية</span>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 text-emerald-800 hover:text-emerald-900 font-bold"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>طباعة الورقة الامتحانية</span>
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.map((q, idx) => {
          const isExpanded = expandedAnswers[q.id] ?? true; // default open
          return (
            <div
              key={q.id || idx}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-sm transition-all space-y-3 text-xs"
            >
              {/* Question Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm leading-relaxed">
                      {q.question}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {q.unitTitle} • صفحة الكتاب: ص {q.pageNumber}
                    </span>
                  </div>
                </div>

                {/* Metadata Pills */}
                <div className="flex flex-wrap items-center gap-1.5 shrink-0 self-start">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    q.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-800' :
                    q.difficulty === 'medium' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {q.difficulty === 'easy' ? 'سهل' : q.difficulty === 'medium' ? 'متوسط' : 'متقدم'}
                  </span>
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                    {q.skillType === 'parsing' ? 'إعراب' : 
                     q.skillType === 'direct' ? 'مباشر' : 
                     q.skillType === 'inference' ? 'استنتاج' : 
                     q.skillType === 'correction' ? 'تصويب' : 'تطبيق'}
                  </span>
                  {q.sourceType === 'deduced_extra' && (
                    <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-[10px] font-bold">
                      استنتاجي خارج الدرس
                    </span>
                  )}
                </div>
              </div>

              {/* Model Answer Toggle & Body */}
              <div className="pt-2 border-t border-slate-100">
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 text-emerald-950 font-amiri text-base leading-relaxed">
                  <div className="flex items-center justify-between text-xs font-sans font-bold text-emerald-800 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>الإجابة النموذجية والدليل المعتمد:</span>
                    </span>
                  </div>
                  <div className="whitespace-pre-line text-slate-800">
                    {q.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
