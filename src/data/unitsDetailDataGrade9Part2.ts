import { UnitData } from '../types/curriculum';
import { UNITS_GRADE_9_PART_2_GROUP_A } from './unitsDetailDataGrade9Part2_A';
import { UNITS_GRADE_9_PART_2_GROUP_B } from './unitsDetailDataGrade9Part2_B';
import { UNITS_GRADE_9_PART_2_GROUP_C } from './unitsDetailDataGrade9Part2_C';

export const UNITS_EXTRACTED_DATA_GRADE_9_PART_2: UnitData[] = [
  ...UNITS_GRADE_9_PART_2_GROUP_A,
  ...UNITS_GRADE_9_PART_2_GROUP_B,
  ...UNITS_GRADE_9_PART_2_GROUP_C
];
