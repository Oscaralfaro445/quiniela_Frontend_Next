import { TabType } from "@/app/standings/page";

interface PeriodTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  currentWeek: string | undefined;
}

export const PeriodTabs = ({
  activeTab,
  setActiveTab,
  currentWeek,
}: PeriodTabsProps) => {
  return (
    <div className="flex lg:w-96 h-12 p-1 rounded-md bg-neutral-100">
      <button
        className={`w-1/2 p-1 rounded-md transition-colors duration-100 cursor-pointer ${
          activeTab === "weekly" ? "bg-white" : ""
        }`}
        type="button"
        onClick={() => setActiveTab("weekly")}
      >
        {`Semana ${currentWeek}`}
      </button>

      <button
        className={`w-1/2 p-1 rounded-lg transition-colors duration-100 cursor-pointer ${
          activeTab === "global" ? "bg-white" : ""
        }`}
        type="button"
        onClick={() => setActiveTab("global")}
      >
        Global
      </button>
    </div>
  );
};
