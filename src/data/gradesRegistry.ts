import { GradeConfig, GradeKey, UnitData, WeeklySchedulePlan } from '../types/curriculum';
import { YEMENI_GRADE_7_PART_1_INDEX, BookIndexRecord } from './bookIndex';
import { UNITS_EXTRACTED_DATA } from './unitsDetailData';
import { SEMESTER_1_STUDY_PLAN } from './studyPlanData';
import { YEMENI_GRADE_7_PART_2_INDEX } from './bookIndexPart2';
import { UNITS_EXTRACTED_DATA_PART_2 } from './unitsDetailDataPart2';
import { SEMESTER_2_STUDY_PLAN } from './studyPlanDataPart2';
import { YEMENI_GRADE_8_PART_1_INDEX } from './bookIndexGrade8Part1';
import { UNITS_EXTRACTED_DATA_GRADE_8_PART_1 } from './unitsDetailDataGrade8Part1';
import { SEMESTER_1_STUDY_PLAN_GRADE_8_PART_1 } from './studyPlanDataGrade8Part1';
import { YEMENI_GRADE_8_PART_2_INDEX } from './bookIndexGrade8Part2';
import { UNITS_EXTRACTED_DATA_GRADE_8_PART_2 } from './unitsDetailDataGrade8Part2';
import { SEMESTER_2_STUDY_PLAN_GRADE_8_PART_2 } from './studyPlanDataGrade8Part2';
import { YEMENI_GRADE_9_PART_1_INDEX } from './bookIndexGrade9Part1';
import { UNITS_EXTRACTED_DATA_GRADE_9_PART_1 } from './unitsDetailDataGrade9Part1';
import { SEMESTER_1_STUDY_PLAN_GRADE_9_PART_1 } from './studyPlanDataGrade9Part1';
import { YEMENI_GRADE_9_PART_2_INDEX } from './bookIndexGrade9Part2';
import { UNITS_EXTRACTED_DATA_GRADE_9_PART_2 } from './unitsDetailDataGrade9Part2';
import { SEMESTER_2_STUDY_PLAN_GRADE_9_PART_2 } from './studyPlanDataGrade9Part2';

export const GRADES_CONFIG: GradeConfig[] = [
  {
    key: 'grade7_p1',
    gradeNumber: 7,
    partNumber: 1,
    title: 'الصف السابع - الجزء الأول',
    stageName: 'مرحلة التعليم الأساسي',
    status: 'active',
    colorGradient: 'from-emerald-700 to-teal-800',
    badgeText: 'مكتمل التحليل (160 صفحة)',
    unitsCount: 12,
    editionYear: '1444هـ / 2023م (طبعة تجريبية)',
    iconBg: 'bg-emerald-600'
  },
  {
    key: 'grade7_p2',
    gradeNumber: 7,
    partNumber: 2,
    title: 'الصف السابع - الجزء الثاني',
    stageName: 'مرحلة التعليم الأساسي',
    status: 'active',
    colorGradient: 'from-cyan-800 to-teal-900',
    badgeText: 'مكتمل التحليل (160 صفحة)',
    unitsCount: 12,
    editionYear: '1444هـ / 2023م (طبعة تجريبية)',
    iconBg: 'bg-teal-700'
  },
  {
    key: 'grade8_p1',
    gradeNumber: 8,
    partNumber: 1,
    title: 'الصف الثامن - الجزء الأول',
    stageName: 'مرحلة التعليم الأساسي',
    status: 'active',
    colorGradient: 'from-indigo-800 to-violet-900',
    badgeText: 'مكتمل التحليل (190 صفحة)',
    unitsCount: 12,
    editionYear: '1444هـ / 2023م (طبعة تجريبية)',
    iconBg: 'bg-indigo-700'
  },
  {
    key: 'grade8_p2',
    gradeNumber: 8,
    partNumber: 2,
    title: 'الصف الثامن - الجزء الثاني',
    stageName: 'مرحلة التعليم الأساسي',
    status: 'active',
    colorGradient: 'from-purple-800 to-fuchsia-900',
    badgeText: 'مكتمل التحليل (178 صفحة)',
    unitsCount: 12,
    editionYear: '1444هـ / 2023م (طبعة تجريبية)',
    iconBg: 'bg-purple-700'
  },
  {
    key: 'grade9_p1',
    gradeNumber: 9,
    partNumber: 1,
    title: 'الصف التاسع - الجزء الأول',
    stageName: 'الشهادة الأساسية العامة',
    status: 'active',
    colorGradient: 'from-amber-700 to-orange-900',
    badgeText: 'مكتمل التحليل (176 صفحة)',
    unitsCount: 12,
    editionYear: '1447هـ / 2026م (طبعة معتمدة)',
    iconBg: 'bg-amber-700'
  },
  {
    key: 'grade9_p2',
    gradeNumber: 9,
    partNumber: 2,
    title: 'الصف التاسع - الجزء الثاني',
    stageName: 'الشهادة الأساسية العامة',
    status: 'active',
    colorGradient: 'from-rose-800 to-red-950',
    badgeText: 'مكتمل التحليل (178 صفحة)',
    unitsCount: 12,
    editionYear: '1444هـ / 2023م (طبعة تجريبية)',
    iconBg: 'bg-rose-700'
  }
];

export interface IsolatedGradeDataset {
  bookIndex: BookIndexRecord;
  units: UnitData[];
  studyPlan: WeeklySchedulePlan[];
}

/**
 * Strict Grade-Level Isolation Store:
 * Each grade-part pair is completely isolated in its own memory bucket.
 * Uploading or expanding another grade will never leak or overwrite Grade 7 Part 1.
 */
const ISOLATED_GRADE_STORE: Record<GradeKey, IsolatedGradeDataset> = {
  grade7_p1: {
    bookIndex: YEMENI_GRADE_7_PART_1_INDEX,
    units: UNITS_EXTRACTED_DATA,
    studyPlan: SEMESTER_1_STUDY_PLAN
  },
  grade7_p2: {
    bookIndex: YEMENI_GRADE_7_PART_2_INDEX,
    units: UNITS_EXTRACTED_DATA_PART_2,
    studyPlan: SEMESTER_2_STUDY_PLAN
  },
  grade8_p1: {
    bookIndex: YEMENI_GRADE_8_PART_1_INDEX,
    units: UNITS_EXTRACTED_DATA_GRADE_8_PART_1,
    studyPlan: SEMESTER_1_STUDY_PLAN_GRADE_8_PART_1
  },
  grade8_p2: {
    bookIndex: YEMENI_GRADE_8_PART_2_INDEX,
    units: UNITS_EXTRACTED_DATA_GRADE_8_PART_2,
    studyPlan: SEMESTER_2_STUDY_PLAN_GRADE_8_PART_2
  },
  grade9_p1: {
    bookIndex: YEMENI_GRADE_9_PART_1_INDEX,
    units: UNITS_EXTRACTED_DATA_GRADE_9_PART_1,
    studyPlan: SEMESTER_1_STUDY_PLAN_GRADE_9_PART_1
  },
  grade9_p2: {
    bookIndex: YEMENI_GRADE_9_PART_2_INDEX,
    units: UNITS_EXTRACTED_DATA_GRADE_9_PART_2,
    studyPlan: SEMESTER_2_STUDY_PLAN_GRADE_9_PART_2
  }
};

export function getIsolatedGradeData(gradeKey: GradeKey): IsolatedGradeDataset {
  return ISOLATED_GRADE_STORE[gradeKey] || ISOLATED_GRADE_STORE.grade7_p1;
}
