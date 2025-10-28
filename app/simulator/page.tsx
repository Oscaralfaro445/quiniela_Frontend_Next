"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useGetSimulatorMatches } from "@/hooks/matches/queries/useGetSimulatorMatches";
import { usePostSimulatorQuiniela } from "@/hooks/quiniela/mutation/usePostSimulatorQuiniela";
import { QuinielaItem } from "@/types/quiniela/quinielaItem";
import { useAuth } from "@/context/authContext/AuthContext";
import { WeeklyHeadline } from "@/components/quiniela/WeeklyHeadline";
import { Card } from "@/components/shared/card/Card";
import { Button } from "@/components/shared/button/Button";
import { GroupRadio } from "@/components/quiniela/GroupRadio";
import { Title } from "@/components/shared/text/Title";
import { TextBody } from "@/components/shared/text/TextBody";
import { ProtectedRoute } from "@/components/shared/protectedRoute/ProtectedRoute";
import { QuinielaProgressCard } from "@/components/quiniela/QuinielaProgressCard";
import { Modal } from "@/components/shared/modal/Modal";
import { StandingsSimulator } from "@/components/simulator/StandingsSimulator";

export default function QuinielaPage() {
  const { dataUser } = useAuth();
  const { isPending, isError, isSuccess, data } = useGetSimulatorMatches();
  const quinielaAlta = usePostSimulatorQuiniela();
  const currentWeek = dataUser?.idPeriodo;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quinielaData, setQuinielaData] = useState<QuinielaItem[]>([]);
  const totalGames = data?.data.length || 0;
  const completedPicks = quinielaData.filter(
    (game) => game.partGanador !== " "
  ).length;

  console.log(quinielaData);

  useEffect(() => {
    if (isSuccess) {
      const quinielaInitialData = data.data.map((game) => ({
        ...game,
        partGanador: " ",
      }));
      setQuinielaData(quinielaInitialData);
    }
  }, [isSuccess, data]);

  const handleChangeQuiniela = (idGame: number, team: string) => {
    setQuinielaData((prev) => {
      const quinielaUpdated = prev.map((game) =>
        game.Partido === idGame
          ? { ...game, partGanador: team === game.EquipoV ? "V" : "L" }
          : game
      );
      return quinielaUpdated;
    });
  };

  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleSubmit = () => {
    const quinielaDataUpdated = quinielaData.map((game: QuinielaItem) => ({
      ID_PERIODO: dataUser!.idPeriodo,
      ID_PARTIDO: game.Partido,
      CVE_GANADOR: game.partGanador,
    }));

    console.log(quinielaDataUpdated);
    quinielaAlta.mutate(JSON.stringify(quinielaDataUpdated));

    setIsModalOpen(true);
  };

  return (
    <ProtectedRoute>
      <WeeklyHeadline week={currentWeek} />

      <QuinielaProgressCard
        completedPicks={completedPicks}
        totalGames={totalGames}
      />

      <section>
        <div className="max-w-[1280px] mx-auto px-10 py-8">
          <Card>
            <div className="grid gap-2">
              <Title title="Quiniela" />
              <TextBody text="Selecciona el ganador de cada juego" />
            </div>

            {isPending && <>Loading...</>}

            {isError && <></>}

            {isSuccess && (
              <div className="grid lg:grid-cols-2 gap-4">
                {quinielaData.map((game: QuinielaItem) => (
                  <GroupRadio
                    key={game.Partido}
                    disabled={false}
                    game={game}
                    quinielaData={quinielaData}
                    handleChangeQuiniela={handleChangeQuiniela}
                  />
                ))}
              </div>
            )}
          </Card>
        </div>
      </section>

      <section>
        <div className="flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center">
          <Link href="/dashboard">
            <Button type="button" title="Volver al Dashboard" theme="normal" />
          </Link>

          <Button
            type="submit"
            title="Simular Quiniela"
            onClick={handleSubmit}
          />
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={handleModalOpen}>
        <StandingsSimulator quinielaAlta={quinielaAlta} />
      </Modal>
    </ProtectedRoute>
  );
}
