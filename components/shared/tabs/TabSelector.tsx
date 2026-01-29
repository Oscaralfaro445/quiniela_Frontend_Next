export type TabType = 0 | 1;

interface TabSelectorProps {
  activeTab: TabType;
  text: string[];
  setActiveTab: (tab: TabType) => void;
}

export const TabSelector = ({
  activeTab,
  setActiveTab,
  text,
}: TabSelectorProps) => {
  return (
    <div className="flex lg:w-96 h-12 p-1 rounded-md bg-neutral-100">
      {Array.from({ length: 2 }).map((_, index) => (
        <button
          key={index}
          className={`w-1/2 p-1 rounded-md transition-colors duration-100 cursor-pointer ${activeTab === index ? "bg-white" : ""}`}
          type="button"
          onClick={() => setActiveTab(index as TabType)}
        >
          {text[index]}
        </button>
      ))}
    </div>
  );
};
