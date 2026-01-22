"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetParticipantPositions } from "@/hooks/participantPositions/queries/useGetParticipantPositions";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { ParticipantStatistics } from "@/types/participantStatistics/participantStatistics";
import { Button } from "@/components/shared/button/Button";
import { StatisticsCard } from "@/components/standings/StatisticsCard";
import { PageHeader } from "@/components/shared/pageHeader/PageHeader";
import { PeriodTabs } from "@/components/standings/PeriodTabs";
import { StandingsCard } from "@/components/standings/StandingsCard";
import { DataUser } from "@/types/user/dataUser";

export type TabType = "weekly" | "global";

export default function StandingsPage() {
  const router = useRouter();
  const { data: user } = useGetMe();
  const userInfo: DataUser = user?.data?.[0];
  const { isPending, isError, data } = useGetParticipantPositions();
  const participantData = data?.data[0];
  const currentWeek = userInfo?.idPeriodo;
  const weeklyLeaderboard: ParticipantStatistics[] =
    participantData?.puntosPeriodo;
  const globalLeaderboard: ParticipantStatistics[] =
    participantData?.puntosTotal;
  const [activeTab, setActiveTab] = useState<TabType>("weekly");

  return (
    <div className="min-h-screen pt-18">
      <PageHeader
        title="Clasificación"
        text="Consulta las posiciones semanales y globales de todos los participantes"
      />

      <StatisticsCard activeTab={activeTab} />

      <div className="grid max-w-[1280px] mx-auto px-10 py-8 gap-4">
        <PeriodTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentWeek={currentWeek}
        />

        {activeTab === "weekly" && (
          <StandingsCard
            period={`semana ${currentWeek}`}
            isPending={isPending}
            isError={isError}
            leaderboard={weeklyLeaderboard}
          />
        )}

        {activeTab === "global" && (
          <div className="">
            <StandingsCard
              period="global"
              isPending={isPending}
              isError={isError}
              leaderboard={globalLeaderboard}
            />
          </div>
        )}
      </div>

      <div className="flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center">
        <Link href="/dashboard">
          <Button type="button" title="Volver al Dashboard" theme="normal" />
        </Link>

        <Button
          type="button"
          title="Ver Quiniela"
          onClick={() => router.push("/quiniela")}
        />
      </div>
    </div>
  );
}
