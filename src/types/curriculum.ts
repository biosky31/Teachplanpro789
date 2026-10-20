export type BranchType = 'reading' | 'texts' | 'grammar' | 'dictation' | 'calligraphy' | 'expression' | 'assessment';

export interface VocabularyItem {
  word: string;
  contextMeaning: string;
  synonym?: string;
  antonym?: string;
  notes?: string;
  isFromText: boolean; // true = from book, false = additional enrichment
}

export interface GrammarExtraDetail {
  title: string;
  detail: string;
  evidencePage: number;
  significance: string;
}

export interface ComparisonTable {
  conceptA: string;
  conceptB: string;
  pointsOfAgreement: string[];
  pointsOfDifference: string[];
  distinguishingRules: string[];
  exampleA: string;
  exampleB: string;
  commonMistake: string;
  correction: string;
}

export interface QuestionItem {
  id: string;
  question: string;
  answer: string;
  sourceType: 'text' | 'explanation' | 'rule' | 'activity' | 'assessment' | 'deduced_extra';
  pageNumber: number;
  skillType: 'direct' | 'inference' | 'application' | 'parsing' | 'correction' | 'comparison';
  difficulty: 'easy' | 'medium' | 'advanced';
  priority: 'core' | 'important' | 'enrichment';
}

export interface BeyondTheLessonQuestion {
  question: string;
  importanceReason: string;
  lessonRelation: string;
  isAnswerInBook: boolean;
  category: 'direct_inference' | 'multi_info_linking' | 'external_linguistic' | 'probable_test';
  answerText: string;
  priority: 'high' | 'medium' | 'enrichment';
}

export interface LessonContent {
  id?: string;
  title: string;
  branch: BranchType | string;
  startPage?: number;
  endPage?: number;
  page?: number;
  generalIdea?: string;
  detailedPoints?: string[];
  subIdeas?: string[];
  originalText?: string;
  authorInfo?: string;
  authorName?: string;
  author?: string;
  vocabulary?: VocabularyItem[];
  vocabularyTable?: any[];
  ruleSummary?: string;
  inDepthExplanation?: string;
  detailedRules?: string[];
  unmentionedInSummaryDetails?: GrammarExtraDetail[];
  hiddenExplanationDetails?: string[];
  comparison?: ComparisonTable[];
  comparativeAnalysis?: any[];
  examplesAnalysis?: any[];
  questionBank?: any[];
  exercises?: QuestionItem[];
  comprehensionQuestions?: any[];
  rhetoricalAesthetics?: string[];
  commonMistakes?: string[];
  exercisesAndSolutions?: any[];
}

export interface UnitData {
  id: number;
  unitNumberArabic: string;
  title: string;
  theme: string;
  pageRange: [number, number];
  lessons: LessonContent[];
  assessmentQuestions?: QuestionItem[];
  beyondTheLinesQuestions?: BeyondTheLessonQuestion[];
  weeklyPlacement?: {
    week: number;
    description: string;
  };
  section8Discoveries?: any[];
}

export interface PeriodSchedule {
  periodNumber: number;
  day: 'السبت' | 'الأحد' | 'الإثنين' | 'الثلاثاء' | 'الأربعاء';
  branch: string;
  topic: string;
  pageRange: string;
  objectives: string[];
  suggestedStrategy?: string;
  assessmentFocus?: string;
  assessmentMethod?: string;
}

export interface WeeklySchedulePlan {
  weekNumber: number;
  isReviewWeek: boolean;
  title: string;
  unitCoverage: string;
  hijriDates?: string;
  miladiDates?: string;
  monthlyExamNotice?: string;
  periods: PeriodSchedule[];
}

export type GradeKey = 
  | 'grade7_p1'
  | 'grade7_p2'
  | 'grade8_p1'
  | 'grade8_p2'
  | 'grade9_p1'
  | 'grade9_p2';

export interface GradeConfig {
  key: GradeKey;
  gradeNumber: 7 | 8 | 9;
  partNumber: 1 | 2;
  title: string;
  stageName: string;
  status: 'active' | 'pending_upload';
  colorGradient: string;
  badgeText: string;
  unitsCount: number;
  editionYear: string;
  iconBg: string;
}

