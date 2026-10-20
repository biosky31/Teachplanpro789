import { UnitData } from '../types/curriculum';
import { UNITS_GRADE_9_PART_1_GROUP_A } from './unitsDetailDataGrade9Part1_A';
import { UNITS_GRADE_9_PART_1_GROUP_B } from './unitsDetailDataGrade9Part1_B';
import { UNITS_GRADE_9_PART_1_GROUP_C } from './unitsDetailDataGrade9Part1_C';

export const UNITS_EXTRACTED_DATA_GRADE_9_PART_1: UnitData[] = [
  ...UNITS_GRADE_9_PART_1_GROUP_A,
  ...UNITS_GRADE_9_PART_1_GROUP_B,
  ...UNITS_GRADE_9_PART_1_GROUP_C
];
