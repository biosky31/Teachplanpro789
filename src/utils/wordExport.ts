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
              <strong>المعلم / المعد:</strong> ${meta.teacherName || 'أ. بايسكاي (BIOSKY30)'} ${meta.teacherEmail ? `(${meta.teacherEmail})` : ''}<br/>
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
