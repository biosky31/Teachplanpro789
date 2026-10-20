import React, { useState } from 'react';
import { Header } from './components/Header';
import { NavigationTabs, MainTabType } from './components/NavigationTabs';
import { MobileTopBar } from './components/mobile/MobileTopBar';
import { MobileDrawer } from './components/mobile/MobileDrawer';
import { MobileBottomNav } from './components/mobile/MobileBottomNav';
import { BookCatalogView } from './components/BookCatalogView';
import { UnitDeepExtractionView } from './components/UnitDeepExtractionView';
import { StudyPlanView } from './components/StudyPlanView';
import { LinguisticTreasuryView } from './components/LinguisticTreasuryView';
import { ExamQuestionBankView } from './components/ExamQuestionBankView';
import { OfficialCalendarAndGoalsView } from './components/OfficialCalendarAndGoalsView';
import { DailyPreparationModal } from './components/DailyPreparationModal';
import { DailyPreparationView } from './components/DailyPreparationView';
import { GradeStandbyPortal } from './components/GradeStandbyPortal';
import { UNITS_EXTRACTED_DATA } from './data/unitsDetailData';
import { GRADES_CONFIG, getIsolatedGradeData } from './data/gradesRegistry';
import { GradeKey } from './types/curriculum';
import { BookOpen, CheckCircle2, ShieldCheck, Lock } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<MainTabType>('catalog');
  const [selectedUnitId, setSelectedUnitId] = useState<number>(13);
  const [activeGradeKey, setActiveGradeKey] = useState<GradeKey>('grade9_p2');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isPrepModalOpen, setIsPrepModalOpen] = useState<boolean>(false);
  const [prepModalParams, setPrepModalParams] = useState<{
    unitId: number;
    week?: number;
    period?: number;
  }>({ unitId: 13, week: 1, period: 1 });

  const activeGradeConfig = GRADES_CONFIG.find(g => g.key === activeGradeKey) || GRADES_CONFIG[0];
  const isolatedData = getIsolatedGradeData(activeGradeKey);

  const handleOpenPreparationModal = (unitId: number, week?: number, period?: number) => {
    setSelectedUnitId(unitId);
    setPrepModalParams({
      unitId,
      week: week || 1,
      period: period || 1
    });
    setActiveTab('daily_prep');
  };

  const handleSelectPeriodForPrep = (weekNum: number, periodNum: number) => {
    let targetUnit = weekNum;
    if (activeGradeKey === 'grade7_p2' || activeGradeKey === 'grade8_p2' || activeGradeKey === 'grade9_p2') {
      let offset = weekNum;
      if (weekNum > 10) offset = weekNum - 2;
      else if (weekNum > 5) offset = weekNum - 1;
      if (offset > 12) offset = 12;
      targetUnit = 12 + offset; // 13 through 24
    } else {
      if (weekNum > 10) targetUnit = weekNum - 2;
      else if (weekNum > 5) targetUnit = weekNum - 1;
      if (targetUnit > 12) targetUnit = 12;
    }

    handleOpenPreparationModal(targetUnit, weekNum, periodNum);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-['Cairo',sans-serif] selection:bg-amber-100 selection:text-amber-900 pb-20 md:pb-6">
      {/* 1. Sleek Integrated Application Header (Low Profile, Max Reading Height) */}
      <MobileTopBar
        onOpenDrawer={() => setIsDrawerOpen(true)}
        activeGrade={activeGradeConfig}
        onOpenPrepModal={() => handleOpenPreparationModal(selectedUnitId)}
        onSelectGradeKey={(key) => {
          setActiveGradeKey(key);
          const firstUnit = (key === 'grade7_p2' || key === 'grade8_p2' || key === 'grade9_p2') ? 13 : 1;
          setSelectedUnitId(firstUnit);
        }}
      />

      {/* 2. Slide-In Sidebar Drawer (Native App Style from Right) */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
        }}
        activeGradeKey={activeGradeKey}
        onSelectGradeKey={(key) => {
          setActiveGradeKey(key);
          const firstUnit = (key === 'grade7_p2' || key === 'grade8_p2' || key === 'grade9_p2') ? 13 : 1;
          setSelectedUnitId(firstUnit);
        }}
      />

      {/* 3. Desktop/Tablet Secondary Navigation Tabs (Sleek Compact Bar) */}
      <div className="hidden md:block">
        <NavigationTabs
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
          }}
          unitsCount={isolatedData.units.length}
        />
      </div>

      {/* 4. Main Screen Content Area - Maximum Clear Space for Reading */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-5">
        {/* If Active Grade has populated data */}
        {activeGradeConfig.status === 'active' ? (
          <>
            {activeTab === 'catalog' && (
              <BookCatalogView
                bookIndex={isolatedData.bookIndex}
                onSelectUnit={(id) => {
                  setSelectedUnitId(id);
                  setActiveTab('deep_extraction');
                }}
                onNavigateTab={setActiveTab}
              />
            )}

            {activeTab === 'deep_extraction' && (
              <UnitDeepExtractionView
                unitsData={isolatedData.units}
                selectedUnitId={selectedUnitId}
                onSelectUnitId={setSelectedUnitId}
                onOpenPreparationModal={(uId) => handleOpenPreparationModal(uId)}
              />
            )}

            {activeTab === 'study_plan' && (
              <StudyPlanView
                studyPlan={isolatedData.studyPlan}
                onSelectPeriodForPrep={handleSelectPeriodForPrep}
                activeGradeConfig={activeGradeConfig}
              />
            )}

            {activeTab === 'daily_prep' && (
              <DailyPreparationView
                initialUnitId={selectedUnitId}
                initialWeek={prepModalParams.week}
                initialPeriod={prepModalParams.period}
                unitsData={isolatedData.units}
                activeGradeConfig={activeGradeConfig}
              />
            )}

            {activeTab === 'official_calendar_and_goals' && (
              <OfficialCalendarAndGoalsView />
            )}

            {activeTab === 'linguistic_treasury' && (
              <LinguisticTreasuryView unitsData={isolatedData.units} />
            )}

            {activeTab === 'exam_bank' && (
              <ExamQuestionBankView unitsData={isolatedData.units} />
            )}
          </>
        ) : (
          /* Dedicated Standby & Onboarding Portal for Grade 9 */
          <GradeStandbyPortal
            activeGradeConfig={activeGradeConfig}
            onSelectGradeKey={setActiveGradeKey}
          />
        )}
      </main>

      {/* 6. Native Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'daily_prep') {
            handleOpenPreparationModal(selectedUnitId);
          } else {
            setActiveTab(tab);
          }
        }}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenPrepModal={() => handleOpenPreparationModal(selectedUnitId)}
      />

      {/* 7. Daily Preparation Bottom-Sheet Modal */}
      <DailyPreparationModal
        isOpen={isPrepModalOpen}
        onClose={() => setIsPrepModalOpen(false)}
        initialUnitId={prepModalParams.unitId}
        initialWeek={prepModalParams.week}
        initialPeriod={prepModalParams.period}
        unitsData={isolatedData.units}
        activeGradeConfig={activeGradeConfig}
      />
    </div>
  );
}
