"use client";

import { useState } from "react";
import Link from "next/link";
import { useGetMatches } from "@/hooks/matches/queries/useGetMatches";
import useGetSurvivorTeams from "@/hooks/survivor/queries/useGetSurvivorTeams";
import usePostSurvivorTeam from "@/hooks/survivor/mutations/usePostSurvivorTeam";
import { usePostQuiniela } from "@/hooks/quiniela/mutation/usePostQuiniela";
import { AlertState } from "@/types/alert/alert";
import { SurvivorTeam } from "@/types/survivor/survivorTeam";
import { QuinielaWeekTeam } from "@/types/quiniela/quinielaWeekTeam";
import { QuinielaItem } from "@/types/quiniela/quinielaItem";
import { useAuth } from "@/context/authContext/AuthContext";
import { useAlert } from "@/context/alertContext/AlertContext";
import { WeeklyHeadline } from "@/components/quinielaCapture/WeeklyHeadline";
import { Survivor } from "@/components/quinielaCapture/Survivor";
import { Card } from "@/components/shared/card/Card";
import { Button } from "@/components/shared/button/Button";
import { ByeWeek } from "@/components/quinielaCapture/ByeWeek";
import { Timer } from "@/components/shared/timer/Timer";
import { GroupRadio } from "@/components/quinielaCapture/GroupRadio";
import { Title } from "@/components/shared/text/Title";
import { TextBody } from "@/components/shared/text/TextBody";
import { ProtectedRoute } from "@/components/shared/protectedRoute/ProtectedRoute";
import { QuinielaProgressCard } from "@/components/quinielaCapture/QuinielaProgressCard";

export default function QuinielaCapturePage() {
  const { dataUser } = useAuth();
  const { showAlert } = useAlert();
  const matches = useGetMatches();
  const survivor = useGetSurvivorTeams();
  const survivorAlta = usePostSurvivorTeam();
  const quinielaAlta = usePostQuiniela();
  const currentWeek = dataUser?.idPeriodo;
  const gamesData: QuinielaWeekTeam[] = matches?.data?.data[0]?.quiniela;
  const survivorData: SurvivorTeam[] = survivor?.data?.data;
  const totalGames = gamesData?.length || 0;
  const isQuinielaEnabled =
    matches?.data?.data?.existeQuin?.bQuiniela === 1 ? false : true;

  const [selectedSurvivor, setSelectedSurvivor] = useState(0);
  const [quinielaData, setQuinielaData] = useState<QuinielaItem[]>([]);
  const completedPicks = quinielaData.length;

  const handleChangeSurvivor = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSurvivor(Number(event.target.value));
  };

  const handleChangeQuiniela = (idGame: number, team: string) => {
    setQuinielaData((prev) => {
      const updated = prev.some((game) => game.ID_PARTIDO === idGame)
        ? prev.map((game) =>
            game.ID_PARTIDO === idGame ? { ...game, CVE_GANADOR: team } : game
          )
        : [
            ...prev,
            {
              ID_QUINIELA: dataUser?.idQuiniela,
              ID_PARTICIPANTE: dataUser?.idParticipante,
              ID_PERIODO: dataUser?.idPeriodo,
              ID_PARTIDO: idGame,
              CVE_GANADOR: team,
            },
          ];
      return updated;
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

    if (selectedSurvivor < 1 || quinielaData.length !== totalGames) {
      showAlert(
        AlertState.WARNING,
        "Campos incompletos",
        "Por favor, completa todos los campos requeridos"
      );

      return;
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
      ID_PARTIDO: game.ID_PARTIDO,
      CVE_GANADOR: game.CVE_GANADOR,
    }));

    survivorAlta.mutate(selectedSurvivor);
    quinielaAlta.mutate(quinielaDataUpdated);
  };

  return (
    <ProtectedRoute>
      <section className="pt-18">
        <div className="max-w-[1280px] mx-auto px-10 py-8">
          <WeeklyHeadline week={currentWeek} />
        </div>
      </section>

      {dataUser?.bSurvivor && survivorData && (
        <section>
          <div className="max-w-[1280px] mx-auto px-10 py-8">
            <Survivor
              disabled={!isQuinielaEnabled}
              survivorData={survivorData}
              selectedSurvivor={selectedSurvivor}
              handleChangeSurvivor={handleChangeSurvivor}
            />
          </div>
        </section>
      )}

      <ByeWeek />

      <Timer />

      <QuinielaProgressCard
        completedPicks={completedPicks}
        totalGames={totalGames}
      />

      {gamesData && (
        <section>
          <div className="max-w-[1280px] mx-auto px-10 py-8">
            <Card>
              <div className="grid gap-2">
                <Title title="Quiniela" />
                <TextBody text="Selecciona el ganador de cada juego" />
              </div>

              <div className="grid lg:grid-cols-2 gap-4">
                {gamesData.map((game: QuinielaWeekTeam) => (
                  <GroupRadio
                    key={game.Partido}
                    disabled={!isQuinielaEnabled}
                    game={game}
                    quinielaData={quinielaData}
                    handleChangeQuiniela={handleChangeQuiniela}
                  />
                ))}
              </div>
            </Card>
          </div>
        </section>
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
