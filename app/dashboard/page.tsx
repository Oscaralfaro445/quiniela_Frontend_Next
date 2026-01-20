"use client";

import { StatisticsCard } from "@/components/dashboard/StatisticsCard";
import { Timer } from "@/components/shared/timer/Timer";
import { SwiftActionsCard } from "@/components/dashboard/SwiftActionsCard";
import { UpcomingGamesCard } from "@/components/dashboard/UpcomingGamesCard";
import { SurvivorCard } from "@/components/dashboard/SurvivorCard";
import { AccumulatedBagCard } from "@/components/dashboard/AccumulatedBagCard";
import { SeasonProgressCard } from "@/components/dashboard/SeasonProgressCard";
import { PageHeader } from "@/components/ui/pageHeader/PageHeader";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";

export default function DashboardPage() {
  const { isLoading, isError, data, error } = useGetMe();
  const currentWeek = "17";

  return (
    <div className="pt-16">
      <PageHeader
        title={`¡Bienvenido de vuelta ${""}!`}
        text="Aquí tienes un resumen de tu rendimiento en la temporada."
      />

      <StatisticsCard currentWeek={currentWeek ?? ""} />

      <Timer />

      <div className="grid lg:grid-cols-2 w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 ">
        <SwiftActionsCard currentWeek={currentWeek ?? ""} />

        <AccumulatedBagCard />

        <SeasonProgressCard />

        <SurvivorCard />

        <UpcomingGamesCard currentWeek={currentWeek ?? ""} />
      </div>
    </div>
  );
}
