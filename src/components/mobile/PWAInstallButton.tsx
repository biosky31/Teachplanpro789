import React, { useState } from 'react';
import { Download, Smartphone, Share2, PlusSquare, CheckCircle2, X, ExternalLink, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'compact' | 'full' | 'banner';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ 
  variant = 'compact',
  className = '' 
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const [guidePlatform, setGuidePlatform] = useState<'ios' | 'android'>('android');

  // If already installed and in standalone mode, show subtle verified status or hide
  if (isInstalled) {
    if (variant === 'full') {
      return (
        <div className={`p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-emerald-300 text-xs font-semibold ${className}`}>
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>التطبيق مثبت على جهازك ويعمل بنظام التطبيق المستقل (PWA) بدون إنترنت</span>
        </div>
      );
    }
    return null;
  }

  const handleButtonClick = async () => {
    if (isInstallable) {
      const outcome = await install();
      if (!outcome && !isIOS) {
        setGuidePlatform('android');
        setShowGuideModal(true);
      }
    } else if (isIOS) {
      setGuidePlatform('ios');
      setShowGuideModal(true);
    } else {
      setGuidePlatform('android');
      setShowGuideModal(true);
    }
  };

  return (
    <>
      {variant === 'compact' ? (
        <button
          onClick={handleButtonClick}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs shadow-sm hover:shadow-md transition-all active:scale-95 ${className}`}
          title="تثبيت التطبيق على هاتفك المحمول"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>تثبيت كتطبيق</span>
        </button>
      ) : variant === 'banner' ? (
        <div className={`p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 border border-amber-500/40 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${className}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-amber-300">تثبيت المنصة كتطبيق على هاتفك (PWA)</h4>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">يعمل بدون نت</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                تصفح الخطط وتحضير الدروس وبنك الأسئلة مباشرة من شاشة هاتفك مثل التطبيقات الرسمية
              </p>
            </div>
          </div>
          <button
            onClick={handleButtonClick}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition active:scale-95 shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>تثبيت الآن</span>
          </button>
        </div>
      ) : (
        <button
          onClick={handleButtonClick}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all ${className}`}
        >
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>تثبيت التطبيق على الهاتف</span>
          </div>
          <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md font-black">
            تثبيت
          </span>
        </button>
      )}

      {/* Installation Instruction Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full p-5 sm:p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setShowGuideModal(false)}
              className="absolute top-4 left-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  خطوات تثبيت التطبيق على هاتفك
                </h3>
                <p className="text-xs text-amber-300/90 font-medium">
                  منصة خبير المناهج اليمنية — لغتي العربية
                </p>
              </div>
            </div>

            {/* Platform Toggle Tabs */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-800/80 rounded-xl mb-4 text-xs font-bold">
              <button
                onClick={() => setGuidePlatform('android')}
                className={`py-2 rounded-lg transition ${guidePlatform === 'android' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                أجهزة أندرويد (Chrome)
              </button>
              <button
                onClick={() => setGuidePlatform('ios')}
                className={`py-2 rounded-lg transition ${guidePlatform === 'ios' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                أجهزة آيفون (Safari)
              </button>
            </div>

            {/* Steps based on platform */}
            {guidePlatform === 'ios' ? (
              <div className="space-y-3 text-xs text-slate-200">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                  <div className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold shrink-0 text-[11px]">
                    1
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5">افتح المنصة في متصفح سفاري (Safari)</strong>
                    <span>تأكد من فتح الرابط داخل متصفح Safari وليس من داخل تطبيقات أخرى.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                  <div className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold shrink-0 text-[11px]">
                    2
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5 flex items-center gap-1.5">
                      <span>اضغط زر المشاركة</span>
                      <Share2 className="w-3.5 h-3.5 text-blue-400" />
                    </strong>
                    <span>ستجده في أسفل شاشة المتصفح (مربع يخرج منه سهم للأعلى).</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                  <div className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold shrink-0 text-[11px]">
                    3
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5 flex items-center gap-1.5">
                      <span>اختر "إضافة إلى الصفحة الرئيسية"</span>
                      <PlusSquare className="w-3.5 h-3.5 text-emerald-400" />
                    </strong>
                    <span>مرر القائمة لأسفل ثم اضغط <strong>(Add to Home Screen)</strong> ثم اضغط <strong>إضافة</strong>.</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-slate-200">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                  <div className="w-6 h-6 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center font-bold shrink-0 text-[11px]">
                    1
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5">التثبيت التلقائي السريع</strong>
                    <span>إذا ظهرت رسالة التثبيت أسفل الشاشة، اضغط <strong>"تثبيت" (Install)</strong> مباشرة.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                  <div className="w-6 h-6 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center font-bold shrink-0 text-[11px]">
                    2
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5">أو من قائمة متصفح كروم (Chrome)</strong>
                    <span>اضغط على النقاط الثلاث (⋮) في أعلى زاوية المتصفح.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                  <div className="w-6 h-6 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center font-bold shrink-0 text-[11px]">
                    3
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5 flex items-center gap-1.5">
                      <span>اختر "تثبيت التطبيق" أو "إضافة للشاشة"</span>
                      <Download className="w-3.5 h-3.5 text-amber-300" />
                    </strong>
                    <span>اضغط <strong>(Install App)</strong> وسيظهر التطبيق فوراً كأيقونة مستقلة في هاتفك.</span>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Features */}
            <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 flex items-center gap-2.5 text-[11px] text-emerald-200">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span>ميزة التثبيت: يفتح التطبيق بكامل الشاشة وبدون شريط عنوان المتصفح، مع إمكانية الوصول إلى الخطط والتحضير بدون إنترنت.</span>
            </div>

            <button
              onClick={() => setShowGuideModal(false)}
              className="mt-4 w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs transition"
            >
              فهمت، إغلاق
            </button>
          </div>
        </div>
      )}
    </>
  );
};
