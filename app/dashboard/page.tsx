"use client";

import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { DataUser } from "@/types/user/dataUser";
import { StatisticsCard } from "@/components/dashboard/StatisticsCard";
import { Timer } from "@/components/shared/timer/Timer";
import { SwiftActionsCard } from "@/components/dashboard/SwiftActionsCard";
import { UpcomingGamesCard } from "@/components/dashboard/UpcomingGamesCard";
import { SurvivorCard } from "@/components/dashboard/SurvivorCard";
import { AccumulatedBagCard } from "@/components/dashboard/AccumulatedBagCard";
import { SeasonProgressCard } from "@/components/dashboard/SeasonProgressCard";
import { PageHeader } from "@/components/shared/pageHeader/PageHeader";
import { MainContainer } from "@/components/ui/containers/MainContainer";

export default function DashboardPage() {
  const { data: user } = useGetMe();
  const userInfo: DataUser = user?.data[0];

  return (
    <MainContainer>
      <PageHeader
        title={`¡Bienvenido de vuelta ${userInfo?.nombreCompleto}!`}
        text="Aquí tienes un resumen de tu rendimiento en la temporada."
      />

      <StatisticsCard />

      <Timer />

      <div className="grid lg:grid-cols-2 w-full gap-4 ">
        <SwiftActionsCard />

        <AccumulatedBagCard />

        <SeasonProgressCard />

        <SurvivorCard />

        <UpcomingGamesCard />
      </div>
    </MainContainer>
  );
}
