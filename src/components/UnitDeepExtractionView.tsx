import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  Lightbulb, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  BookMarked,
  FileText,
  Bookmark,
  Share2,
  Printer,
  Compass,
  FileCheck
} from 'lucide-react';
import { UNITS_EXTRACTED_DATA } from '../data/unitsDetailData';
import { UnitData } from '../types/curriculum';

interface UnitDeepExtractionViewProps {
  selectedUnitId: number;
  onSelectUnitId: (id: number) => void;
  onOpenPreparationModal: (unitId: number) => void;
  unitsData?: UnitData[];
}

export const UnitDeepExtractionView: React.FC<UnitDeepExtractionViewProps> = ({
  selectedUnitId,
  onSelectUnitId,
  onOpenPreparationModal,
  unitsData
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'text_and_vocab' | 'grammar' | 'dictation' | 'eval_and_exercises' | 'section8_beyond'>('text_and_vocab');

  const data = unitsData && unitsData.length > 0 ? unitsData : UNITS_EXTRACTED_DATA;
  const unit = data.find(u => u.id === selectedUnitId) || data[0];
  const readingLesson = unit?.lessons.find(l => l.branch === 'texts' || l.branch === 'reading');
  const grammarLesson = unit?.lessons.find(l => l.branch === 'grammar');
  const dictationLesson = unit?.lessons.find(l => l.branch === 'dictation');
  const assessmentLesson = unit?.lessons.find(l => l.branch === 'assessment');

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Unit Selector Strip */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between gap-3 overflow-x-auto no-print">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          {data.map((u) => (
            <button
              key={u.id}
              onClick={() => {
                onSelectUnitId(u.id);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                u.id === unit.id
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20 ring-1 ring-emerald-600'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-emerald-700'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-[10px]">
                {u.id}
              </span>
              <span>{u.title}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => onOpenPreparationModal(unit.id)}
          className="shrink-0 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <BookMarked className="w-4 h-4" />
          <span>تحضير دروس الوحدة</span>
        </button>
      </div>

      {/* Selected Unit Main Banner */}
      <div className="bg-gradient-to-l from-emerald-800 via-teal-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-200 mb-1">
              <span className="bg-emerald-600/80 px-2 py-0.5 rounded font-bold">{unit.unitNumberArabic}</span>
              <span>•</span>
              <span>نطاق الصفحات: ص {unit.pageRange[0]} إلى ص {unit.pageRange[1]}</span>
              {unit.weeklyPlacement?.description && (
                <>
                  <span>•</span>
                  <span className="text-amber-300 font-semibold">{unit.weeklyPlacement.description}</span>
                </>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-amiri">
              {unit.title}
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm mt-1.5 max-w-3xl leading-relaxed">
              الموضوع المحوري: {unit.theme}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="bg-white/10 text-emerald-100 px-3 py-1.5 rounded-xl text-xs border border-white/10 font-bold">
              استخراج كامل ومفصل
            </span>
          </div>
        </div>
      </div>

      {/* Unit Sub-tabs Navigation */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-2 text-xs font-bold no-print">
        <button
          onClick={() => setActiveSubTab('text_and_vocab')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeSubTab === 'text_and_vocab'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-emerald-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>1. النص القرائي والشرح والمفردات</span>
        </button>

        <button
          onClick={() => setActiveSubTab('grammar')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeSubTab === 'grammar'
              ? 'bg-blue-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-blue-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>2. النحو والتفاصيل غير المذكورة بالخلاصة</span>
        </button>

        <button
          onClick={() => setActiveSubTab('dictation')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeSubTab === 'dictation'
              ? 'bg-purple-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-purple-800'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>3. الإملاء والمقارنات وضوابط الرسم</span>
        </button>

        <button
          onClick={() => setActiveSubTab('eval_and_exercises')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeSubTab === 'eval_and_exercises'
              ? 'bg-teal-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-teal-800'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>4. حل تقويم الوحدة والأنشطة بإجابات نموذجية</span>
        </button>

        <button
          onClick={() => setActiveSubTab('section8_beyond')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeSubTab === 'section8_beyond'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-amber-800'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span>5. أسئلة مهمة لا توجد إجابتها بالدروس (البند 8)</span>
        </button>
      </div>

      {/* SubTab 1: Original Text & Complete Sequenced Extraction */}
      {activeSubTab === 'text_and_vocab' && readingLesson && (
        <div className="space-y-6">
          {/* Original Text Block */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 block">
                  النص الأصلي الكامل كما ورد في الكتاب ({readingLesson.startPage && readingLesson.endPage ? `ص ${readingLesson.startPage} - ${readingLesson.endPage}` : `ص ${readingLesson.page || unit.pageRange[0]}`})
                </span>
                <h3 className="text-xl font-bold text-slate-900">{readingLesson.title}</h3>
              </div>
              {(readingLesson.authorName || readingLesson.author) && (
                <div className="text-left bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
                  <span className="text-slate-500">المؤلف / المصدر: </span>
                  <span className="font-bold text-slate-800">{readingLesson.authorName || readingLesson.author}</span>
                </div>
              )}
            </div>

            {readingLesson.authorInfo && (
              <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-100 text-xs text-emerald-950">
                <span className="font-bold text-emerald-800 block mb-0.5">التعريف بالمؤلف وسياق النص:</span>
                <p className="leading-relaxed">{readingLesson.authorInfo}</p>
              </div>
            )}

            {/* Pristine Full Text Display */}
            {readingLesson.originalText && (
              <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200/80">
                <pre className="font-amiri text-lg sm:text-xl text-slate-800 leading-loose whitespace-pre-wrap font-medium">
                  {readingLesson.originalText}
                </pre>
              </div>
            )}
          </div>

          {/* General Idea and Sequenced Detailed Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-3">
              <h4 className="font-bold text-emerald-800 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
                <Bookmark className="w-4 h-4 text-emerald-600" />
                <span>الفكرة العامة للنص</span>
              </h4>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                {readingLesson.generalIdea || 'استخلاص وتحليل القيم والأفكار الواردة في النص القرائي المقبول.'}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>الأفكار الجزئية مرتبة بتسلسل الشرح</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {(readingLesson.detailedPoints || readingLesson.subIdeas || []).map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Vocabulary and Expressions Table */}
          {((readingLesson.vocabulary && readingLesson.vocabulary.length > 0) || 
            (readingLesson.vocabularyTable && readingLesson.vocabularyTable.length > 0)) && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">المفردات والتراكيب في السياق (معجم الوحدة)</h4>
                  <p className="text-xs text-slate-500">معنى الكلمة في السياق، المرادف المحتمل، الضد، وملاحظات الاستعمال</p>
                </div>
                <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                  {(readingLesson.vocabulary?.length || readingLesson.vocabularyTable?.length || 0)} مفردات مستخرجة
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3 w-1/5">الكلمة أو التعبير</th>
                      <th className="p-3 w-2/5">المعنى في السياق</th>
                      <th className="p-3 w-1/5">المرادف المحتمل</th>
                      <th className="p-3 w-1/5">الضد المحتمل</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {(readingLesson.vocabulary || (readingLesson.vocabularyTable || []).map((v: any) => ({
                      word: v.word,
                      contextMeaning: v.contextMeaning,
                      synonym: v.synonym,
                      antonym: v.antonym,
                      isFromText: true
                    }))).map((voc, idx) => (
                      <tr key={idx} className="hover:bg-emerald-50/30 transition-colors">
                        <td className="p-3 font-bold text-emerald-900 flex items-center gap-2">
                          <span>{voc.word}</span>
                          {voc.isFromText && (
                            <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">
                              ورد بالكتاب
                            </span>
                          )}
                        </td>
                        <td className="p-3 leading-relaxed">{voc.contextMeaning}</td>
                        <td className="p-3 text-slate-600">{voc.synonym || '—'}</td>
                        <td className="p-3 text-slate-600">{voc.antonym || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Comprehension Questions with Model Answers */}
          {(readingLesson.comprehensionQuestions || []).length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <h4 className="font-bold text-slate-900 text-base">أسئلة الفهم والاستيعاب والشواهد (حلول نموذجية)</h4>
                <p className="text-xs text-slate-500">إجابات دقيقة ومفصلة مستندة مباشرة لنص وشرح الكتاب المدرسي</p>
              </div>
              <div className="space-y-3">
                {readingLesson.comprehensionQuestions?.map((cq: any, idx: number) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">س{idx + 1}: {cq.question}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
                        ص {cq.page || readingLesson.startPage || readingLesson.page || 0}
                      </span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-emerald-200 text-emerald-950 font-amiri text-sm leading-relaxed">
                      <span className="font-bold text-emerald-800 font-sans text-xs block mb-1">الإجابة المعتمدة:</span>
                      {cq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rhetorical and Aesthetic Highlights */}
          {(readingLesson.rhetoricalAesthetics || []).length > 0 && (
            <div className="bg-purple-50/60 rounded-2xl p-6 border border-purple-200 space-y-3">
              <h4 className="font-bold text-purple-900 text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>أهم مظاهر الجمال والتحليل البلاغي في النص</span>
              </h4>
              <div className="space-y-2">
                {readingLesson.rhetoricalAesthetics?.map((item: string, idx: number) => (
                  <div key={idx} className="bg-white p-3.5 rounded-xl border border-purple-100 text-slate-800 text-xs leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SubTab 2: Grammar Section */}
      {activeSubTab === 'grammar' && grammarLesson && (
        <div className="space-y-6">
          {/* Base Rule Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-blue-800 font-bold border-b border-slate-100 pb-2.5">
              <FileCheck className="w-5 h-5 text-blue-600" />
              <h3>القاعدة الأساسية (الخلاصة المعتمدة)</h3>
            </div>
            <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-100 text-blue-950 font-semibold text-sm leading-relaxed">
              {grammarLesson.ruleSummary}
            </div>
            {(grammarLesson.inDepthExplanation || (grammarLesson.detailedRules && grammarLesson.detailedRules.length > 0)) && (
              <div className="text-xs text-slate-700 leading-relaxed space-y-2 pt-2">
                <span className="font-bold text-slate-900 block">الشرح والتفصيل المنهجي للقاعدة:</span>
                <div className="whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                  {grammarLesson.inDepthExplanation ? (
                    <p>{grammarLesson.inDepthExplanation}</p>
                  ) : (
                    <ul className="space-y-1.5 list-disc list-inside">
                      {grammarLesson.detailedRules?.map((rule: string, rIdx: number) => (
                        <li key={rIdx}>{rule}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Examples Analysis with Parsing */}
          {grammarLesson.examplesAnalysis && grammarLesson.examplesAnalysis.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <h4 className="font-bold text-slate-900 text-base">تحليل الأمثلة والشواهد النحوية وإعرابها</h4>
                <p className="text-xs text-slate-500">موضع الشاهد، الحكم النحوي، التعليل، ونماذج الإعراب الكامل</p>
              </div>
              <div className="space-y-3">
                {grammarLesson.examplesAnalysis.map((ea: any, idx: number) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2.5 text-xs">
                    <div className="font-bold text-slate-900 text-sm font-amiri text-base bg-white p-2.5 rounded-lg border border-slate-200">
                      الشاهد: «{ea.example}»
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 bg-white p-3 rounded-lg border border-slate-100">
                      <div><strong className="text-emerald-800">موضع الشاهد: </strong> {ea.witness}</div>
                      <div><strong className="text-blue-800">الحكم النحوي: </strong> {ea.rule}</div>
                      <div className="col-span-full"><strong className="text-slate-800">السبب والتعليل: </strong> {ea.reason}</div>
                      {ea.parsing && (
                        <div className="col-span-full bg-emerald-50/70 p-2.5 rounded text-emerald-950 font-amiri text-sm leading-relaxed border border-emerald-100">
                          <strong className="font-sans font-bold text-emerald-800 text-xs block mb-0.5">الإعراب: </strong>
                          {ea.parsing}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 5.b: Grammar Information in Explanation Not in Rule Summary */}
          {((grammarLesson.unmentionedInSummaryDetails && grammarLesson.unmentionedInSummaryDetails.length > 0) ||
            (grammarLesson.hiddenExplanationDetails && grammarLesson.hiddenExplanationDetails.length > 0)) && (
            <div className="bg-amber-50/80 rounded-2xl p-6 border border-amber-200 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <h4 className="text-base">معلومات نحوية وصرفية وردت في الشرح ولم تظهر في خلاصة القاعدة</h4>
              </div>
              <p className="text-xs text-amber-950 leading-relaxed">
                هذه التفاصيل استخرجت مباشرة من شروح وأمثلة ونماذج إعراب الكتاب المدرسي، وتعد مصدراً رئيسياً لأسئلة الاختبارات التمييزية:
              </p>
              <div className="space-y-3 pt-1">
                {(grammarLesson.unmentionedInSummaryDetails || (grammarLesson.hiddenExplanationDetails || []).map((h: string, idx: number) => ({
                  title: `حكم وتفصيل في الشرح والتطبيق (${idx + 1})`,
                  detail: h,
                  evidencePage: grammarLesson.startPage || grammarLesson.page || unit.pageRange[0],
                  significance: 'ملاحظة امتحانية دقيقة'
                }))).map((detail: any, idx: number) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-amber-200/90 shadow-xs space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">{detail.title}</span>
                      <span className="text-[11px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold">
                        شاهد الصفحة: ص {detail.evidencePage}
                      </span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{detail.detail}</p>
                    <div className="text-[11px] text-emerald-800 font-medium bg-emerald-50 px-2.5 py-1 rounded-lg inline-block">
                      الأهمية الامتحانية: {detail.significance}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comparative Grammar Table */}
          {grammarLesson.comparison && grammarLesson.comparison.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
              <h4 className="font-bold text-slate-900 text-base">المقارنات النحوية وإزالة اللبس بين القواعد المتقاربة</h4>
              {grammarLesson.comparison.map((comp, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-4 space-y-3 text-xs bg-slate-50/50">
                  <div className="flex items-center justify-between font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">
                    <span className="text-blue-700">{comp.conceptA}</span>
                    <span className="text-slate-400">مقابل</span>
                    <span className="text-purple-700">{comp.conceptB}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-lg border border-slate-100 space-y-1">
                      <span className="font-bold text-blue-900 block">مثال صحيح للحالة (أ):</span>
                      <span className="text-slate-800 font-amiri text-sm">{comp.exampleA}</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-100 space-y-1">
                      <span className="font-bold text-purple-900 block">مثال صحيح للحالة (ب):</span>
                      <span className="text-slate-800 font-amiri text-sm">{comp.exampleB}</span>
                    </div>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg border border-red-100 text-red-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-red-800">خطأ شائع متوقع: </span>
                      <span>{comp.commonMistake}</span>
                    </div>
                    <div>
                      <span className="font-bold text-emerald-800">التصويب: </span>
                      <span>{comp.correction}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Exercises & Parsed Models / Question Bank */}
          {((grammarLesson.exercises && grammarLesson.exercises.length > 0) ||
            (grammarLesson.questionBank && grammarLesson.questionBank.length > 0)) && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
              <h4 className="font-bold text-slate-900 text-base">نماذج الإعراب والتدريبات النحوية التطبيقية (بنك الأسئلة)</h4>
              <div className="space-y-3">
                {(grammarLesson.exercises || (grammarLesson.questionBank || []).map((q: any) => ({
                  question: q.question,
                  answer: q.answer,
                  pageNumber: grammarLesson.startPage || grammarLesson.page || unit.pageRange[0],
                  skillType: q.questionType || 'parsing'
                }))).map((ex: any, idx: number) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">سؤال: {ex.question}</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[10px] font-bold">
                        ص {ex.pageNumber} • {ex.skillType === 'parsing' ? 'إعراب' : 'تطبيق'}
                      </span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-200 text-emerald-950 leading-relaxed font-amiri text-sm">
                      <span className="font-bold text-emerald-800 font-sans text-xs block mb-1">الإجابة النموذجية:</span>
                      {ex.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SubTab 3: Dictation Section */}
      {activeSubTab === 'dictation' && dictationLesson && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-purple-800 font-bold border-b border-slate-100 pb-2.5">
              <Compass className="w-5 h-5 text-purple-600" />
              <h3>قواعد الرسم الإملائي للوحدة</h3>
            </div>
            <div className="bg-purple-50/70 p-4 rounded-xl border border-purple-100 text-purple-950 font-semibold text-sm leading-relaxed">
              {dictationLesson.ruleSummary}
            </div>
            {(dictationLesson.inDepthExplanation || (dictationLesson.detailedRules && dictationLesson.detailedRules.length > 0)) && (
              <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900 block">طريقة عملية وضوابط مساعدة:</span>
                <div className="whitespace-pre-line">
                  {dictationLesson.inDepthExplanation ? (
                    <p>{dictationLesson.inDepthExplanation}</p>
                  ) : (
                    <ul className="space-y-1 list-disc list-inside">
                      {dictationLesson.detailedRules?.map((r: string, rIdx: number) => (
                        <li key={rIdx}>{r}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>

          {((dictationLesson.exercises && dictationLesson.exercises.length > 0) ||
            (dictationLesson.questionBank && dictationLesson.questionBank.length > 0)) && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
              <h4 className="font-bold text-slate-900 text-base">تدريبات الإملاء والأنشطة التطبيقية</h4>
              <div className="space-y-3">
                {(dictationLesson.exercises || (dictationLesson.questionBank || []).map((q: any) => ({
                  question: q.question,
                  answer: q.answer
                }))).map((ex: any, idx: number) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                    <span className="font-bold text-slate-900 text-sm block">{ex.question}</span>
                    <div className="bg-white p-3 rounded-lg border border-slate-200 text-purple-950 leading-relaxed font-sans text-xs">
                      <span className="font-bold text-purple-800 block mb-1">الحل والتفسير الإملائي:</span>
                      {ex.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SubTab 4: Unit Assessment & Standard Model Answers */}
      {activeSubTab === 'eval_and_exercises' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">أسئلة التقويم الختامي للوحدة (حلول نموذجية مطابقة للكتاب)</h3>
                <p className="text-xs text-slate-500">حلول دقيقة مستندة لنص الكتاب وشروحه وقواعده المعتمدة</p>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold">
                تقويم الدرس السادس
              </span>
            </div>

            <div className="space-y-4">
              {((assessmentLesson?.exercises && assessmentLesson.exercises.length > 0)
                ? assessmentLesson.exercises
                : (unit.assessmentQuestions && unit.assessmentQuestions.length > 0)
                ? unit.assessmentQuestions
                : []).map((ex, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center text-xs">
                        {idx + 1}
                      </span>
                      <span>{ex.question}</span>
                    </div>
                    <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-[10px] font-semibold shrink-0">
                      ص {ex.pageNumber}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-emerald-200 text-slate-900 leading-relaxed font-amiri text-base">
                    <span className="font-bold text-emerald-800 font-sans text-xs block mb-1">الإجابة النموذجية المعتمدة:</span>
                    {ex.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SubTab 5: Section 8 - Questions Not Explicitly Answered in Lessons */}
      {activeSubTab === 'section8_beyond' && (
        <div className="space-y-6">
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-amber-900 font-bold mb-1">
                  <Lightbulb className="w-5 h-5 text-amber-600 shrink-0" />
                  <h3 className="text-lg">اكتشاف الأسئلة الامتحانية المهمة التي لا توجد إجاباتها صراحة في الدروس</h3>
                </div>
                <p className="text-xs text-amber-950 leading-relaxed max-w-3xl">
                  تطبيقاً للبند الثامن في موجهات العمل: أسئلة ذكية متوقعة ترتبط بالمفاهيم التي يثيرها الدرس دون الإجابة عنها مباشرة، مصنفة وفق الفئات المنهجية الأربع.
                </p>
              </div>
              <span className="bg-amber-200/80 text-amber-900 text-xs px-3 py-1 rounded-full font-bold shrink-0">
                {(unit.beyondTheLinesQuestions?.length || unit.section8Discoveries?.length || 0)} أسئلة استنتاجية
              </span>
            </div>

            {/* Questions Table */}
            <div className="space-y-3 pt-2">
              {(unit.beyondTheLinesQuestions || (unit.section8Discoveries || []).map((s: any) => ({
                question: s.question,
                importanceReason: s.importanceReason,
                lessonRelation: s.relationshipToLesson || s.lessonRelation || '',
                isAnswerInBook: s.isAnswerInBook || false,
                category: 'direct_inference',
                answerText: s.suggestedAnswer || s.answerText || '',
                priority: s.priority === 'أساسي' || s.priority === 'high' ? 'high' : 'medium'
              }))).map((q: any, idx: number) => (
                <div key={idx} className="bg-white rounded-xl p-5 border border-amber-200 shadow-xs space-y-3 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs">
                        س{idx + 1}
                      </span>
                      <span>{q.question}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        q.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        أولوية {q.priority === 'high' ? 'عالية' : 'متوسطة'}
                      </span>
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-medium">
                        {q.category === 'direct_inference' ? 'فئة 1: مستنتجة مباشرة' : 
                         q.category === 'multi_info_linking' ? 'فئة 2: ربط معلومات' :
                         q.category === 'external_linguistic' ? 'فئة 3: معرفة لغوية خارجية' : 'فئة 4: احتمال امتحاني'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg">
                    <div>
                      <span className="font-bold text-slate-800">سبب الأهمية: </span>
                      <span>{q.importanceReason}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-800">العلاقة بالدرس: </span>
                      <span>{q.lessonRelation}</span>
                    </div>
                  </div>

                  <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-100 text-emerald-950 font-amiri text-sm leading-relaxed">
                    <span className="font-bold text-emerald-800 font-sans text-xs block mb-1">
                      الإجابة النموذجية الموجهة للمعلم:
                    </span>
                    {q.answerText}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
