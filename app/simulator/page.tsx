"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useGetSimulatorMatches } from "@/hooks/matches/queries/useGetSimulatorMatches";
import { usePostSimulatorQuiniela } from "@/hooks/quiniela/mutation/usePostSimulatorQuiniela";
import { SimulatedQuinielaData } from "@/types/SimulatedQuinielaData/simulatedQuinielaData";
import { QuinielaItem } from "@/types/quiniela/quinielaItem";
import { useAuth } from "@/context/authContext/AuthContext";
import { Card } from "@/components/shared/card/Card";
import { Button } from "@/components/shared/button/Button";
import { Title } from "@/components/shared/text/Title";
import { TextBody } from "@/components/shared/text/TextBody";
import { ProtectedRoute } from "@/components/shared/protectedRoute/ProtectedRoute";
import { Modal } from "@/components/shared/modal/Modal";
import { StandingsSimulator } from "@/components/simulator/StandingsSimulator";
import { GroupRadioSimulator } from "@/components/simulator/GroupRadioSimulator";
import { PageHeader } from "@/components/ui/pageHeader/PageHeader";
import { QuinielaProgressBarCard } from "@/components/quiniela/QuinielaProgressCard";

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
    setIsModalOpen(true);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen pt-16">
        <PageHeader
          title={`Simulador de quiniela - semana ${currentWeek}`}
          text="En este apartado podrás simular los resultados de los partidos y ver la clasificación semanal y global"
        />

        <QuinielaProgressBarCard
          title="Progreso del simulador"
          description="Partidos completados"
          value={completedPicks}
          max={totalGames}
        />

        <div className="max-w-[1280px] mx-auto px-10 py-8">
          <Card>
            <div className="grid gap-2">
              <Title title="Quiniela" />
              <TextBody text="Selecciona el ganador de cada juego" />
            </div>

            {isPending && <p>Cargando...</p>}

            {isError && <p>Error al cargar los datos...</p>}

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
