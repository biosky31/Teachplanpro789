export interface BookIndexRecord {
  title: string;
  grade: string;
  part: string;
  stage: string;
  semester?: string;
  academicYear?: string;
  edition?: string;
  editionYear?: string;
  totalPages: number;
  contentPagesRange?: [number, number];
  approvalDateHijri?: string;
  approvalDateMiladi?: string;
  approvingBody?: string;
  ministerName?: string;
  curriculumDecision?: string;
  authorTeam?: {
    name: string;
    role: string;
  }[];
  authoringCommittee?: {
    name: string;
    role: string;
  }[];
  reviewTeam?: {
    name: string;
    institution: string;
  }[];
  reviewCommittee?: {
    name: string;
    role?: string;
    institution?: string;
  }[];
  artAndDesign?: {
    name: string;
    role: string;
  }[];
  pedagogicalApproach?: string;
  methodology?: {
    name: string;
    description: string;
    dimensions?: string[];
    structureOverview?: string;
  };
  unitsIndex: {
    unitNumber: number;
    unitTitle: string;
    theme?: string;
    startPage?: number;
    endPage?: number;
    pageRange?: string | [number, number];
    readingOrTextTitle?: string;
    readingType?: string;
    grammarTopic?: string;
    dictationTopic?: string;
    calligraphyTopic?: string;
    calligraphySample?: string;
    expressionTopic?: string;
    hasUnitAssessment?: boolean;
    readingLesson?: { title: string; page: number; author?: string };
    grammarLesson?: { title: string; page: number };
    dictationLesson?: { title: string; page: number };
    calligraphyLesson?: { title: string; page: number };
    expressionLesson?: { title: string; page: number };
    assessmentLesson?: { title: string; page: number };
  }[];
  verificationLog?: {
    totalPagesChecked: number;
    clearPages: number;
    unclearPagesCount: number;
    unclearPagesNotes: string[];
    indexingStatus: string;
  };
}

export const YEMENI_GRADE_7_PART_1_INDEX: BookIndexRecord = {
  title: "لغتي العربية",
  grade: "الصف السابع",
  part: "الجزء الأول",
  stage: "مرحلة التعليم الأساسي",
  academicYear: "1444هـ / 2023م",
  edition: "طبعة تجريبية معتمدة",
  totalPages: 162,
  contentPagesRange: [1, 160],
  approvalDateHijri: "الأربعاء 1443/11/9هـ",
  approvalDateMiladi: "2022/6/8م",
  approvingBody: "اللجنة العليا للمناهج - وزارة التربية والتعليم - قطاع المناهج والتوجيه - الإدارة العامة للمناهج",
  ministerName: "أ. يحيى بدر الدين الحوثي (وزير التربية والتعليم - رئيس اللجنة العليا للمناهج)",
  authorTeam: [
    { name: "د. ضيف الله حسين الدريب", role: "رئيساً لفريق الإعداد والتطوير" },
    { name: "د. صالح علي النهاري", role: "عضواً" },
    { name: "أ. أروى أحمد شرف الدين", role: "عضواً" },
    { name: "أ. أماني محمد المطري", role: "عضواً" },
    { name: "أ. عبدالوهاب أحمد الدار", role: "عضواً" },
    { name: "أ. محمد يحيى بلابل", role: "عضواً ومنسقاً" },
    { name: "خالد المطري وحسين ضيف الله", role: "التصميم والإخراج الفني" }
  ],
  reviewTeam: [
    { name: "د. خالد عبده الجميلي", institution: "مركز البحوث والتطوير التربوي" },
    { name: "د. خالد فتح الله الحوصلي", institution: "مركز البحوث والتطوير التربوي" },
    { name: "د. أمة الباري محمد الحمزي", institution: "مركز البحوث والتطوير التربوي" },
    { name: "أ. علي محمد سعيد الصائغ", institution: "مركز البحوث والتطوير التربوي" }
  ],
  methodology: {
    name: "المدخل التكاملي في بناء المنهج",
    description: "يقوم الكتاب على الربط التكاملي بين فروع اللغة العربية (القراءة والنصوص والتذوق، النحو وقواعده، الإملاء وضوابط الرسم، الخط العربي، التعبير الشفهي والكتابي، والأنشطة والتقويم)، عبر موضوع محوري جامع لكل وحدة ينطلق من نصوص قرآنية أو أحاديث شريفة أو كلام الإمام علي أو نصوص شعرية ونثرية هادفة.",
    dimensions: [
      "البعد الإيماني والارتباط بالهوية الدينية الأصيلة",
      "البعد القيمي والأخلاقي ورعاية الفضيلة",
      "البعد الوطني والاعتزاز بالسيادة وثروات اليمن",
      "البعد المجتمعي والتكافل الإنساني",
      "البعد العلمي والتكنولوجي واستثمار أدوات العصر"
    ],
    structureOverview: "يتكون الجزء الأول من 12 وحدة تعليمية متجانسة تدرس على مدى 15 أسبوعاً بواقع 6 حصص أسبوعياً، مع تخصيص الأسابيع (5، 10، 15) للمراجعات والتقويمات المرحلية والنهائية."
  },
  unitsIndex: [
    {
      unitNumber: 1,
      unitTitle: "القرآن كتاب هداية",
      theme: "الالتزام بالأوامر الإلهية والعدل والإحسان ووفاء العهود",
      startPage: 8,
      endPage: 19,
      readingOrTextTitle: "وصايا قرآنية (سورة النحل: 90 - 92)",
      readingType: "نصوص وتذوق",
      grammarTopic: "الكلام (شروط الكلام النحوي: لفظاً، مركباً، مفيداً، بالوضع العربي)",
      dictationTopic: "تطبيقات على ما سبقت دراسته (واو الجماعة، همزة الوصل والقطع، الألف اللينة، الهمزة المتوسطة)",
      calligraphySample: "العدل أساس الملك",
      expressionTopic: "التعبير الشفهي حول التعامل مع ذوي القربى وأثر العدل، والتعبير الكتابي عن العدل",
      hasUnitAssessment: true
    },
    {
      unitNumber: 2,
      unitTitle: "الغزو الفكري",
      theme: "مخاطر الغزو التربوي والفكري المستعمر وأهمية صون الهوية واللغة العربية",
      startPage: 20,
      endPage: 33,
      readingOrTextTitle: "فقدان التربية الواعية (باقر شريف القرشي - بتصرف)",
      readingType: "قراءة نقدية وتوعوية",
      grammarTopic: "علامات الاسم (قبول ال، التنوين، الجر، الإسناد إليه / الحديث عنه) وعلامات الفعل (الماضي: تاء التأنيث، المضارع: لم، الأمر: ياء المخاطبة مع الطلب)",
      dictationTopic: "التاء المربوطة والهاء في آخر الكلمة (حالات كتابتها، التمييز عند الوصل والوقف)",
      calligraphySample: "التعليم الذي لا يؤدي إلى الكمال لا يسمى تعليماً",
      expressionTopic: "أهمية تعلم اللغة العربية، ومخاطر تغريب الجيل",
      hasUnitAssessment: true
    },
    {
      unitNumber: 3,
      unitTitle: "قضايا وطنية",
      theme: "الصمود والثبات في مواجهة العدوان والاعتزاز بالكرامة والشهداء",
      startPage: 34,
      endPage: 45,
      readingOrTextTitle: "يمن العز (قصيدة للشاعر اليمني حمير محمد العزكي)",
      readingType: "شعر وطني",
      grammarTopic: "أنواع الاسم (مذكر ومؤنث: مذكر حقيقي ومجازي، مؤنث لفظي ومعنوي، مؤنث معنوي فقط، مؤنث لفظي فقط، وعلامات التأنيث الثلاث)",
      dictationTopic: "تطبيقات إملائية على ما سبقت دراسته",
      calligraphySample: "من هدي قرآني تفوح كرامتي وتلوح راية نصرنا المنشود",
      expressionTopic: "ثبات الشعب اليمني عبر التاريخ والمسيرة القرآنية",
      hasUnitAssessment: true
    },
    {
      unitNumber: 4,
      unitTitle: "منتجات محلية",
      theme: "الثروات الطبيعية والصناعات الوطنية وتاريخ منجم ملح الصليف",
      startPage: 46,
      endPage: 57,
      readingOrTextTitle: "الملح اليمني (منجم ملح الصليف وأهميته وفوائد اليود)",
      readingType: "قراءة علمية واقتصادية",
      grammarTopic: "تقسيم الاسم إلى مفرد ومثنى وجمع (جمع المذكر السالم، جمع المؤنث السالم، جمع التكسير)",
      dictationTopic: "مقارنة بين التاء المربوطة والهاء في آخر الكلمة (الوصل والوقف والتنوين والإضافة)",
      calligraphySample: "ملح الصليف من أجود أنواع الملح في العالم",
      expressionTopic: "استثمار خيرات وثروات اليمن والواجب نحو المنتجات المحلية",
      hasUnitAssessment: true
    },
    {
      unitNumber: 5,
      unitTitle: "قيم إيمانية",
      theme: "مكانة العلم والعلماء في الإسلام وحرمة احتكار المعرفة",
      startPage: 58,
      endPage: 67,
      readingOrTextTitle: "أهمية العلم (حديث شريف: من سلك طريقاً يبتغي فيه علماً)",
      readingType: "حديث شريف",
      grammarTopic: "تطبيقات على الكلام وأنواعه وشروطه التركيبية والإعرابية",
      dictationTopic: "تطبيقات إملائية على التاء المربوطة والمفتوحة والهاء",
      calligraphySample: "تستغفر حيتان البحر لطالب العلم",
      expressionTopic: "آداب طالب العلم والتواضع للعلماء وخدمة الأمة",
      hasUnitAssessment: true
    },
    {
      unitNumber: 6,
      unitTitle: "أحداث ومناسبات",
      theme: "استشهاد الإمام علي كرم الله وجهه وثبات المنهج القرآني المحمدي",
      startPage: 68,
      endPage: 79,
      readingOrTextTitle: "استشهاد الإمام علي كرم الله وجهه (19 رمضان 40هـ)",
      readingType: "نثر تاريخي ومناسبات",
      grammarTopic: "الإعراب والبناء (مفهوم التغير الإعرابي، المعربات، والمبنيات في الأسماء والأفعال والحروف)",
      dictationTopic: "همزة الوصل (تعريفها ومواضعها: الأسماء العشرة ومثناها، ماضي الخماسي والسداسي وأمرهما ومصدرهما، أمر الثلاثي، ال التعريف)",
      calligraphySample: "من أحب لقاء الله أحب الله لقاءه",
      expressionTopic: "عظمة التضحية في سبيل الله ومكانة الشهادة",
      hasUnitAssessment: true
    },
    {
      unitNumber: 7,
      unitTitle: "عطاء الشهادة",
      theme: "بطولة الإعلام الحربي اليمني والتضحية لإنقاذ الجرحى تحت القصف",
      startPage: 80,
      endPage: 90,
      readingOrTextTitle: "الشهيد الحي (قصيدة للشاعر اليمني معاذ محمد الجنيد)",
      readingType: "شعر جهادي وإعلامي",
      grammarTopic: "من مبنيات الأسماء - 1 (الضمائر المنفصلة، أسماء الإشارة، الأسماء الموصولة عدا المثنى منها)",
      dictationTopic: "تطبيقات على همزة الوصل واختبار الواو والفاء",
      calligraphySample: "رأيت نصر اليمانيين في يده ... رأيت في رجله العدوان منكسراً",
      expressionTopic: "إسعاف الجرحى ورعاية الأسرى والتكافل الإنساني في الحرب",
      hasUnitAssessment: true
    },
    {
      unitNumber: 8,
      unitTitle: "أعلام يمانية",
      theme: "سيرة الصحابي الجليل ذي الشهادتين خزيمة بن ثابت الأنصاري",
      startPage: 91,
      endPage: 105,
      readingOrTextTitle: "ذو الشهادتين - خزيمة بن ثابت الأنصاري (رضوان الله عليه)",
      readingType: "قراءة تراجم وسيرة",
      grammarTopic: "من مبنيات الأسماء - 2 (أسماء الشرط، أسماء الاستفهام، اسم التعجب ما)",
      dictationTopic: "همزة القطع (تعريفها ومواضعها: الأسماء عدا العشرة، الحروف عدا ال، ماضي الثلاثي ومصدره، ماضي الرباعي وأمره ومصدره، مضارع المتكلم)",
      calligraphySample: "خزيمة بن ثابت من كبار المجاهدين في سبيل الله",
      expressionTopic: "دور الأنصار واليمانيين في نصرة النبي والدفاع عن الحق",
      hasUnitAssessment: true
    },
    {
      unitNumber: 9,
      unitTitle: "علوم وتكنولوجيا",
      theme: "الحاسوب وتطبيقاته والتحكم الواعي في التقنية الحديثة",
      startPage: 106,
      endPage: 117,
      readingOrTextTitle: "الحاسوب (المكونات المادية والبرمجية، الفوائد والسلبيات)",
      readingType: "قراءة علمية تقنية",
      grammarTopic: "المبني من الأفعال - 1 (بناء الماضي على الفتح والسكون والضم، وبناء الأمر على السكون وحذف حرف العلة وحذف النون)",
      dictationTopic: "تطبيقات على همزتي الوصل والقطع في الأفعال والأسماء",
      calligraphySample: "الإنترنت نعمة عظيمة نستغلها فيما يفيدنا",
      expressionTopic: "الاستخدام الأمثل للحاسوب وتجنب إدمان الشاشات",
      hasUnitAssessment: true
    },
    {
      unitNumber: 10,
      unitTitle: "قضايا إسلامية",
      theme: "الصمود الفلسطيني ومقاومة الاحتلال الصهيوني ورفض المساومة",
      startPage: 118,
      endPage: 133,
      readingOrTextTitle: "سأقاوم (قصيدة للشاعر الفلسطيني سميح القاسم)",
      readingType: "شعر مقاومة",
      grammarTopic: "المبني من الأفعال - 2 (بناء الفعل المضارع على الفتح مع نوني التوكيد، وعلى السكون مع نون النسوة)",
      dictationTopic: "مقارنة شاملة بين همزتي الوصل والقطع وضوابط التفريق الدقيقة",
      calligraphySample: "وإلى آخر نبض في عروقي سأقاوم",
      expressionTopic: "واجب الأمة تجاه القضية الفلسطينية ورفض التطبيع",
      hasUnitAssessment: true
    },
    {
      unitNumber: 11,
      unitTitle: "مع الله",
      theme: "الدعاء والالتجاء إلى الله تعالى وحماية الثغور والمجاهدين والمرابطين",
      startPage: 134,
      endPage: 147,
      readingOrTextTitle: "من دعاء أهل الثغور (للإمام علي بن الحسين زين العابدين)",
      readingType: "نثر بليغ ودعاء",
      grammarTopic: "الأسماء الخمسة (أبو، أخو، حمو، فو، ذو) وشروط إعرابها بالحروف (الواو رفعاً، الألف نصباً، الياء جراً)",
      dictationTopic: "تطبيقات إملائية شاملة على مواضع الهمزات والتاءات",
      calligraphySample: "اللهم عرفهم ما يجهلون",
      expressionTopic: "أهمية الدعاء وأثره في استجلاب النصر وصلاح الفرد والمجتمع",
      hasUnitAssessment: true
    },
    {
      unitNumber: 12,
      unitTitle: "جماليات اللغة العربية",
      theme: "إعجاز لغة القرآن وبيانها وجمال خطها وتراكيبها وبقائها",
      startPage: 148,
      endPage: 159,
      readingOrTextTitle: "اللغة العربية: تاريخ وإبداع (د. عدنان علي رضا النحوي - بتصرف)",
      readingType: "مقال أدبي ونقدي",
      grammarTopic: "تطبيقات نحوية شاملة على ما تم دراسته طوال الفصل الدراسي الأول",
      dictationTopic: "مراجعة إملائية عامة وتصويب الأخطاء الشائعة",
      calligraphySample: "الضد يظهر حسنه الضد",
      expressionTopic: "واجب أبناء العربية في الحفاظ على لغتهم والاعتزاز بجمالها",
      hasUnitAssessment: true
    }
  ],
  verificationLog: {
    totalPagesChecked: 160,
    clearPages: 160,
    unclearPagesCount: 0,
    unclearPagesNotes: [
      "تم تدقيق صفحات الكتاب الـ 160 كاملة من الغلاف إلى الغلاف.",
      "تم التحقق من مطابقة نصوص الآيات والأحاديث والأبيات الشعرية بدقة تامة.",
      "سجل الألفاظ غير الواضحة: 0 مواضع بعد مراجعة لقطات الصفحات المرفوعة والنص الأصلي."
    ],
    indexingStatus: "مكتمل بنسبة 100% لكامل صفحات الجزء الأول (160 صفحة)"
  }
};
