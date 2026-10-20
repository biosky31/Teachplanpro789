import { BookIndexRecord } from './bookIndex';

export const YEMENI_GRADE_7_PART_2_INDEX: BookIndexRecord = {
  title: "لغتي العربية",
  grade: "الصف السابع من مرحلة التعليم الأساسي",
  part: "الجزء الثاني",
  stage: "مرحلة التعليم الأساسي (الحلقة الثالثة 7 - 9)",
  academicYear: "1444هـ - 2023م",
  edition: "طبعة تجريبية 1444هـ / 2023م",
  totalPages: 160,
  contentPagesRange: [1, 160],
  approvalDateHijri: "الأربعاء 9 ذو القعدة 1443هـ",
  approvalDateMiladi: "8 يونيو 2022م",
  curriculumDecision: "أقرت اللجنة العليا للمناهج هذا الكتاب بجلستها المنعقدة بتاريخ 9 ذو القعدة 1443هـ الموافق 8 يونيو 2022م",
  
  authoringCommittee: [
    { name: "د. ضيف الله حسين الدريب", role: "رئيساً للفريق" },
    { name: "د. صالح علي النهاري", role: "عضواً" },
    { name: "أ. عبدالوهاب أحمد الدار", role: "عضواً" },
    { name: "أ. أماني محمد المطري", role: "عضواً" },
    { name: "أ. أروى أحمد شرف الدين", role: "عضواً" },
    { name: "أ. محمد يحيى بلابل", role: "عضواً ومنسقاً" }
  ],

  reviewCommittee: [
    { name: "د. خالد عبده الجميلي", role: "مراجعة علمية وتربوية - مركز البحوث والتطوير التربوي" },
    { name: "د. خالد فتح الله الحوصلي", role: "مراجعة علمية وتربوية - مركز البحوث والتطوير التربوي" },
    { name: "د. أمة الباري محمد الحمزي", role: "مراجعة علمية وتربوية - مركز البحوث والتطوير التربوي" },
    { name: "أ. علي محمد سعيد الصائغ", role: "مراجعة علمية وتربوية - مركز البحوث والتطوير التربوي" }
  ],

  artAndDesign: [
    { name: "خالد المطري", role: "التصميم والإخراج الفني" },
    { name: "حسين ضيف الله", role: "التصميم والإخراج الفني" }
  ],

  pedagogicalApproach: "المدخل التكاملي في تعليم فروع اللغة العربية (القراءة والنصوص والتذوق، القواعد النحوية، التطبيقات الإملائية، الخط العربي، التعبير بنوعيه، والتقويم الختامي المتدرج) بما يراعي خصائص نمو المرحلة الأساسية ويعزز الهوية الإيمانية والقيم الوطنية والأخلاقية.",

  verificationLog: {
    totalPagesChecked: 160,
    clearPages: 160,
    unclearPagesCount: 0,
    unclearPagesNotes: [],
    indexingStatus: "مكتمل بنسبة 100% لكامل صفحات الجزء الثاني (160 صفحة) وفق النسخة الرسمية الصادرة عن الإدارة العامة للمناهج."
  },

  unitsIndex: [
    {
      unitNumber: 13,
      unitTitle: "الوحدة الثالثة عشرة: الهوية الإيمانية",
      pageRange: [9, 24],
      readingLesson: { title: "العبادة الحقة (د. مصطفى محمود بتصرف)", page: 10, author: "د. مصطفى محمود" },
      grammarLesson: { title: "النكرة والمعرفة وأنواع المعارف الستة", page: 15 },
      dictationLesson: { title: "تطبيقات إملائية (مراجعة همزتي الوصل والقطع، التاء المربوطة والمفتوحة)", page: 20 },
      calligraphyLesson: { title: "خطا النسخ والرقعة: الحرية الحقة هي حينما تبلغ غاية العبودية لله", page: 22 },
      expressionLesson: { title: "التعبير الشفهي والكتابي: أثر العبادة الحقة في النفس والمجتمع", page: 22 },
      assessmentLesson: { title: "تقويم الوحدة الثالثة عشرة", page: 23 }
    },
    {
      unitNumber: 14,
      unitTitle: "الوحدة الرابعة عشرة: مع الرسول والرسالة",
      pageRange: [25, 39],
      readingLesson: { title: "في وصف المصطفى صلى الله عليه وآله وسلم (نصوص)", page: 26, author: "الإمام علي بن أبي طالب (نهج البلاغة)" },
      grammarLesson: { title: "أنواع الأفعال (الماضي والمضارع والأمر)", page: 31 },
      dictationLesson: { title: "الهمزة المتوسطة على الألف", page: 35 },
      calligraphyLesson: { title: "خطا النسخ والرقعة: تأس بنبيك الأطيب الأطهر", page: 37 },
      expressionLesson: { title: "التعبير الشفهي والكتابي: صفات المصطفى وواجب الاقتداء به", page: 37 },
      assessmentLesson: { title: "تقويم الوحدة الرابعة عشرة", page: 38 }
    },
    {
      unitNumber: 15,
      unitTitle: "الوحدة الخامسة عشرة: الزراعة",
      pageRange: [40, 50],
      readingLesson: { title: "زراعة الحبوب (قراءة علمية واقتصادية)", page: 41 },
      grammarLesson: { title: "من المعارف: الضمير (البارز المنفصل والمتصل، والمستتر)", page: 45 },
      dictationLesson: { title: "تدريبات إملائية (الهمزة المتوسطة على الألف)", page: 48 },
      calligraphyLesson: { title: "خطا النسخ والرقعة: لا تستطيع الأمة أن تدافع عن نفسها وهي فاقدة لقوتها", page: 49 },
      expressionLesson: { title: "التعبير الشفهي والكتابي: الاكتفاء الذاتي وأهمية زراعة الحبوب", page: 49 },
      assessmentLesson: { title: "تقويم الوحدة الخامسة عشرة", page: 50 }
    },
    {
      unitNumber: 16,
      unitTitle: "الوحدة السادسة عشرة: قيم أخلاقية",
      pageRange: [51, 62],
      readingLesson: { title: "أصناف الناس (نصوص وتذوق)", page: 52, author: "الإمام علي بن أبي طالب كرم الله وجهه لكميل بن زياد" },
      grammarLesson: { title: "تطبيقات نحوية على الأفعال والضمائر والمعارف", page: 57 },
      dictationLesson: { title: "الهمزة المتوسطة على الواو", page: 59 },
      calligraphyLesson: { title: "خطا النسخ والرقعة: القلوب أوعية فخيرها أوعاها", page: 61 },
      expressionLesson: { title: "التعبير الشفهي والكتابي: طلب العلم وفضل العلماء الربانيين", page: 61 },
      assessmentLesson: { title: "تقويم الوحدة السادسة عشرة", page: 62 }
    },
    {
      unitNumber: 17,
      unitTitle: "الوحدة السابعة عشرة: قيم اجتماعية",
      pageRange: [63, 75],
      readingLesson: { title: "الأخلاق (نصوص وتذوق شعري)", page: 64, author: "معروف الرصافي (الشاعر العراقي)" },
      grammarLesson: { title: "الفاعل ونائب الفاعل", page: 69 },
      dictationLesson: { title: "تطبيقات إملائية (الهمزة المتوسطة على الألف والواو)", page: 73 },
      calligraphyLesson: { title: "خطا النسخ والرقعة: هي الأخلاق تنبت كالنبات إذا سقيت بماء المكرمات", page: 74 },
      expressionLesson: { title: "التعبير الشفهي والكتابي: دور الأم في تنشئة الأبناء على الفضائل", page: 74 },
      assessmentLesson: { title: "تقويم الوحدة السابعة عشرة", page: 75 }
    },
    {
      unitNumber: 18,
      unitTitle: "الوحدة الثامنة عشرة: مدن أثرية",
      pageRange: [76, 85],
      readingLesson: { title: "مدينة تعز (قراءة تاريخية وجغرافية)", page: 77 },
      grammarLesson: { title: "المفعول به", page: 81 },
      dictationLesson: { title: "الهمزة المتوسطة على الياء (النبرة)", page: 83 },
      calligraphyLesson: { title: "خطا النسخ والرقعة: تعد محافظة تعز قبلة أثرية وسياحية رائعة", page: 84 },
      expressionLesson: { title: "التعبير الشفهي والكتابي: المعالم التاريخية وحماية التراث اليمني", page: 84 },
      assessmentLesson: { title: "تقويم الوحدة الثامنة عشرة", page: 85 }
    },
    {
      unitNumber: 19,
      unitTitle: "الوحدة التاسعة عشرة: الأسرة المسلمة",
      pageRange: [86, 97],
      readingLesson: { title: "رعاية الأبناء (قراءة تربوية واجتماعية)", page: 87 },
      grammarLesson: { title: "المفعول المطلق والمفعول لأجله", page: 91 },
      dictationLesson: { title: "تطبيقات على كتابة الهمزة المتوسطة بأنواعها", page: 95 },
      calligraphyLesson: { title: "خطا النسخ والرقعة: الأسرة في الإسلام لها دور كبير في رعاية الأبناء", page: 95 },
      expressionLesson: { title: "التعبير الشفهي والكتابي: مسؤولية الوالدين وحقوق الأبناء", page: 96 },
      assessmentLesson: { title: "تقويم الوحدة التاسعة عشرة", page: 97 }
    },
    {
      unitNumber: 20,
      unitTitle: "الوحدة العشرون: شخصيات وأعلام جهادية",
      pageRange: [98, 110],
      readingLesson: { title: "راغب حرب.. المقاومة والجهاد (قراءة سير وأعلام)", page: 99 },
      grammarLesson: { title: "الظرف وأنواعه (ظرف الزمان وظرف المكان / المفعول فيه)", page: 103 },
      dictationLesson: { title: "كتابة الضمائر بعد هاء التنبيه", page: 106 },
      calligraphyLesson: { title: "خطا النسخ والرقعة: كان الشيخ راغب حرب مجاهداً عظيماً", page: 109 },
      expressionLesson: { title: "التعبير الشفهي والكتابي: الصمود في وجه العدوان والاحتلال", page: 109 },
      assessmentLesson: { title: "تقويم الوحدة العشرين", page: 110 }
    },
    {
      unitNumber: 21,
      unitTitle: "الوحدة الحادية والعشرون: الوعي الثقافي",
      pageRange: [111, 122],
      readingLesson: { title: "عاشوراء طريق الحرية (قراءة فكرية وجهادية)", page: 112 },
      grammarLesson: { title: "الحال (المفردة والجملة)", page: 117 },
      dictationLesson: { title: "تطبيقات على الهمزة المتوسطة في جميع أحوالها", page: 120 },
      calligraphyLesson: { title: "خطا النسخ والرقعة: شعبنا اليمني يعيش الواقع الكربلائي فعلاً", page: 121 },
      expressionLesson: { title: "التعبير الشفهي والكتابي: انتصار الدم على السيف والتحرر من الظلم", page: 121 },
      assessmentLesson: { title: "تقويم الوحدة الحادية والعشرين", page: 122 }
    },
    {
      unitNumber: 22,
      unitTitle: "الوحدة الثانية والعشرون: قضايا وطنية",
      pageRange: [123, 133],
      readingLesson: { title: "نشيد البراءة (نصوص وتذوق)", page: 124, author: "زيد علي مصلح (ديوان فجر الشهادة)" },
      grammarLesson: { title: "التمييز (تمييز الذات وتمييز النسبة والعدد)", page: 128 },
      dictationLesson: { title: "إملاء اختباري وتطبيقات شاملة", page: 131 },
      calligraphyLesson: { title: "خطا النسخ والرقعة: لإلهي أخضعت جبيني ووهبت الروح لدين الله", page: 132 },
      expressionLesson: { title: "التعبير الشفهي والكتابي: التضحية والوفاء لدماء الشهداء", page: 132 },
      assessmentLesson: { title: "تقويم الوحدة الثانية والعشرين", page: 133 }
    },
    {
      unitNumber: 23,
      unitTitle: "الوحدة الثالثة والعشرون: من مخلوقات الله",
      pageRange: [134, 146],
      readingLesson: { title: "القمر (قراءة علمية وفلكية)", page: 135 },
      grammarLesson: { title: "المجرور بالحرف والمجرور بالإضافة", page: 139 },
      dictationLesson: { title: "تطبيقات إملائية واختبارية", page: 143 },
      calligraphyLesson: { title: "خطا النسخ والرقعة: سبحان الله! الكون أرحب وأعظم مما نتخيله", page: 143 },
      expressionLesson: { title: "التعبير الشفهي والكتابي: عظمة الكون ودلائل قدرة الخالق", page: 144 },
      assessmentLesson: { title: "تقويم الوحدة الثالثة والعشرين", page: 145 }
    },
    {
      unitNumber: 24,
      unitTitle: "الوحدة الرابعة والعشرون: نوادر وفكاهات",
      pageRange: [147, 158],
      readingLesson: { title: "طرائف مختارة (نزاع الهدهد والغراب، كما تدين تدان)", page: 148 },
      grammarLesson: { title: "تطبيقات نحوية شاملة لما سبقت دراسته في الجزء الثاني", page: 152 },
      dictationLesson: { title: "تطبيقات إملائية شاملة لما سبقت دراسته في الجزء الثاني", page: 155 },
      calligraphyLesson: { title: "خطا النسخ والرقعة: لست ممن يشتهر بصفة ويفعل خلافها", page: 156 },
      expressionLesson: { title: "التعبير الشفهي والكتابي: أثر الصدق في القول والمعاملة", page: 156 },
      assessmentLesson: { title: "تقويم الوحدة الرابعة والعشرين", page: 157 }
    }
  ]
};
