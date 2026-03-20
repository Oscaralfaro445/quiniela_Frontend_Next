import { useEffect, useState } from "react";
import { useGetMe } from "@/hooks/queries/user/useGetMe";
import { useGetParticipantPositions } from "@/hooks/queries/useGetParticipantPositions";
import { Card } from "../shared/card/Card";
import { Icon } from "../shared/icon/Icon";
import { TabType } from "../shared/tabs/TabSelector";
import { PeriodSelector } from "./PeriodSelector";
import { ParticipantCard } from "./ParticipantCard";

interface StandingsCardProps {
  activeTab: TabType;
}

export const StandingsCard = ({ activeTab }: StandingsCardProps) => {
  const [period, setPeriod] = useState<number>(0);
  const { isPending, isError, data } = useGetParticipantPositions();
  const { data: userData } = useGetMe();
  const week = userData?.data?.[0]?.idPeriodo;
  const participantData = data?.data?.[0];
  const weeklyLeaderboard = participantData?.puntosPeriodo;
  const globalLeaderboard = participantData?.puntosTotal;
  const leaderboard = activeTab === 0 ? weeklyLeaderboard : globalLeaderboard;

  useEffect(() => {
    if (week) {
      setPeriod(Number(week));
    }
  }, [week]);

  return (
    <Card>
      <div className="grid gap-4">
        <div>
          <p className="text-xl font-semibold text-red-600">
            {`Clasificación ${activeTab === 0 ? `semana ${week}` : "global"}`}
          </p>
          <p className="text-md text-neutral-600">
            Basada en el rendimiento de toda la temporada
          </p>
        </div>

        {activeTab === 0 && (
          <PeriodSelector period={period} setPeriod={setPeriod} />
        )}

        {isPending && (
          <div className="flex justify-center items-center mt-10">
            <Icon
              name="loader"
              className="animate-spin h-5 w-5 text-blue-500"
            />
          </div>
        )}

        {isError && (
          <div className="flex justify-center items-center mt-10">
            <Icon name="alert-triangle" className="h-5 w-5 text-red-500" />
          </div>
        )}

        <div className="grid w-full gap-2">
          {leaderboard?.map((player) => (
            <ParticipantCard
              key={player.ID_PARTICIPANTE}
              player={player}
              period={period}
              activeTab={activeTab}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};
