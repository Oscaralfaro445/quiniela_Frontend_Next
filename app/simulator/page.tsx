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
import { Title } from "@/components/shared/text/Title";
import { TextBody } from "@/components/shared/text/TextBody";
import { ProtectedRoute } from "@/components/shared/protectedRoute/ProtectedRoute";
import { QuinielaProgressCard } from "@/components/quiniela/QuinielaProgressCard";
import { Modal } from "@/components/shared/modal/Modal";
import { StandingsSimulator } from "@/components/simulator/StandingsSimulator";
import { GroupRadioSimulator } from "@/components/simulator/GroupRadioSimulator";

export interface SimulatedQuinielaData {
  Partido: number;
  IdV: number;
  EquipoV: string;
  IdL: number;
  EquipoL: string;
  Fecha: string;
  HoraPartido: string;
  Estadio: string;
  scoreVisit: number;
  scoreLocal: number;
}

export default function SimulatorPage() {
  const { dataUser } = useAuth();
  const { isPending, isError, isSuccess, data } = useGetSimulatorMatches();
  const quinielaAlta = usePostSimulatorQuiniela();
  const currentWeek = dataUser?.idPeriodo;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quinielaData, setQuinielaData] = useState<QuinielaItem[]>([]);
  const totalGames = data?.data?.length || 0;
  const completedPicks = quinielaData.filter(
    (game) => game.partGanador !== " "
  ).length;

  useEffect(() => {
    if (isSuccess && data.data) {
      const quinielaInitialData = data.data.map(
        (game: SimulatedQuinielaData[]) => ({
          ...game,
          partGanador: " ",
        })
      );
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

    quinielaAlta.mutate(JSON.stringify(quinielaDataUpdated));
    console.log("Quiniela Updated", quinielaDataUpdated);

    setIsModalOpen(true);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
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

              {isSuccess && quinielaData && (
                <div className="grid lg:grid-cols-2 gap-4">
                  {quinielaData.map((game: QuinielaItem) => (
                    <GroupRadioSimulator
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
              <Button
                type="button"
                title="Volver al Dashboard"
                theme="normal"
              />
            </Link>

            <Button
              type="submit"
              title="Simular Quiniela"
              onClick={handleSubmit}
            />
          </div>
        </section>

        <Modal isOpen={isModalOpen} onClose={handleModalOpen}>
          <StandingsSimulator
            quinielaAlta={{
              data: quinielaAlta?.data?.data,
              isPending: quinielaAlta.isPending,
              isError: quinielaAlta.isError,
              isSuccess: quinielaAlta.isSuccess,
            }}
          />
        </Modal>
      </div>
    </ProtectedRoute>
  );
}
