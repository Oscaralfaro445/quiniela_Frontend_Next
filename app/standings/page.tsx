"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetParticipantPositions } from "@/hooks/participantPositions/queries/useGetParticipantPositions";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { ParticipantStatistics } from "@/types/participantStatistics/participantStatistics";
import { Button } from "@/components/shared/button/Button";
import { StatisticsCard } from "@/components/standings/StatisticsCard";
import { PageHeader } from "@/components/ui/pageHeader/PageHeader";
import { PeriodTabs } from "@/components/standings/PeriodTabs";
import { StandingsCard } from "@/components/standings/StandingsCard";

export type TabType = "weekly" | "global";

export default function StandingsPage() {
  const router = useRouter();
  const { data: me } = useGetMe();
  const dataUser = me?.data;
  const { isPending, isError, isSuccess, data } = useGetParticipantPositions();
  const participantData = data?.data[0];
  const currentWeek = dataUser?.idPeriodo;
  const weeklyLeaderboard: ParticipantStatistics[] =
    participantData?.puntosPeriodo;
  const globalLeaderboard: ParticipantStatistics[] =
    participantData?.puntosTotal;
  const [activeTab, setActiveTab] = useState<TabType>("weekly");

  return (
    <div className="pt-18">
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
            isSuccess={isSuccess}
            leaderboard={weeklyLeaderboard}
          />
        )}

        {activeTab === "global" && (
          <div className="">
            <StandingsCard
              period="global"
              isPending={isPending}
              isError={isError}
              isSuccess={isSuccess}
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
