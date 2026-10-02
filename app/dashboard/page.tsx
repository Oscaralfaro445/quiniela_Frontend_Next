"use client";

import { useGetMe } from "@/hooks/queries/user/useGetMe";
import { StatisticsCard } from "@/components/dashboard/StatisticsCard";
import { Timer } from "@/components/shared/timer/Timer";
import { SwiftActionsCard } from "@/components/dashboard/SwiftActionsCard";
import { UpcomingGamesCard } from "@/components/dashboard/UpcomingGamesCard";
import { SurvivorCard } from "@/components/dashboard/SurvivorCard";
import { AccumulatedBagCard } from "@/components/dashboard/AccumulatedBagCard";
import { SeasonProgressCard } from "@/components/dashboard/SeasonProgressCard";
import { PageHeader } from "@/components/shared/pageHeader/PageHeader";
import { MainContainer } from "@/components/ui/containers/MainContainer";
import { ConferenceCard } from "@/components/dashboard/ConferenceCard";
import { MatchVotesCard } from "@/components/dashboard/MatchVotesCard";
import { Modal } from "@/components/shared/modal/Modal";
import { MatchPredictionCard } from "@/components/scores/MatchPredictionCard";
import { useState } from "react";
// import { TeamLogo } from "@/components/shared/teamLogo/TeamLogo";

export default function DashboardPage() {
  const [selectedGame, setSelectedGame] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data } = useGetMe();
  const userInfo = data?.data?.[0];

  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handlePredictionClick = (gameId: number) => {
    setSelectedGame(gameId);
    handleModalOpen();
  };

  return (
    <MainContainer>
      <div className="grid gap-4">
        {/* <div className="flex w-full gap-4 items-center"> */}
        <PageHeader
          title={`¡Bienvenido de vuelta ${userInfo?.nombreCompleto ?? ""}!`}
          text="Aquí tienes un resumen de tu rendimiento en la temporada."
        />
        {/* <TeamLogo teamName={userInfo?.nomEquipoFav ?? ""} />
        </div> */}
        <StatisticsCard />
        <Timer />

        <div className="grid w-full gap-4 ">
          <SwiftActionsCard />
          <AccumulatedBagCard />
          <MatchVotesCard handlePredictionClick={handlePredictionClick} />
          <ConferenceCard />
          <SeasonProgressCard />
          <SurvivorCard />
          <UpcomingGamesCard />
        </div>
      </div>

      <Modal isModalOpen={isModalOpen} closeModal={handleModalOpen}>
        <MatchPredictionCard gameId={selectedGame} />
      </Modal>
    </MainContainer>
  );
}
