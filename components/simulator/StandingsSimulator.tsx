"use client";

import { useState } from "react";
import { ParticipantStatistics } from "@/types/participantStatistics/participantStatistics";
import { StandingsGridSimulator } from "./StandingsGridSimulator";
import { TabSelector, TabType } from "../shared/tabs/TabSelector";

interface StandingsSimulatorProps {
  quinielaAlta: {
    data: [
      {
        puntosPeriodo: ParticipantStatistics[];
        puntosTotal: ParticipantStatistics[];
      },
    ];
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
}

export const StandingsSimulator = ({
  quinielaAlta,
}: StandingsSimulatorProps) => {
  const [activeTab, setActiveTab] = useState<TabType>(0);
  const { isPending, isError, isSuccess, data } = quinielaAlta;
  const participantData = data?.[0];
  const weeklyLeaderboard: ParticipantStatistics[] =
    participantData?.puntosPeriodo;
  const globalLeaderboard: ParticipantStatistics[] =
    participantData?.puntosTotal;

  return (
    <div className="space-y-4">
      <div>
        <p>Clasificación</p>
        <p>
          Consulta las posiciones semanales y globales de todos los
          participantes
        </p>
      </div>

      <div className="grid max-w-[1280px] mx-auto gap-4">
        <TabSelector
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          text={["Semanal", "Global"]}
        />

        <StandingsGridSimulator
          isPending={isPending}
          isError={isError}
          isSuccess={isSuccess}
          leaderboard={activeTab === 0 ? weeklyLeaderboard : globalLeaderboard}
          typeTab={activeTab === 0 ? "semanal" : "global"}
        />
      </div>
    </div>
  );
};
