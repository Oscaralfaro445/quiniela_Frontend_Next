"use client";

import { useAuth } from "@/context/authContext/AuthContext";
import { Title } from "@/components/shared/text/Title";
import { TextBody } from "@/components/shared/text/TextBody";
import { ProtectedRoute } from "@/components/shared/protectedRoute/ProtectedRoute";
import { StatisticsCard } from "@/components/dashboard/StatisticsCard";
import { Timer } from "@/components/shared/timer/Timer";
import { SwiftActionsCard } from "@/components/dashboard/SwiftActionsCard";
import { UpcomingGamesCard } from "@/components/dashboard/UpcomingGamesCard";
import { SurvivorCard } from "@/components/dashboard/SurvivorCard";
import { AccumulatedBagCard } from "@/components/dashboard/AccumulatedBagCard";
import { SeasonProgressCard } from "@/components/dashboard/SeasonProgressCard";

export default function Dashboard() {
  const { dataUser } = useAuth();
  const currentWeek = dataUser?.idPeriodo;

  return (
    <ProtectedRoute>
      <section className="pt-18">
        <div className="grid lg:flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center lg:justify-between">
          <div className="grid gap-2 justify-items-start items-center">
            <Title
              className="text-center"
              title={`¡Bienvenido de vuelta ${dataUser?.nombre}!`}
            />
            <TextBody
              className="text-center"
              text="Aquí tienes un resumen de tu rendimiento en la temporada."
            />
          </div>

          <div className="flex h-fit justify-center items-center border-2 border-blue-600 rounded-2xl">
            <p className="px-2 py-1 text-sm font-semibold text-blue-700">
              NFL temporada 2025
            </p>
          </div>
        </div>
      </section>

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
    </ProtectedRoute>
  );
}
