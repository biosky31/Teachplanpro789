/**
 * Word (.doc) Exporter for Yemeni Semester Study Plan
 * Generates an MS Word-compliant HTML document with landscape orientation, 
 * balanced page breaks, professional styling, and RTL Arabic typography.
 */

export interface ExportMetadata {
  schoolName: string;
  governorate: string;
  directorate: string;
  teacherName: string;
  teacherEmail?: string;
  supervisorName: string;
  principalName: string;
  gradeTitle: string;
  semesterTitle: string;
  academicYear: string;
  fontFamily?: 'Cairo' | 'Amiri' | 'Traditional Arabic' | 'Tahoma';
  colorTheme?: 'emerald' | 'navy' | 'burgundy' | 'classic_black';
  weeksPerPage?: number;
}

export interface PlanRowData {
  weekNumber: number;
  isReviewWeek: boolean;
  hijriDates: string;
  miladiDates: string;
  unitAndLessons: string;
  pageRange: string;
  behavioralObjectives: string[];
  strategies: string[];
  toolsAndAids: string[];
  assessmentAndEvidence: string[];
  notesAndExams: string;
}

const THEME_COLORS = {
  emerald: {
    primary: '#065f46',
    primaryLight: '#ecfdf5',
    headerBg: '#065f46',
    headerText: '#ffffff',
    border: '#047857',
    reviewBg: '#fef3c7',
    reviewAccent: '#92400e',
    zebraBg: '#f0fdf4',
  },
  navy: {
    primary: '#1e3a8a',
    primaryLight: '#eff6ff',
    headerBg: '#1e3a8a',
    headerText: '#ffffff',
    border: '#1d4ed8',
    reviewBg: '#fef3c7',
    reviewAccent: '#92400e',
    zebraBg: '#f8fafc',
  },
  burgundy: {
    primary: '#831843',
    primaryLight: '#fdf2f8',
    headerBg: '#831843',
    headerText: '#ffffff',
    border: '#9d174d',
    reviewBg: '#fef3c7',
    reviewAccent: '#92400e',
    zebraBg: '#fff1f2',
  },
  classic_black: {
    primary: '#1e293b',
    primaryLight: '#f8fafc',
    headerBg: '#1e293b',
    headerText: '#ffffff',
    border: '#475569',
    reviewBg: '#f1f5f9',
    reviewAccent: '#0f172a',
    zebraBg: '#f8fafc',
  }
};

export function generateWordDocumentHtml(
  meta: ExportMetadata,
  rows: PlanRowData[]
): string {
  const theme = THEME_COLORS[meta.colorTheme || 'emerald'];
  const font = meta.fontFamily || 'Cairo';
  // Break into pages: customizable (default 3 weeks per page for balanced pagination)
  const weeksPerPage = meta.weeksPerPage || 3;
  const pagesCount = Math.ceil(rows.length / weeksPerPage);

  let pagesHtml = '';

  for (let p = 0; p < pagesCount; p++) {
    const pageRows = rows.slice(p * weeksPerPage, (p + 1) * weeksPerPage);
    const isLastPage = p === pagesCount - 1;

    pagesHtml += `
      <div class="page-container" style="${!isLastPage ? 'page-break-after: always;' : ''}">
        <!-- Official Ministry Header -->
        <table class="header-table" dir="rtl" style="width: 100%; border-collapse: collapse; margin-bottom: 12px; border-bottom: 2.5px solid ${theme.primary};">
          <tr>
            <td style="width: 33%; text-align: right; vertical-align: top; font-size: 11pt; color: #1e293b; font-family: '${font}', 'Traditional Arabic', Tahoma, sans-serif;">
              <strong>الجمهورية اليمنية</strong><br/>
              وزارة التربية والتعليم والبحث العلمي<br/>
              مكتب التربية بمحافظة: <u>${meta.governorate || 'صنعاء'}</u><br/>
              مديرية: <u>${meta.directorate || 'السبعين'}</u><br/>
              مدرسة: <u>${meta.schoolName || 'مدرسة إشراق اليمن'}</u>
            </td>
            <td style="width: 34%; text-align: center; vertical-align: middle;">
              <h2 style="margin: 0; color: ${theme.primary}; font-size: 16pt; font-family: '${font}', 'Amiri', 'Traditional Arabic', serif;">خطة توزيع المنهاج الدراسي للفصل الدراسي الأول</h2>
              <h3 style="margin: 4px 0; color: #0f172a; font-size: 13pt;">مادة: لغتي العربية — ${meta.gradeTitle}</h3>
              <p style="margin: 2px 0; color: #b45309; font-size: 10pt; font-weight: bold;">وفق التقويم المدرسي المعتمد للعام الدراسي ${meta.academicYear}</p>
            </td>
            <td style="width: 33%; text-align: left; vertical-align: top; font-size: 10pt; color: #334155;">
              <strong>المعلم / المعد:</strong> ${meta.teacherName || 'الأستاذ إبراهيم متاش'} ${meta.teacherEmail ? `(${meta.teacherEmail})` : ''}<br/>
              <strong>الموجه التربوي:</strong> ${meta.supervisorName || 'أ. عبدالله صالح'}<br/>
              <strong>مدير المدرسة:</strong> ${meta.principalName || 'أ. نبيل القدسي'}<br/>
              <strong>نظام الحصص:</strong> 6 حصص أسبوعياً (السبت-الأربعاء)<br/>
              <strong>الصفحة:</strong> ${p + 1} من ${pagesCount}
            </td>
          </tr>
        </table>

        <!-- Main 8-Column Plan Table -->
        <table class="plan-table" dir="rtl" style="width: 100%; border-collapse: collapse; font-size: 9.5pt; font-family: '${font}', 'Traditional Arabic', sans-serif;">
          <thead>
            <tr style="background-color: ${theme.headerBg}; color: ${theme.headerText}; text-align: center; font-weight: bold;">
              <th style="border: 1px solid #0f172a; padding: 6px; width: 6%;">الأسبوع</th>
              <th style="border: 1px solid #0f172a; padding: 6px; width: 11%;">التاريخ (التقويم الوزاري)</th>
              <th style="border: 1px solid #0f172a; padding: 6px; width: 18%;">الوحدة والدروس المقررة والصفحات</th>
              <th style="border: 1px solid #0f172a; padding: 6px; width: 25%;">الأهداف السلوكية الإجرائية (أن + الفعل)</th>
              <th style="border: 1px solid #0f172a; padding: 6px; width: 13%;">استراتيجيات التدريس المعتمدة</th>
              <th style="border: 1px solid #0f172a; padding: 6px; width: 11%;">الوسائل ومصادر التعلم</th>
              <th style="border: 1px solid #0f172a; padding: 6px; width: 10%;">أساليب التقويم وأدلة التعلم</th>
              <th style="border: 1px solid #0f172a; padding: 6px; width: 6%;">الملاحظات والامتحانات</th>
            </tr>
          </thead>
          <tbody>
            ${pageRows.map((r, rIdx) => `
              <tr style="background-color: ${r.isReviewWeek ? theme.reviewBg : rIdx % 2 === 0 ? '#ffffff' : theme.zebraBg}; vertical-align: top;">
                <!-- Col 1: Week -->
                <td style="border: 1px solid #cbd5e1; padding: 6px; text-align: center; font-weight: bold; background-color: ${r.isReviewWeek ? '#fde68a' : theme.primaryLight};">
                  <span style="font-size: 11pt; color: ${theme.primary};">${r.weekNumber}</span><br/>
                  ${r.isReviewWeek ? `<span style="color: ${theme.reviewAccent}; font-size: 8pt; font-weight: bold;">مراجعة</span>` : '<span style="color: #64748b; font-size: 8pt;">دراسة</span>'}
                </td>

                <!-- Col 2: Dates -->
                <td style="border: 1px solid #cbd5e1; padding: 6px; font-size: 8.5pt;">
                  <strong style="color: ${theme.primary};">هـ:</strong> ${r.hijriDates}<br/>
                  <span style="color: #475569;"><strong>م:</strong> ${r.miladiDates}</span>
                </td>

                <!-- Col 3: Units & Lessons -->
                <td style="border: 1px solid #cbd5e1; padding: 6px;">
                  <strong style="color: #0f172a; font-size: 10pt;">${r.unitAndLessons}</strong><br/>
                  <span style="display: inline-block; background-color: #e2e8f0; color: #334155; padding: 2px 5px; border-radius: 4px; font-size: 8pt; margin-top: 3px;">
                    ${r.pageRange}
                  </span>
                </td>

                <!-- Col 4: Behavioral Objectives -->
                <td style="border: 1px solid #cbd5e1; padding: 6px; font-size: 9pt;">
                  <ul style="margin: 0; padding-right: 14px; line-height: 1.45;">
                    ${r.behavioralObjectives.map(obj => `<li>${obj}</li>`).join('')}
                  </ul>
                </td>

                <!-- Col 5: Strategies -->
                <td style="border: 1px solid #cbd5e1; padding: 6px; font-size: 8.5pt;">
                  <ul style="margin: 0; padding-right: 12px; color: ${theme.primary}; font-weight: bold; line-height: 1.4;">
                    ${r.strategies.map(st => `<li>${st}</li>`).join('')}
                  </ul>
                </td>

                <!-- Col 6: Tools & Aids -->
                <td style="border: 1px solid #cbd5e1; padding: 6px; font-size: 8.5pt; color: #334155;">
                  <ul style="margin: 0; padding-right: 12px; line-height: 1.4;">
                    ${r.toolsAndAids.map(tl => `<li>${tl}</li>`).join('')}
                  </ul>
                </td>

                <!-- Col 7: Assessment & Evidence -->
                <td style="border: 1px solid #cbd5e1; padding: 6px; font-size: 8.5pt;">
                  <ul style="margin: 0; padding-right: 12px; color: #1e293b; line-height: 1.4;">
                    ${r.assessmentAndEvidence.map(ev => `<li>${ev}</li>`).join('')}
                  </ul>
                </td>

                <!-- Col 8: Notes & Exams -->
                <td style="border: 1px solid #cbd5e1; padding: 6px; font-size: 8.5pt; text-align: center; color: ${r.isReviewWeek ? '#92400e' : '#64748b'}; font-weight: bold;">
                  ${r.notesAndExams}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <!-- Page Footer with Signatures -->
        <table class="footer-table" dir="rtl" style="width: 100%; border-collapse: collapse; margin-top: 14px; font-size: 10pt; font-family: 'Cairo', 'Traditional Arabic', sans-serif;">
          <tr>
            <td style="width: 33%; text-align: center;">
              <strong>معلم المادة:</strong><br/>
              ${meta.teacherName}<br/>
              التوقيع: .....................
            </td>
            <td style="width: 34%; text-align: center;">
              <strong>الموجه التربوي المختص:</strong><br/>
              ${meta.supervisorName || '.....................'}<br/>
              التوقيع: .....................
            </td>
            <td style="width: 33%; text-align: center;">
              <strong>مدير المدرسة:</strong><br/>
              ${meta.principalName || '.....................'}<br/>
              الختم والتوقيع: .....................
            </td>
          </tr>
        </table>
      </div>
    `;
  }

  // Word-compatible wrapper HTML with XML metadata and MSO CSS
  return `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" 
          xmlns:w="urn:schemas-microsoft-com:office:word" 
          xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <title>الخطة الفصلية لمادة لغتي العربية - ${meta.gradeTitle}</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page {
            size: A4 landscape;
            margin: 1.2cm 1.0cm 1.2cm 1.0cm;
            mso-page-orientation: landscape;
          }
          body {
            font-family: 'Cairo', 'Traditional Arabic', 'Amiri', Arial, sans-serif;
            direction: rtl;
            text-align: right;
            margin: 0;
            padding: 0;
            background-color: #ffffff;
          }
          .page-container {
            width: 100%;
          }
          table {
            border-collapse: collapse;
          }
          th, td {
            mso-line-height-rule: exactly;
          }
          .page-break {
            page-break-after: always;
          }
        </style>
      </head>
      <body>
        ${pagesHtml}
      </body>
    </html>
  `;
}

export function downloadWordDocument(htmlContent: string, fileName: string = 'الخطة_الفصلية_للغة_العربية_الصف_السابع_ج1.doc'): void {
  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8'
  });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = fileName;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
}

export interface DailyPrepExportData {
  schoolName: string;
  governorate?: string;
  directorate?: string;
  teacherName: string;
  teacherEmail?: string;
  gradeTitle: string;
  unitNumberArabic: string;
  unitTitle: string;
  lessonTitle: string;
  branch: string;
  sourcePage: number | string;
  dayName: string;
  periodNumber: number;
  periodDuration: 40 | 35;
  timing: {
    warmup: string;
    activity: string;
    closure: string;
    total: string;
  };
  hijriDate: string;
  miladiDate: string;
  behavioralObjectives: string[];
  mainAim: string;
  strategy: string;
  verificationIndicator: string;
  appliedTask: string;
  differentiationAndSupport: string;
  homework?: string;
}

export function generateDailyPrepWordHtml(data: DailyPrepExportData): string {
  const primaryColor = '#065f46';
  const lightBg = '#f0fdf4';

  return `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" 
          xmlns:w="urn:schemas-microsoft-com:office:word" 
          xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <title>كراس التحضير اليومي - ${data.lessonTitle}</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page {
            size: A4 portrait;
            margin: 1.5cm 1.2cm 1.5cm 1.2cm;
            mso-page-orientation: portrait;
          }
          body {
            font-family: 'Cairo', 'Traditional Arabic', 'Amiri', Arial, sans-serif;
            direction: rtl;
            text-align: right;
            margin: 0;
            padding: 0;
            background-color: #ffffff;
            color: #0f172a;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            mso-line-height-rule: exactly;
            padding: 6px 8px;
            font-size: 10pt;
          }
        </style>
      </head>
      <body>
        <!-- Header -->
        <table dir="rtl" style="margin-bottom: 12px; border-bottom: 2px solid ${primaryColor};">
          <tr>
            <td style="width: 33%; vertical-align: top; font-size: 10.5pt;">
              <strong>الجمهورية اليمنية</strong><br/>
              وزارة التربية والتعليم والبحث العلمي<br/>
              مكتب التربية بمحافظة: ${data.governorate || 'أمانة العاصمة'}<br/>
              مدرسة: <u>${data.schoolName || 'مدرسة إشراق اليمن'}</u>
            </td>
            <td style="width: 34%; text-align: center; vertical-align: middle;">
              <h2 style="margin: 0; color: ${primaryColor}; font-size: 15pt;">كراس التحضير اليومي النموذجي</h2>
              <h3 style="margin: 3px 0; color: #1e293b; font-size: 12pt;">مادة: لغتي العربية — ${data.gradeTitle}</h3>
              <p style="margin: 2px 0; color: #b45309; font-size: 9.5pt; font-weight: bold;">توزيع زمني: ${data.periodDuration} دقيقة (أطول حصة)</p>
            </td>
            <td style="width: 33%; text-align: left; vertical-align: top; font-size: 9.5pt;">
              <strong>إعداد المعلم:</strong> ${data.teacherName}<br/>
              <strong>البريد:</strong> ${data.teacherEmail || 'BIOSKY30@gmail.com'}<br/>
              <strong>التاريخ الهجري:</strong> ${data.hijriDate}<br/>
              <strong>التاريخ الميلادي:</strong> ${data.miladiDate}
            </td>
          </tr>
        </table>

        <!-- Lesson Meta Info Grid -->
        <table dir="rtl" style="border: 1px solid #cbd5e1; margin-bottom: 12px;">
          <tr style="background-color: ${lightBg};">
            <td style="border: 1px solid #cbd5e1; width: 25%;"><strong>الوحدة التعليمية:</strong></td>
            <td style="border: 1px solid #cbd5e1; width: 25%;">${data.unitNumberArabic}: ${data.unitTitle}</td>
            <td style="border: 1px solid #cbd5e1; width: 25%;"><strong>اليوم والحصة:</strong></td>
            <td style="border: 1px solid #cbd5e1; width: 25%;">${data.dayName} (الحصة ${data.periodNumber})</td>
          </tr>
          <tr>
            <td style="border: 1px solid #cbd5e1;"><strong>موضوع الدرس:</strong></td>
            <td style="border: 1px solid #cbd5e1;"><strong>${data.lessonTitle}</strong></td>
            <td style="border: 1px solid #cbd5e1;"><strong>الفرع والصفحة:</strong></td>
            <td style="border: 1px solid #cbd5e1;">${data.branch} (ص: ${data.sourcePage})</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="border: 1px solid #cbd5e1;"><strong>التوقيت (${data.periodDuration} دقيقة):</strong></td>
            <td style="border: 1px solid #cbd5e1;" colspan="3">
              التمهيد والتهيئة: <strong>${data.timing.warmup}</strong> | 
              العرض والأنشطة: <strong>${data.timing.activity}</strong> | 
              التقويم والغلق: <strong>${data.timing.closure}</strong>
            </td>
          </tr>
        </table>

        <!-- Main Preparation Body -->
        <table dir="rtl" style="border: 1px solid #cbd5e1; margin-bottom: 14px;">
          <tr style="background-color: ${primaryColor}; color: #ffffff; font-weight: bold; text-align: center;">
            <th style="border: 1px solid #0f172a; width: 35%; padding: 8px;">الأهداف السلوكية الإجرائية (أن + الفعل)</th>
            <th style="border: 1px solid #0f172a; width: 35%; padding: 8px;">الأنشطة والمهام التطبيقية ومجريات الدرس</th>
            <th style="border: 1px solid #0f172a; width: 30%; padding: 8px;">أساليب التقويم ومؤشرات التحقق</th>
          </tr>
          <tr style="vertical-align: top;">
            <td style="border: 1px solid #cbd5e1; padding: 10px; font-size: 9.5pt;">
              <p style="margin-top: 0; font-weight: bold; color: ${primaryColor};">الهدف الأساسي للحصة:</p>
              <p style="margin-bottom: 8px;">${data.mainAim}</p>
              <p style="margin-top: 8px; font-weight: bold; color: ${primaryColor};">المخرجات السلوكية التفصيلية:</p>
              <ul style="margin: 0; padding-right: 18px; line-height: 1.5;">
                ${data.behavioralObjectives.map(obj => `<li>${obj}</li>`).join('')}
              </ul>
            </td>
            <td style="border: 1px solid #cbd5e1; padding: 10px; font-size: 9.5pt;">
              <p style="margin-top: 0; font-weight: bold; color: #b45309;">استراتيجية التدريس المعتمدة:</p>
              <p style="margin-bottom: 8px;"><strong>${data.strategy}</strong></p>
              <p style="margin-top: 8px; font-weight: bold; color: #b45309;">المهام والأنشطة الصفية:</p>
              <p style="margin-bottom: 8px;">${data.appliedTask}</p>
              <p style="margin-top: 8px; font-weight: bold; color: #b45309;">مراعاة الفروق الفردية والدعم:</p>
              <p style="margin: 0;">${data.differentiationAndSupport}</p>
            </td>
            <td style="border: 1px solid #cbd5e1; padding: 10px; font-size: 9.5pt;">
              <p style="margin-top: 0; font-weight: bold; color: #1e3a8a;">مؤشر تحقق الهدف:</p>
              <p style="margin-bottom: 8px;">${data.verificationIndicator}</p>
              <p style="margin-top: 8px; font-weight: bold; color: #1e3a8a;">الواجب والتكليف المنزلي:</p>
              <p style="margin: 0;">${data.homework || 'حل التدريبات المقررة ومتابعة كراس المهارات'}</p>
            </td>
          </tr>
        </table>

        <!-- Signatures Footer -->
        <table dir="rtl" style="margin-top: 20px;">
          <tr>
            <td style="width: 33%; text-align: center;">
              <strong>معلم المادة:</strong><br/><br/>
              ${data.teacherName}<br/>
              التوقيع: .....................
            </td>
            <td style="width: 34%; text-align: center;">
              <strong>الموجه التربوي المختص:</strong><br/><br/>
              .....................<br/>
              التوقيع: .....................
            </td>
            <td style="width: 33%; text-align: center;">
              <strong>مدير المدرسة:</strong><br/><br/>
              .....................<br/>
              الختم والتوقيع: .....................
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

