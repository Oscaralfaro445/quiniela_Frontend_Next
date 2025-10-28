"use client";

import { useAuth } from "@/context/authContext/AuthContext";
import { ProtectedRoute } from "@/components/shared/protectedRoute/ProtectedRoute";
import { StatisticsCard } from "@/components/dashboard/StatisticsCard";
import { Timer } from "@/components/shared/timer/Timer";
import { SwiftActionsCard } from "@/components/dashboard/SwiftActionsCard";
import { UpcomingGamesCard } from "@/components/dashboard/UpcomingGamesCard";
import { SurvivorCard } from "@/components/dashboard/SurvivorCard";
import { AccumulatedBagCard } from "@/components/dashboard/AccumulatedBagCard";
import { SeasonProgressCard } from "@/components/dashboard/SeasonProgressCard";
import { HeaderPage } from "@/components/ui/headerPage/HeaderPage";

export default function Dashboard() {
  const { dataUser } = useAuth();
  const currentWeek = dataUser?.idPeriodo;

  return (
    <ProtectedRoute>
      <div className="grid pt-18">
        <HeaderPage
          title={`¡Bienvenido de vuelta ${dataUser?.nombre}!`}
          text="Aquí tienes un resumen de tu rendimiento en la temporada."
        />

        <StatisticsCard currentWeek={currentWeek ?? ""} />

        <Timer />

        <section>
          <div className="grid lg:grid-cols-2 w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 ">
            <SwiftActionsCard currentWeek={currentWeek ?? ""} />

            <AccumulatedBagCard />

            <SeasonProgressCard />

            <SurvivorCard />

            <UpcomingGamesCard currentWeek={currentWeek ?? ""} />
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
