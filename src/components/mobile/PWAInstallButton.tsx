import React, { useState, useEffect } from 'react';
import { Download, Smartphone, Share2, PlusSquare, CheckCircle2, X, ExternalLink, Sparkles, Copy, Check, Menu } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'compact' | 'full' | 'banner';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ 
  variant = 'compact',
  className = '' 
}) => {
  const { isInstallable, isInstalled, isIOS, isSamsung, isOpera, isInIframe, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const [guidePlatform, setGuidePlatform] = useState<'opera' | 'chrome' | 'samsung' | 'ios'>('opera');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    if (isOpera) {
      setGuidePlatform('opera');
    } else if (isIOS) {
      setGuidePlatform('ios');
    } else if (isSamsung) {
      setGuidePlatform('samsung');
    } else {
      setGuidePlatform('chrome');
    }
  }, [isOpera, isIOS, isSamsung]);

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
      if (!outcome) {
        setShowGuideModal(true);
      }
    } else {
      setShowGuideModal(true);
    }
  };

  const handleCopyLink = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    } catch {
      // Fallback
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-xs animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setShowGuideModal(false)}
              className="absolute top-4 left-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  طريقة تثبيت التطبيق على هاتفك
                </h3>
                <p className="text-xs text-amber-300/90 font-medium">
                  منصة خبير المناهج اليمنية — الأستاذ إبراهيم متاش
                </p>
              </div>
            </div>

            {/* Platform Toggle Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-800/90 rounded-xl mb-4 text-xs font-bold">
              <button
                onClick={() => setGuidePlatform('opera')}
                className={`py-2 px-1 rounded-lg transition text-center ${guidePlatform === 'opera' ? 'bg-red-500 text-white font-black shadow' : 'text-slate-300 hover:text-white'}`}
              >
                متصفح أوبرا (Opera)
              </button>
              <button
                onClick={() => setGuidePlatform('chrome')}
                className={`py-2 px-1 rounded-lg transition text-center ${guidePlatform === 'chrome' ? 'bg-emerald-600 text-white font-black shadow' : 'text-slate-300 hover:text-white'}`}
              >
                كروم (Chrome/Pixel)
              </button>
              <button
                onClick={() => setGuidePlatform('samsung')}
                className={`py-2 px-1 rounded-lg transition text-center ${guidePlatform === 'samsung' ? 'bg-amber-500 text-slate-950 font-black shadow' : 'text-slate-300 hover:text-white'}`}
              >
                سامسونج
              </button>
              <button
                onClick={() => setGuidePlatform('ios')}
                className={`py-2 px-1 rounded-lg transition text-center ${guidePlatform === 'ios' ? 'bg-blue-600 text-white font-black shadow' : 'text-slate-300 hover:text-white'}`}
              >
                آيفون (iOS)
              </button>
            </div>

            {isInIframe && (
              <div className="mb-3.5 p-3 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs">
                <div className="font-bold flex items-center gap-1.5 mb-1 text-amber-300">
                  <span>💡 تنبيه للمعاينة الحالية:</span>
                </div>
                <p className="leading-relaxed text-[11px]">
                  أنت تتصفح المنصة الآن داخل نافذة معاينة داخلية. متصفحات الهواتف (مثل <strong>Opera</strong> و <strong>Chrome</strong>) تمنع التثبيت المباشر داخل النوافذ المضمنة لأسباب أمنية.
                  يرجى فتح الرابط مباشرة في متصفح هاتفك لتثبيته فوراً.
                </p>
                <div className="mt-2.5 flex items-center gap-2">
                  <a
                    href={typeof window !== 'undefined' ? window.location.href : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1.5 px-3 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs text-center flex items-center justify-center gap-1.5 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>فتح في المتصفح الخارجي للتحميل</span>
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold transition flex items-center gap-1"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'تم النسخ' : 'نسخ الرابط'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Steps based on platform */}
            {guidePlatform === 'opera' ? (
              <div className="space-y-2.5 text-xs text-slate-200">
                <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-[11px] font-medium leading-relaxed">
                  🚀 <strong>خطوات التثبيت في متصفح Opera (لهاتف Pixel وجميع هواتف أندرويد):</strong>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/70 border border-slate-700">
                  <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center font-black shrink-0 text-xs">
                    1
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5 flex items-center gap-1.5">
                      <span>افتح قائمة أوبرا (Opera Menu)</span>
                    </strong>
                    <span>اضغط على أيقونة أوبرا الحمراء <strong className="text-red-400 font-mono">(O)</strong> أو النقاط الثلاث <strong className="text-amber-300 font-mono">(⋮)</strong> في شريط المتصفح (أسفل أو أعلى الشاشة بحسب إعداداتك).</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/70 border border-slate-700">
                  <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center font-black shrink-0 text-xs">
                    2
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5 flex items-center gap-1.5">
                      <span>اختر «إضافة إلى الشاشة الرئيسية» (Add to Home screen)</span>
                      <PlusSquare className="w-3.5 h-3.5 text-red-300" />
                    </strong>
                    <span>أو ابحث عن خيار <strong>«تثبيت التطبيق» (Install app)</strong> من القائمة الظاهرة.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/70 border border-slate-700">
                  <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center font-black shrink-0 text-xs">
                    3
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5 flex items-center gap-1.5">
                      <span>اضغط «إضافة» أو «تثبيت» (Add / Install)</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </strong>
                    <span>سيقوم هاتفك فوراً بتثبيت المنصة في قائمة التطبيقات والشاشة الرئيسية باسم <strong>«خبير المناهج»</strong>، لتعمل كنافذة كاملة بدون إنترنت.</span>
                  </div>
                </div>
              </div>
            ) : guidePlatform === 'chrome' ? (
              <div className="space-y-3 text-xs text-slate-200">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-[11px] font-medium leading-relaxed">
                  📱 <strong>خطوات التثبيت في متصفح Chrome (Google Pixel وجميع هواتف أندرويد):</strong>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/70 border border-slate-700">
                  <div className="w-6 h-6 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-black shrink-0 text-xs">
                    1
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5">من قائمة المتصفح</strong>
                    <span>اضغط على النقاط الثلاث <strong>(⋮)</strong> في أعلى الزاوية.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/70 border border-slate-700">
                  <div className="w-6 h-6 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-black shrink-0 text-xs">
                    2
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5 flex items-center gap-1.5">
                      <span>اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية»</span>
                      <Download className="w-3.5 h-3.5 text-emerald-400" />
                    </strong>
                    <span>اضغط <strong>تثبيت</strong> لتنزيل أيقونة التطبيق في شاشة الهاتف والعمل كلياً دون إنترنت.</span>
                  </div>
                </div>
              </div>
            ) : guidePlatform === 'samsung' ? (
              <div className="space-y-2.5 text-xs text-slate-200">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-[11px] font-medium leading-relaxed">
                  💡 <strong>خطوات التثبيت في متصفح سامسونج للإنترنت:</strong>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/70 border border-slate-700">
                  <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 text-xs">
                    1
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5 flex items-center gap-1.5">
                      <span>اضغط زر القائمة</span>
                      <span className="px-1.5 py-0.5 bg-slate-700 rounded text-amber-300 font-mono text-xs">≡</span>
                      <span>في أسفل الشاشة</span>
                    </strong>
                    <span>الموجود في شريط المتصفح السفلي.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/70 border border-slate-700">
                  <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 text-xs">
                    2
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5 flex items-center gap-1.5">
                      <span>اختر «إضافة الصفحة إلى» (Add page to)</span>
                      <PlusSquare className="w-3.5 h-3.5 text-amber-300" />
                    </strong>
                    <span>ثم اختر <strong>«الشاشة الرئيسية»</strong> واضغط <strong>«إضافة»</strong>.</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-slate-200">
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-200 text-[11px] font-medium leading-relaxed">
                  🍏 <strong>خطوات التثبيت في هواتف آيفون (Safari):</strong>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/70 border border-slate-700">
                  <div className="w-6 h-6 rounded-full bg-blue-400 text-slate-950 flex items-center justify-center font-black shrink-0 text-xs">
                    1
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5 flex items-center gap-1.5">
                      <span>اضغط زر المشاركة</span>
                      <Share2 className="w-3.5 h-3.5 text-blue-400" />
                    </strong>
                    <span>في شريط Safari السفلي (مربع يخرج منه سهم للأعلى).</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/70 border border-slate-700">
                  <div className="w-6 h-6 rounded-full bg-blue-400 text-slate-950 flex items-center justify-center font-black shrink-0 text-xs">
                    2
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5 flex items-center gap-1.5">
                      <span>اختر «إضافة إلى الصفحة الرئيسية»</span>
                      <PlusSquare className="w-3.5 h-3.5 text-emerald-400" />
                    </strong>
                    <span>اضغط <strong>(Add to Home Screen)</strong> ثم <strong>إضافة</strong>.</span>
                  </div>
                </div>
              </div>
            )}

            {/* Direct Link Section */}
            <div className="mt-4 p-3 rounded-xl bg-slate-800/90 border border-slate-700">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-slate-200">رابط المنصة المباشر للفتح في المتصفح:</span>
                <span className="text-[10px] bg-slate-700 text-amber-300 px-2 py-0.5 rounded font-mono">PWA</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95 shadow-xs"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-amber-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'تم نسخ الرابط بنجاح!' : 'نسخ رابط المنصة'}</span>
                </button>
                <a
                  href={typeof window !== 'undefined' ? window.location.href : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition"
                  title="فتح في نافذة مستقلة"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>فتح</span>
                </a>
              </div>
              <p className="text-[10px] text-slate-400 mt-2">
                نصيحة: إذا كنت تتصفح داخل نافذة مصغرة، انسخ الرابط وافتحه في تطبيق المتصفح مباشرة لتثبيت التطبيق بنقرة زر.
              </p>
            </div>

            {/* Footer Features */}
            <div className="mt-3 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 flex items-center gap-2 text-[11px] text-emerald-200">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span>ميزة التثبيت: يفتح التطبيق بكامل الشاشة وبدون شريط عنوان، ويعمل كاملاً بدون إنترنت.</span>
            </div>

            <button
              onClick={() => setShowGuideModal(false)}
              className="mt-4 w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition active:scale-95 shadow-md"
            >
              فهمت، إغلاق النافذة
            </button>
          </div>
        </div>
      )}
    </>
  );
};

