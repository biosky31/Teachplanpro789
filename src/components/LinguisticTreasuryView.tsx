import React, { useState } from 'react';
import { 
  Lightbulb, 
  Search, 
  BookMarked, 
  Bookmark, 
  Sparkles, 
  Layers, 
  Filter,
  CheckCircle2,
  FileText,
  AlertCircle
} from 'lucide-react';
import { UNITS_EXTRACTED_DATA } from '../data/unitsDetailData';

import { UnitData } from '../types/curriculum';

interface LinguisticTreasuryViewProps {
  unitsData?: UnitData[];
}

export const LinguisticTreasuryView: React.FC<LinguisticTreasuryViewProps> = ({ unitsData }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'vocab' | 'hidden_grammar' | 'comparisons'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const data = unitsData && unitsData.length > 0 ? unitsData : UNITS_EXTRACTED_DATA;

  // Collect all vocabulary across the units
  const allVocab = data.flatMap(u => 
    (u.lessons.find(l => l.vocabulary)?.vocabulary || []).map(v => ({
      ...v,
      unitTitle: u.title,
      unitNum: u.id
    }))
  );

  // Collect all hidden grammar details (not in summary)
  const allHiddenGrammar = data.flatMap(u => 
    (u.lessons.find(l => l.unmentionedInSummaryDetails)?.unmentionedInSummaryDetails || []).map(d => ({
      ...d,
      unitTitle: u.title,
      unitNum: u.id
    }))
  );

  // Collect all comparisons
  const allComparisons = data.flatMap(u => 
    (u.lessons.find(l => l.comparison)?.comparison || []).map(c => ({
      ...c,
      unitTitle: u.title,
      unitNum: u.id
    }))
  );

  const filteredVocab = allVocab.filter(v => 
    v.word.includes(searchTerm) || 
    v.contextMeaning.includes(searchTerm) ||
    (v.synonym && v.synonym.includes(searchTerm)) ||
    (v.antonym && v.antonym.includes(searchTerm))
  );

  const filteredHidden = allHiddenGrammar.filter(h => 
    h.title.includes(searchTerm) || 
    h.detail.includes(searchTerm) ||
    h.significance.includes(searchTerm)
  );

  const filteredComparisons = allComparisons.filter(c => 
    c.conceptA.includes(searchTerm) || 
    c.conceptB.includes(searchTerm) ||
    c.commonMistake.includes(searchTerm)
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="space-y-2 max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>خزانة المعلم اللغوية والتربوية الشاملة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            الثروة المفاهيمية والمعجمية وتفاصيل الشروح النحوية
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            مستودع بحثي شامل يضم: معجم المفردات التراكمي في السياق لجميع الوحدات الـ 12، بنك الفروق الدقيقة والمعلومات التي ذكرت في الشروح ولم تتضمنها خلاصات القواعد، وجداول المقارنة النحوية والإملائية لمنع الأخطاء الشائعة.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-2 rounded-xl font-bold transition-all ${
              activeFilter === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => setActiveFilter('vocab')}
            className={`px-3 py-2 rounded-xl font-bold transition-all ${
              activeFilter === 'vocab'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            المعجم والمفردات ({allVocab.length})
          </button>
          <button
            onClick={() => setActiveFilter('hidden_grammar')}
            className={`px-3 py-2 rounded-xl font-bold transition-all ${
              activeFilter === 'hidden_grammar'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            تفاصيل خارج الخلاصة ({allHiddenGrammar.length})
          </button>
          <button
            onClick={() => setActiveFilter('comparisons')}
            className={`px-3 py-2 rounded-xl font-bold transition-all ${
              activeFilter === 'comparisons'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            المقارنات وتصويب الأخطاء ({allComparisons.length})
          </button>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث في الكلمات، القواعد، أو الشروح..."
            className="w-full pr-9 pl-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>
      </div>

      {/* Content Sections */}

      {/* 1. Hidden Grammar Details Section */}
      {(activeFilter === 'all' || activeFilter === 'hidden_grammar') && filteredHidden.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-slate-900 text-base">
              معلومات نحوية وردت في الشروح ولم تظهر في خلاصات القواعد
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredHidden.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs hover:shadow-md transition-shadow space-y-2 text-xs"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-900 text-sm">{item.title}</span>
                  <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[10px]">
                    الوحدة {item.unitNum} • ص {item.evidencePage}
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed font-amiri text-base">
                  {item.detail}
                </p>
                <div className="bg-amber-50 text-amber-900 p-2 rounded-xl border border-amber-100 font-medium text-[11px]">
                  <strong>الأهمية الامتحانية: </strong>{item.significance}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Grammar Comparisons Section */}
      {(activeFilter === 'all' || activeFilter === 'comparisons') && filteredComparisons.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <h3 className="font-extrabold text-slate-900 text-base">
              جداول المقارنات النحوية وتصويب الأخطاء الشائعة
            </h3>
          </div>

          <div className="space-y-3">
            {filteredComparisons.map((comp, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900 border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-blue-700">{comp.conceptA}</span>
                    <span className="text-slate-400">×</span>
                    <span className="text-purple-700">{comp.conceptB}</span>
                  </div>
                  <span className="text-slate-500 text-[11px] font-semibold">{comp.unitTitle}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                    <span className="font-bold text-blue-900 block mb-1">شاهد الحالة (أ):</span>
                    <span className="font-amiri text-sm text-slate-900">{comp.exampleA}</span>
                  </div>
                  <div className="bg-purple-50/50 p-3 rounded-xl border border-purple-100">
                    <span className="font-bold text-purple-900 block mb-1">شاهد الحالة (ب):</span>
                    <span className="font-amiri text-sm text-slate-900">{comp.exampleB}</span>
                  </div>
                </div>

                <div className="bg-red-50 p-3 rounded-xl border border-red-100 text-red-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-bold text-red-800">الخطأ المتوقع: </span>
                    <span>{comp.commonMistake}</span>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-800">التصويب الدقيق: </span>
                    <span>{comp.correction}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Vocabulary Dictionary Section */}
      {(activeFilter === 'all' || activeFilter === 'vocab') && filteredVocab.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-emerald-600" />
              <h3 className="font-extrabold text-slate-900 text-base">
                معجم المفردات والتراكيب الشامل للكتاب
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-semibold">
              إجمالي النتائج: {filteredVocab.length} كلمة
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">الكلمة أو التعبير</th>
                    <th className="p-3">المعنى في السياق</th>
                    <th className="p-3">المرادف</th>
                    <th className="p-3">الضد</th>
                    <th className="p-3">الوحدة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {filteredVocab.map((voc, idx) => (
                    <tr key={idx} className="hover:bg-emerald-50/30 transition-colors">
                      <td className="p-3 font-bold text-emerald-900">{voc.word}</td>
                      <td className="p-3 leading-relaxed">{voc.contextMeaning}</td>
                      <td className="p-3 text-slate-600">{voc.synonym || '—'}</td>
                      <td className="p-3 text-slate-600">{voc.antonym || '—'}</td>
                      <td className="p-3 text-[11px] text-slate-500 font-semibold">{voc.unitTitle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
