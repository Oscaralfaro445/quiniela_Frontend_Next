"use client";

import { useState } from "react";
import { TabSelector, TabType } from "../shared/tabs/TabSelector";
import { ConferenceSection } from "./ConferenceSection";

export const ConferenceStandings = () => {
  const [activeTab, setActiveTab] = useState<TabType>(0);

  return (
    <div className="grid gap-4">
      <TabSelector
        activeTab={activeTab}
        text={["Americana", "Nacional"]}
        setActiveTab={setActiveTab}
      />

      <div className="flex gap-2 items-center justify-between">
        <hr className="flex-1 boreder-neutral-300" />
        <h2 className="text-center text-sm font-bold uppercase tracking-widest text-muted-foreground">
          {activeTab === 0 ? "Conferencia Americana" : "Conferencia Nacional"}
        </h2>
        <hr className="flex-1 boreder-neutral-300" />
      </div>

      <ConferenceSection activeTab={activeTab} />
    </div>
  );
};
