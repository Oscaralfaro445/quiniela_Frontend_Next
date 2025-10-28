"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useGetMatches } from "@/hooks/matches/queries/useGetMatches";
import { usePostSurvivorTeam } from "@/hooks/survivor/mutations/usePostSurvivorTeam";
import { usePostQuiniela } from "@/hooks/quiniela/mutation/usePostQuiniela";
import { AlertState } from "@/types/alert/alert";
import { QuinielaItem } from "@/types/quiniela/quinielaItem";
import { useAuth } from "@/context/authContext/AuthContext";
import { useAlert } from "@/context/alertContext/AlertContext";
import { WeeklyHeadline } from "@/components/quiniela/WeeklyHeadline";
import { Card } from "@/components/shared/card/Card";
import { Button } from "@/components/shared/button/Button";
import { ByeWeek } from "@/components/quiniela/ByeWeek";
import { Timer } from "@/components/shared/timer/Timer";
import { GroupRadio } from "@/components/quiniela/GroupRadio";
import { Title } from "@/components/shared/text/Title";
import { TextBody } from "@/components/shared/text/TextBody";
import { ProtectedRoute } from "@/components/shared/protectedRoute/ProtectedRoute";
import { QuinielaProgressCard } from "@/components/quiniela/QuinielaProgressCard";
import { SurvivorSelector } from "@/components/quiniela/SurvivorSelector";

export default function QuinielaPage() {
  const { dataUser } = useAuth();
  const { showAlert } = useAlert();
  const { isPending, isError, isSuccess, data } = useGetMatches();
  const survivorAlta = usePostSurvivorTeam();
  const quinielaAlta = usePostQuiniela();
  const currentWeek = dataUser?.idPeriodo;
  const isQuinielaEnabled =
    data?.data[0]?.extraData?.bQuiniela === 1 ? false : true;

  const [selectedSurvivor, setSelectedSurvivor] = useState<number>(0);
  const [quinielaData, setQuinielaData] = useState<QuinielaItem[]>([]);
  const totalGames = data?.data[0]?.quiniela?.length || 0;
  const completedPicks = quinielaData.filter(
    (game) => game.partGanador !== " "
  ).length;

  useEffect(() => {
    if (isSuccess) {
      const quinielaInitialData = data.data[0].quiniela;
      setSelectedSurvivor(0);
      setQuinielaData(quinielaInitialData);
    }
  }, [isSuccess, data]);

  const handleChangeSurvivor = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSurvivor(Number(event.target.value));
  };

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

  const handleSubmit = () => {
    const fechaActual = new Date();
    const fechaLimite = new Date(
      `${dataUser?.fLimite}T${dataUser?.horaLimite}`
    );

    if (!isQuinielaEnabled) {
      showAlert(
        AlertState.WARNING,
        "Error de envio",
        "Quiniela previamente enviada, solo se puede enviar una vez"
      );

      return;
    }

    if (dataUser?.bSurvivor) {
      if (selectedSurvivor < 1 || completedPicks !== totalGames) {
        showAlert(
          AlertState.WARNING,
          "Campos incompletos",
          "Por favor, completa todos los campos requeridos"
        );

        return;
      }
    } else {
      if (completedPicks !== totalGames) {
        showAlert(
          AlertState.WARNING,
          "Campos incompletos",
          "Por favor, completa todos los campos requeridos"
        );

        return;
      }
    }

    if (fechaActual > fechaLimite) {
      showAlert(
        AlertState.ERROR,
        "Fecha límite alcanzada",
        "El tiempo para enviar tu quiniela ha expirado."
      );
      return;
    }

    const quinielaDataUpdated = quinielaData.map((game: QuinielaItem) => ({
      ID_QUINIELA: dataUser!.idQuiniela,
      ID_PARTICIPANTE: dataUser!.idParticipante,
      ID_PERIODO: dataUser!.idPeriodo,
      ID_PARTIDO: game.Partido,
      CVE_GANADOR: game.partGanador,
    }));

    if (dataUser?.bSurvivor && selectedSurvivor > 0) {
      survivorAlta.mutate(selectedSurvivor);
    }
    quinielaAlta.mutate(quinielaDataUpdated);
  };

  return (
    <ProtectedRoute>
      <WeeklyHeadline week={currentWeek} />

      <ByeWeek />

      <Timer />

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
                    disabled={!isQuinielaEnabled}
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

      {dataUser?.bSurvivor && (
        <SurvivorSelector
          disabled={!isQuinielaEnabled}
          selectedSurvivor={selectedSurvivor}
          value={data?.data[0].extraData.nomSurvivor}
          handleSelectedSurvivor={handleChangeSurvivor}
        />
      )}

      <section>
        <div className="flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center">
          <Link href="/dashboard">
            <Button type="button" title="Volver al Dashboard" theme="normal" />
          </Link>

          <Button
            type="submit"
            title="Enviar Quiniela"
            onClick={handleSubmit}
          />
        </div>
      </section>
    </ProtectedRoute>
  );
}
