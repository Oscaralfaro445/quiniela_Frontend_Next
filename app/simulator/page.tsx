"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useGetSimulatorMatches } from "@/hooks/matches/queries/useGetSimulatorMatches";
import { usePostSimulatorQuiniela } from "@/hooks/quiniela/mutation/usePostSimulatorQuiniela";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { SimulatedQuinielaData } from "@/types/SimulatedQuinielaData/simulatedQuinielaData";
import { QuinielaItem } from "@/types/quiniela/quinielaItem";
import { Card } from "@/components/shared/card/Card";
import { Button } from "@/components/shared/button/Button";
import { Title } from "@/components/shared/text/Title";
import { TextBody } from "@/components/shared/text/TextBody";
import { Modal } from "@/components/shared/modal/Modal";
import { StandingsSimulator } from "@/components/simulator/StandingsSimulator";
import { GroupRadioSimulator } from "@/components/simulator/GroupRadioSimulator";
import { PageHeader } from "@/components/shared/pageHeader/PageHeader";
import { QuinielaProgressBarCard } from "@/components/quiniela/QuinielaProgressCard";
import { DataUser } from "@/types/user/dataUser";

export default function SimulatorPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quinielaData, setQuinielaData] = useState<QuinielaItem[]>([]);
  const { isPending, isError, data, error } = useGetSimulatorMatches();
  const quinielaAlta = usePostSimulatorQuiniela();
  const { data: user } = useGetMe();
  const userInfo: DataUser = user?.data?.[0];
  const currentWeek = userInfo?.idPeriodo;
  const totalGames = data?.data?.length || 0;

  const completedPicks = quinielaData.filter(
    (game) => game.partGanador !== " ",
  ).length;

  useEffect(() => {
    if (data?.data) {
      const quinielaInitialData = data.data.map(
        (game: SimulatedQuinielaData[]) => ({
          ...game,
          partGanador: " ",
        }),
      );
      setQuinielaData(quinielaInitialData);
    }
  }, [data]);

  const handleChangeQuiniela = (idGame: number, team: string) => {
    setQuinielaData((prev) => {
      const quinielaUpdated = prev.map((game) =>
        game.Partido === idGame
          ? { ...game, partGanador: team === game.EquipoV ? "V" : "L" }
          : game,
      );
      return quinielaUpdated;
    });
  };

  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleSubmit = () => {
    const quinielaDataUpdated = quinielaData.map((game: QuinielaItem) => ({
      ID_PERIODO: userInfo!.idPeriodo,
      ID_PARTIDO: game.Partido,
      CVE_GANADOR: game.partGanador,
    }));

    quinielaAlta.mutate(JSON.stringify(quinielaDataUpdated));
    setIsModalOpen(true);
  };

  return (
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

          {isError && <p>Error al cargar los datos... {error?.message}</p>}

          {quinielaData && (
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

        <Button type="submit" title="Simular Quiniela" onClick={handleSubmit} />
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
  );
}
