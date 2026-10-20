export interface OfficialSchoolCalendarEvent {
  eventNumber: number;
  title: string;
  dayName: string;
  hijriDate: string;
  miladiDate: string;
  phase: 'pre_school' | 'semester_1' | 'semester_2' | 'general_exams';
  notes?: string;
}

export interface OfficialSchoolCalendar {
  decreeNumber: string;
  academicYearHijri: string;
  academicYearMiladi: string;
  decreeDateHijri: string;
  decreeDateMiladi: string;
  ministerName: string;
  ministryName: string;
  totalStudyDaysYear: number;
  semester1: {
    actualStudyDays: number;
    finalExamsDays: number;
    totalActualDays: number;
    prepDays: number;
    actualWeeks: number;
    weeklyDays: number;
    weeklyDaysDescription: string;
    holidaysCount: {
      weekly: number;
      religious: number;
      national: number;
      midYearBreak: number;
      total: number;
    };
    startDateHijri: string;
    startDateMiladi: string;
    endDateHijri: string;
    endDateMiladi: string;
    examsStartDateHijri: string;
    examsStartDateMiladi: string;
    midYearBreakStartDateHijri: string;
    midYearBreakStartDateMiladi: string;
  };
  semester2: {
    actualStudyDays: number;
    finalExamsDays: number;
    totalActualDays: number;
    prepDays: number;
    actualWeeks: number;
    weeklyDays: number;
    weeklyDaysDescription: string;
    holidaysCount: {
      weekly: number;
      religious: number;
      national: number;
      total: number;
    };
    startDateHijri: string;
    startDateMiladi: string;
    endDateHijri: string;
    endDateMiladi: string;
    examsStartDateHijri: string;
    examsStartDateMiladi: string;
    basicGrade9ExamsDateHijri: string;
    basicGrade9ExamsDateMiladi: string;
    secondaryExamsDateHijri: string;
    secondaryExamsDateMiladi: string;
  };
  events: OfficialSchoolCalendarEvent[];
  weekDatesMappingS1: {
    weekNumber: number;
    startDaySaturdayHijri: string;
    startDaySaturdayMiladi: string;
    endDayWednesdayHijri: string;
    endDayWednesdayMiladi: string;
    isReviewWeek: boolean;
    weekTitle: string;
  }[];
  weekDatesMappingS2?: {
    weekNumber: number;
    startDaySaturdayHijri: string;
    startDaySaturdayMiladi: string;
    endDayWednesdayHijri: string;
    endDayWednesdayMiladi: string;
    isReviewWeek: boolean;
    weekTitle: string;
  }[];
}

export const YEMEN_OFFICIAL_CALENDAR_1447_1448: OfficialSchoolCalendar = {
  decreeNumber: "قرار وزاري للعام الدراسي 1447 / 1448هـ",
  academicYearHijri: "1447 / 1448هـ",
  academicYearMiladi: "2026 / 2027م",
  decreeDateHijri: "20 ذو الحجة 1447هـ",
  decreeDateMiladi: "6 يونيو 2026م",
  ministerName: "حسن عبد الله الصعدي",
  ministryName: "وزارة التربية والتعليم والبحث العلمي - الإدارة العامة للشؤون القانونية",
  totalStudyDaysYear: 268,
  semester1: {
    actualStudyDays: 70,
    finalExamsDays: 6,
    totalActualDays: 76,
    prepDays: 9,
    actualWeeks: 15,
    weeklyDays: 5,
    weeklyDaysDescription: "عدد أيام الأسبوع الدراسي (5) أيام تبدأ يوم السبت وتنتهي يوم الأربعاء (مادة 2)",
    holidaysCount: {
      weekly: 25,
      religious: 2,
      national: 4,
      midYearBreak: 5,
      total: 81
    },
    startDateHijri: "5 محرم 1448هـ",
    startDateMiladi: "20 يونيو 2026م",
    endDateHijri: "17 ربيع الآخر 1448هـ",
    endDateMiladi: "28 سبتمبر 2026م",
    examsStartDateHijri: "18 ربيع الآخر 1448هـ",
    examsStartDateMiladi: "29 سبتمبر 2026م",
    midYearBreakStartDateHijri: "29 ربيع الآخر 1448هـ",
    midYearBreakStartDateMiladi: "10 أكتوبر 2026م"
  },
  semester2: {
    actualStudyDays: 72,
    finalExamsDays: 6,
    totalActualDays: 78,
    prepDays: 9,
    actualWeeks: 15,
    weeklyDays: 5,
    weeklyDaysDescription: "عدد أيام الأسبوع الدراسي (5) أيام تبدأ يوم السبت وتنتهي يوم الأربعاء",
    holidaysCount: {
      weekly: 25,
      religious: 0,
      national: 0,
      total: 25
    },
    startDateHijri: "6 جمادى الأولى 1448هـ",
    startDateMiladi: "17 أكتوبر 2026م",
    endDateHijri: "17 شعبان 1448هـ",
    endDateMiladi: "25 يناير 2027م",
    examsStartDateHijri: "18 شعبان 1448هـ",
    examsStartDateMiladi: "26 يناير 2027م",
    basicGrade9ExamsDateHijri: "13 شوال 1448هـ",
    basicGrade9ExamsDateMiladi: "21 مارس 2027م",
    secondaryExamsDateHijri: "12 شوال 1448هـ",
    secondaryExamsDateMiladi: "20 مارس 2027م"
  },
  events: [
    {
      eventNumber: 1,
      title: "انتظام دوام الإدارات المدرسية، وبدء عملية القيد والتسجيل والانتقال",
      dayName: "السبت",
      hijriDate: "20 ذو الحجة 1447هـ",
      miladiDate: "6 يونيو 2026م",
      phase: "pre_school"
    },
    {
      eventNumber: 2,
      title: "انتظام دوام هيئة التدريس في جميع صفوف المراحل الدراسية",
      dayName: "السبت",
      hijriDate: "27 ذو الحجة 1447هـ",
      miladiDate: "13 يونيو 2026م",
      phase: "pre_school"
    },
    {
      eventNumber: 3,
      title: "بدء الدراسة الفعلية للفصل الدراسي الأول في جميع المراحل الدراسية",
      dayName: "السبت",
      hijriDate: "5 محرم 1448هـ",
      miladiDate: "20 يونيو 2026م",
      phase: "semester_1"
    },
    {
      eventNumber: 4,
      title: "انتهاء الدراسة الفعلية للفصل الدراسي الأول في جميع صفوف المراحل الدراسية",
      dayName: "الإثنين",
      hijriDate: "17 ربيع الآخر 1448هـ",
      miladiDate: "28 سبتمبر 2026م",
      phase: "semester_1"
    },
    {
      eventNumber: 5,
      title: "بدء اختبارات النقل المدرسية لنهاية الفصل الدراسي الأول لجميع المراحل",
      dayName: "الثلاثاء",
      hijriDate: "18 ربيع الآخر 1448هـ",
      miladiDate: "29 سبتمبر 2026م",
      phase: "semester_1"
    },
    {
      eventNumber: 6,
      title: "بدء إجازة منتصف العام الدراسي",
      dayName: "السبت",
      hijriDate: "29 ربيع الآخر 1448هـ",
      miladiDate: "10 أكتوبر 2026م",
      phase: "semester_1"
    },
    {
      eventNumber: 7,
      title: "بدء الدراسة الفعلية للفصل الدراسي الثاني في جميع المراحل الدراسية",
      dayName: "السبت",
      hijriDate: "6 جمادى الأولى 1448هـ",
      miladiDate: "17 أكتوبر 2026م",
      phase: "semester_2"
    },
    {
      eventNumber: 8,
      title: "انتهاء الدراسة الفعلية للفصل الدراسي الثاني في جميع المراحل الدراسية",
      dayName: "الإثنين",
      hijriDate: "17 شعبان 1448هـ",
      miladiDate: "25 يناير 2027م",
      phase: "semester_2"
    },
    {
      eventNumber: 9,
      title: "بدء اختبارات النقل المدرسية لنهاية الفصل الدراسي الثاني لجميع المراحل",
      dayName: "الثلاثاء",
      hijriDate: "18 شعبان 1448هـ",
      miladiDate: "26 يناير 2027م",
      phase: "semester_2"
    },
    {
      eventNumber: 10,
      title: "بدء الاختبارات العامة للشهادة الثانوية العامة (العلمي والأدبي)",
      dayName: "السبت",
      hijriDate: "12 شوال 1448هـ",
      miladiDate: "20 مارس 2027م",
      phase: "general_exams"
    },
    {
      eventNumber: 11,
      title: "بدء الاختبارات العامة للشهادة الأساسية العامة (الصف التاسع)",
      dayName: "الأحد",
      hijriDate: "13 شوال 1448هـ",
      miladiDate: "21 مارس 2027م",
      phase: "general_exams"
    }
  ],
  weekDatesMappingS1: [
    {
      weekNumber: 1,
      startDaySaturdayHijri: "5 محرم 1448هـ",
      startDaySaturdayMiladi: "20 يونيو 2026م",
      endDayWednesdayHijri: "9 محرم 1448هـ",
      endDayWednesdayMiladi: "24 يونيو 2026م",
      isReviewWeek: false,
      weekTitle: "الوحدة الأولى: القرآن كتاب هداية"
    },
    {
      weekNumber: 2,
      startDaySaturdayHijri: "12 محرم 1448هـ",
      startDaySaturdayMiladi: "27 يونيو 2026م",
      endDayWednesdayHijri: "16 محرم 1448هـ",
      endDayWednesdayMiladi: "1 يوليو 2026م",
      isReviewWeek: false,
      weekTitle: "الوحدة الثانية: الغزو الفكري"
    },
    {
      weekNumber: 3,
      startDaySaturdayHijri: "19 محرم 1448هـ",
      startDaySaturdayMiladi: "4 يوليو 2026م",
      endDayWednesdayHijri: "23 محرم 1448هـ",
      endDayWednesdayMiladi: "8 يوليو 2026م",
      isReviewWeek: false,
      weekTitle: "الوحدة الثالثة: قضايا وطنية"
    },
    {
      weekNumber: 4,
      startDaySaturdayHijri: "26 محرم 1448هـ",
      startDaySaturdayMiladi: "11 يوليو 2026م",
      endDayWednesdayHijri: "1 صفر 1448هـ",
      endDayWednesdayMiladi: "15 يوليو 2026م",
      isReviewWeek: false,
      weekTitle: "الوحدة الرابعة: منتجات محلية"
    },
    {
      weekNumber: 5,
      startDaySaturdayHijri: "4 صفر 1448هـ",
      startDaySaturdayMiladi: "18 يوليو 2026م",
      endDayWednesdayHijri: "8 صفر 1448هـ",
      endDayWednesdayMiladi: "22 يوليو 2026م",
      isReviewWeek: true,
      weekTitle: "أسبوع المراجعة الشاملة للوحدات (1 - 4) + الامتحان الشهري الأول"
    },
    {
      weekNumber: 6,
      startDaySaturdayHijri: "11 صفر 1448هـ",
      startDaySaturdayMiladi: "25 يوليو 2026م",
      endDayWednesdayHijri: "15 صفر 1448هـ",
      endDayWednesdayMiladi: "29 يوليو 2026م",
      isReviewWeek: false,
      weekTitle: "الوحدة الخامسة: قيم إيمانية"
    },
    {
      weekNumber: 7,
      startDaySaturdayHijri: "18 صفر 1448هـ",
      startDaySaturdayMiladi: "1 أغسطس 2026م",
      endDayWednesdayHijri: "22 صفر 1448هـ",
      endDayWednesdayMiladi: "5 أغسطس 2026م",
      isReviewWeek: false,
      weekTitle: "الوحدة السادسة: أحداث ومناسبات"
    },
    {
      weekNumber: 8,
      startDaySaturdayHijri: "25 صفر 1448هـ",
      startDaySaturdayMiladi: "8 أغسطس 2026م",
      endDayWednesdayHijri: "29 صفر 1448هـ",
      endDayWednesdayMiladi: "12 أغسطس 2026م",
      isReviewWeek: false,
      weekTitle: "الوحدة السابعة: عطاء الشهادة"
    },
    {
      weekNumber: 9,
      startDaySaturdayHijri: "2 ربيع الأول 1448هـ",
      startDaySaturdayMiladi: "15 أغسطس 2026م",
      endDayWednesdayHijri: "6 ربيع الأول 1448هـ",
      endDayWednesdayMiladi: "19 أغسطس 2026م",
      isReviewWeek: false,
      weekTitle: "الوحدة الثامنة: أعلام يمانية"
    },
    {
      weekNumber: 10,
      startDaySaturdayHijri: "9 ربيع الأول 1448هـ",
      startDaySaturdayMiladi: "22 أغسطس 2026م",
      endDayWednesdayHijri: "13 ربيع الأول 1448هـ",
      endDayWednesdayMiladi: "26 أغسطس 2026م",
      isReviewWeek: true,
      weekTitle: "أسبوع المراجعة الشاملة للوحدات (5 - 8) + الامتحان الشهري الثاني"
    },
    {
      weekNumber: 11,
      startDaySaturdayHijri: "16 ربيع الأول 1448هـ",
      startDaySaturdayMiladi: "29 أغسطس 2026م",
      endDayWednesdayHijri: "20 ربيع الأول 1448هـ",
      endDayWednesdayMiladi: "2 سبتمبر 2026م",
      isReviewWeek: false,
      weekTitle: "الوحدة التاسعة: علوم وتكنولوجيا"
    },
    {
      weekNumber: 12,
      startDaySaturdayHijri: "23 ربيع الأول 1448هـ",
      startDaySaturdayMiladi: "5 سبتمبر 2026م",
      endDayWednesdayHijri: "27 ربيع الأول 1448هـ",
      endDayWednesdayMiladi: "9 سبتمبر 2026م",
      isReviewWeek: false,
      weekTitle: "الوحدة العاشرة: قضايا إسلامية"
    },
    {
      weekNumber: 13,
      startDaySaturdayHijri: "1 ربيع الآخر 1448هـ",
      startDaySaturdayMiladi: "12 سبتمبر 2026م",
      endDayWednesdayHijri: "5 ربيع الآخر 1448هـ",
      endDayWednesdayMiladi: "16 سبتمبر 2026م",
      isReviewWeek: false,
      weekTitle: "الوحدة الحادية عشرة: مع الله"
    },
    {
      weekNumber: 14,
      startDaySaturdayHijri: "8 ربيع الآخر 1448هـ",
      startDaySaturdayMiladi: "19 سبتمبر 2026م",
      endDayWednesdayHijri: "12 ربيع الآخر 1448هـ",
      endDayWednesdayMiladi: "23 سبتمبر 2026م",
      isReviewWeek: false,
      weekTitle: "الوحدة الثانية عشرة: جماليات اللغة العربية"
    },
    {
      weekNumber: 15,
      startDaySaturdayHijri: "15 ربيع الآخر 1448هـ",
      startDaySaturdayMiladi: "26 سبتمبر 2026م",
      endDayWednesdayHijri: "17 ربيع الآخر 1448هـ",
      endDayWednesdayMiladi: "28 سبتمبر 2026م",
      isReviewWeek: true,
      weekTitle: "أسبوع المراجعة العامة الشاملة للمقرر + اختبارات نهاية الفصل الدراسي الأول (تبدأ الثلاثاء 18 ربيع الآخر)"
    }
  ],
  weekDatesMappingS2: [
    {
      weekNumber: 1,
      startDaySaturdayHijri: "6 جمادى الأولى 1448هـ",
      startDaySaturdayMiladi: "17 أكتوبر 2026م",
      endDayWednesdayHijri: "10 جمادى الأولى 1448هـ",
      endDayWednesdayMiladi: "21 أكتوبر 2026م",
      isReviewWeek: false,
      weekTitle: "الوحدة 13: الهوية الإيمانية"
    },
    {
      weekNumber: 2,
      startDaySaturdayHijri: "13 جمادى الأولى 1448هـ",
      startDaySaturdayMiladi: "24 أكتوبر 2026م",
      endDayWednesdayHijri: "17 جمادى الأولى 1448هـ",
      endDayWednesdayMiladi: "28 أكتوبر 2026م",
      isReviewWeek: false,
      weekTitle: "الوحدة 14: مع الرسول والرسالة"
    },
    {
      weekNumber: 3,
      startDaySaturdayHijri: "20 جمادى الأولى 1448هـ",
      startDaySaturdayMiladi: "31 أكتوبر 2026م",
      endDayWednesdayHijri: "24 جمادى الأولى 1448هـ",
      endDayWednesdayMiladi: "4 نوفمبر 2026م",
      isReviewWeek: false,
      weekTitle: "الوحدة 15: الزراعة"
    },
    {
      weekNumber: 4,
      startDaySaturdayHijri: "27 جمادى الأولى 1448هـ",
      startDaySaturdayMiladi: "7 نوفمبر 2026م",
      endDayWednesdayHijri: "1 جمادى الآخرة 1448هـ",
      endDayWednesdayMiladi: "11 نوفمبر 2026م",
      isReviewWeek: false,
      weekTitle: "الوحدة 16: قيم أخلاقية"
    },
    {
      weekNumber: 5,
      startDaySaturdayHijri: "4 جمادى الآخرة 1448هـ",
      startDaySaturdayMiladi: "14 نوفمبر 2026م",
      endDayWednesdayHijri: "8 جمادى الآخرة 1448هـ",
      endDayWednesdayMiladi: "18 نوفمبر 2026م",
      isReviewWeek: true,
      weekTitle: "أسبوع المراجعة الشاملة للوحدات (13 - 16) + امتحان الشهر الأول"
    },
    {
      weekNumber: 6,
      startDaySaturdayHijri: "11 جمادى الآخرة 1448هـ",
      startDaySaturdayMiladi: "21 نوفمبر 2026م",
      endDayWednesdayHijri: "15 جمادى الآخرة 1448هـ",
      endDayWednesdayMiladi: "25 نوفمبر 2026م",
      isReviewWeek: false,
      weekTitle: "الوحدة 17: قيم اجتماعية"
    },
    {
      weekNumber: 7,
      startDaySaturdayHijri: "18 جمادى الآخرة 1448هـ",
      startDaySaturdayMiladi: "28 نوفمبر 2026م",
      endDayWednesdayHijri: "22 جمادى الآخرة 1448هـ",
      endDayWednesdayMiladi: "2 ديسمبر 2026م",
      isReviewWeek: false,
      weekTitle: "الوحدة 18: مدن أثرية"
    },
    {
      weekNumber: 8,
      startDaySaturdayHijri: "25 جمادى الآخرة 1448هـ",
      startDaySaturdayMiladi: "5 ديسمبر 2026م",
      endDayWednesdayHijri: "29 جمادى الآخرة 1448هـ",
      endDayWednesdayMiladi: "9 ديسمبر 2026م",
      isReviewWeek: false,
      weekTitle: "الوحدة 19: الأسرة المسلمة"
    },
    {
      weekNumber: 9,
      startDaySaturdayHijri: "3 رجب 1448هـ",
      startDaySaturdayMiladi: "12 ديسمبر 2026م",
      endDayWednesdayHijri: "7 رجب 1448هـ",
      endDayWednesdayMiladi: "16 ديسمبر 2026م",
      isReviewWeek: false,
      weekTitle: "الوحدة 20: شخصيات وأعلام جهادية"
    },
    {
      weekNumber: 10,
      startDaySaturdayHijri: "10 رجب 1448هـ",
      startDaySaturdayMiladi: "19 ديسمبر 2026م",
      endDayWednesdayHijri: "14 رجب 1448هـ",
      endDayWednesdayMiladi: "23 ديسمبر 2026م",
      isReviewWeek: true,
      weekTitle: "أسبوع المراجعة الشاملة للوحدات (17 - 20) + امتحان الشهر الثاني"
    },
    {
      weekNumber: 11,
      startDaySaturdayHijri: "17 رجب 1448هـ",
      startDaySaturdayMiladi: "26 ديسمبر 2026م",
      endDayWednesdayHijri: "21 رجب 1448هـ",
      endDayWednesdayMiladi: "30 ديسمبر 2026م",
      isReviewWeek: false,
      weekTitle: "الوحدة 21: الوعي الثقافي"
    },
    {
      weekNumber: 12,
      startDaySaturdayHijri: "24 رجب 1448هـ",
      startDaySaturdayMiladi: "2 يناير 2027م",
      endDayWednesdayHijri: "28 رجب 1448هـ",
      endDayWednesdayMiladi: "6 يناير 2027م",
      isReviewWeek: false,
      weekTitle: "الوحدة 22: قضايا وطنية"
    },
    {
      weekNumber: 13,
      startDaySaturdayHijri: "2 شعبان 1448هـ",
      startDaySaturdayMiladi: "9 يناير 2027م",
      endDayWednesdayHijri: "6 شعبان 1448هـ",
      endDayWednesdayMiladi: "13 يناير 2027م",
      isReviewWeek: false,
      weekTitle: "الوحدة 23: من مخلوقات الله"
    },
    {
      weekNumber: 14,
      startDaySaturdayHijri: "9 شعبان 1448هـ",
      startDaySaturdayMiladi: "16 يناير 2027م",
      endDayWednesdayHijri: "13 شعبان 1448هـ",
      endDayWednesdayMiladi: "20 يناير 2027م",
      isReviewWeek: false,
      weekTitle: "الوحدة 24: نوادر وفكاهات"
    },
    {
      weekNumber: 15,
      startDaySaturdayHijri: "16 شعبان 1448هـ",
      startDaySaturdayMiladi: "23 يناير 2027م",
      endDayWednesdayHijri: "17 شعبان 1448هـ",
      endDayWednesdayMiladi: "25 يناير 2027م",
      isReviewWeek: true,
      weekTitle: "أسبوع المراجعة الشاملة + اختبارات نهاية الفصل الدراسي الثاني (تبدأ الثلاثاء 18 شعبان)"
    }
  ]
};
