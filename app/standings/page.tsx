"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetParticipantPositions } from "@/hooks/participantPositions/queries/useGetParticipantPositions";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { ParticipantStatistics } from "@/types/participantStatistics/participantStatistics";
import { DataUser } from "@/types/user/dataUser";
import { MainContainer } from "@/components/ui/containers/MainContainer";
import { Button } from "@/components/shared/button/Button";
import { StatisticsCard } from "@/components/standings/StatisticsCard";
import { PageHeader } from "@/components/shared/pageHeader/PageHeader";
import { StandingsCard } from "@/components/standings/StandingsCard";
import { TabSelector, TabType } from "@/components/shared/tabs/TabSelector";

export default function StandingsPage() {
  const { isPending, isError, data } = useGetParticipantPositions();
  const [activeTab, setActiveTab] = useState<TabType>(0);
  const router = useRouter();
  const { data: user } = useGetMe();
  const userInfo: DataUser = user?.data?.[0];
  const participantData = data?.data[0];
  const currentWeek = userInfo?.idPeriodo;
  const weeklyLeaderboard: ParticipantStatistics[] =
    participantData?.puntosPeriodo;
  const globalLeaderboard: ParticipantStatistics[] =
    participantData?.puntosTotal;

  return (
    <MainContainer>
      <PageHeader
        title="Clasificación"
        text="Consulta las posiciones semanales y globales de todos los participantes"
      />

      <StatisticsCard activeTab={activeTab} />

      <div className="grid gap-4">
        <TabSelector
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          text={["Semanal", "Global"]}
        />

        {activeTab === 0 ? (
          <StandingsCard
            period={`semana ${currentWeek}`}
            isPending={isPending}
            isError={isError}
            leaderboard={weeklyLeaderboard}
          />
        ) : (
          <StandingsCard
            period="global"
            isPending={isPending}
            isError={isError}
            leaderboard={globalLeaderboard}
          />
        )}
      </div>

      <div className="flex w-full gap-4 justify-center">
        <Link href="/dashboard">
          <Button type="button" title="Volver al Dashboard" theme="normal" />
        </Link>

        <Button
          type="button"
          title="Ver Quiniela"
          onClick={() => router.push("/quiniela")}
        />
      </div>
    </MainContainer>
  );
}
