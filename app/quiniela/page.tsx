"use client";

import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { DataUser } from "@/types/user/dataUser";
import { ByeWeek } from "@/components/quiniela/ByeWeek";
import { Timer } from "@/components/shared/timer/Timer";
import { PageHeader } from "@/components/shared/pageHeader/PageHeader";
import { MainContainer } from "@/components/ui/containers/MainContainer";
import { MatchPrediction } from "@/components/quiniela/MatchPrediction";

export default function QuinielaPage() {
  const { data: user } = useGetMe();
  const userInfo: DataUser = user?.data?.[0];
  const currentWeek = userInfo?.idPeriodo;

  return (
    <MainContainer>
      <div className="grid gap-4">
        <PageHeader
          title={`Quiniela - Semana ${currentWeek}`}
          text="Selecciona el ganador de cada juego"
        />
        <ByeWeek />
        <Timer />
        <MatchPrediction />
      </div>
    </MainContainer>
  );
}
