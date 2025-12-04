"use client";

import { useState } from "react";
import { useAuth } from "@/context/authContext/AuthContext";
import { StandingsGridSimulator } from "./StandingsGridSimulator";
import { ParticipantStatistics } from "@/types/participantStatistics/participantStatistics";
import { PeriodTabs } from "../standings/PeriodTabs";

type TabType = "weekly" | "global";

interface StandingsSimulatorProps {
  quinielaAlta: {
    data: [
      {
        puntosPeriodo: ParticipantStatistics[];
        puntosTotal: ParticipantStatistics[];
      }
    ];
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
}

export const StandingsSimulator = ({
  quinielaAlta,
}: StandingsSimulatorProps) => {
  const { dataUser } = useAuth();
  const { isPending, isError, isSuccess, data } = quinielaAlta;
  const participantData = data?.[0];
  const currentWeek = dataUser?.idPeriodo;
  const weeklyLeaderboard: ParticipantStatistics[] =
    participantData?.puntosPeriodo;
  const globalLeaderboard: ParticipantStatistics[] =
    participantData?.puntosTotal;
  const [activeTab, setActiveTab] = useState<TabType>("weekly");

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
        <PeriodTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentWeek={currentWeek}
        />

        <div>
          {activeTab === "weekly" && (
            <StandingsGridSimulator
              isPending={isPending}
              isError={isError}
              isSuccess={isSuccess}
              leaderboard={weeklyLeaderboard}
              typeTab="semanal"
            />
          )}

          {activeTab === "global" && (
            <StandingsGridSimulator
              isPending={isPending}
              isError={isError}
              isSuccess={isSuccess}
              leaderboard={globalLeaderboard}
              typeTab="global"
            />
          )}
        </div>
      </div>
    </div>
  );
};
