"use client";

import { useState } from "react";
import { TabSelector, TabType } from "../shared/tabs/TabSelector";
import { ConferenceSection } from "./ConferenceSection";

export const ConferenceStandings = () => {
  const [activeTab, setActiveTab] = useState<TabType>(0);

  return (
    <div className="grid gap-4">
      <div className="flex w-full justify-center">
        <TabSelector
          activeTab={activeTab}
          text={["Americana", "Nacional"]}
          setActiveTab={setActiveTab}
        />
      </div>

      <div className="space-y-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-center text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Oscar
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>

      <ConferenceSection activeTab={activeTab} />
    </div>
  );
};
