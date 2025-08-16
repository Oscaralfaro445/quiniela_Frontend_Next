"use client";

import { useState } from "react";
import Link from "next/link";
import useGetMatches from "@/hooks/matches/queries/useGetMatches";
import useGetSurvivorTeams from "@/hooks/survivor/queries/useGetSurvivorTeams";
import usePostSurvivorTeam from "@/hooks/survivor/mutations/usePostSurvivorTeam";
import { SurvivorTeam } from "@/types/survivor/survivorTeam";
import { QuinielaWeekTeam } from "@/types/quiniela/quinielaWeekTeam";
import { ByeWeekTeam } from "@/types/quiniela/byeWeekTeam";
import { QuinielaItem } from "@/types/quiniela/quinielaItem";
import { useAuth } from "@/context/authContext/AuthContext";
import { useAlert } from "@/context/alertContext/AlertContext";
import { AlertState } from "@/types/alert/alert";
import { MainContainer } from "@/components/shared/mainContainer/MainContainer";
import { SectionGrid } from "@/components/shared/sectionGrid/SectionGrid";
import { WeeklyHeadline } from "@/components/quinielaCapture/WeeklyHeadline";
import { Survivor } from "@/components/quinielaCapture/Survivor";
import { Card } from "@/components/shared/card/Card";
import { Button } from "@/components/shared/button/Button";
import { ByeWeek } from "@/components/quinielaCapture/ByeWeek";
import { Timer } from "@/components/shared/timer/Timer";
import { GroupRadio } from "@/components/quinielaCapture/GroupRadio";
import { Title } from "@/components/shared/text/Title";
import { TextBody } from "@/components/shared/text/TextBody";

export default function QuinielaCapturePage() {
  const { dataUser } = useAuth();
  const { showAlert } = useAlert();
  const matches = useGetMatches();
  const survivor = useGetSurvivorTeams();
  const survivorAlta = usePostSurvivorTeam();
  const currentWeek = dataUser?.idPeriodo;
  const gamesData: QuinielaWeekTeam[] = matches?.data?.data?.quiniela;
  const byeData: ByeWeekTeam[] = matches?.data?.data?.bye;
  const survivorData: SurvivorTeam[] = survivor?.data?.data;
  const totalGames = gamesData?.length || 0;
  const isQuinielaEnabled =
    matches?.data?.data?.existeQuin?.bQuiniela === 1 ? false : true;
  console.log("isQuinielaEnabled:", isQuinielaEnabled);

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

    survivorAlta.mutate(selectedSurvivor);
  };

  return (
    <MainContainer>
      <SectionGrid>
        <WeeklyHeadline week={currentWeek} />
      </SectionGrid>

      {dataUser?.bSurvivor && survivorData && (
        <SectionGrid>
          <Survivor
            disabled={!isQuinielaEnabled}
            survivorData={survivorData}
            selectedSurvivor={selectedSurvivor}
            handleChangeSurvivor={handleChangeSurvivor}
          />
        </SectionGrid>
      )}

      {byeData && (
        <SectionGrid>
          <ByeWeek byeData={byeData} />
        </SectionGrid>
      )}

      <SectionGrid>
        <Timer />
      </SectionGrid>

      <SectionGrid>
        <Card>
          <div className="flex w-full justify-between items-center">
            <p className="text-lg font-semibold">Progreso</p>
            <p className="text-sm">{`${completedPicks}/${totalGames} juegos`}</p>
          </div>
        </Card>
      </SectionGrid>

      {gamesData && (
        <SectionGrid>
          <Card className="h-[900px] overflow-y-auto">
            <div className="grid md:flex w-full gap-4 justify-center md:justify-between items-center">
              <div className="grid gap-2">
                <Title title="Quiniela" />
                <TextBody text="Selecciona el ganador de cada juego" />
              </div>
            </div>
            {gamesData.map((game: QuinielaWeekTeam) => (
              <GroupRadio
                key={game.Partido}
                disabled={!isQuinielaEnabled}
                game={game}
                quinielaData={quinielaData}
                handleChangeQuiniela={handleChangeQuiniela}
              />
            ))}
          </Card>
        </SectionGrid>
      )}

      <SectionGrid>
        <div className="grid sm:flex w-full gap-4 justify-center items-center">
          <Link href="/dashboard">
            <Button type="button" title="Volver al Dashboard" theme="normal" />
          </Link>

          <Button
            type="submit"
            title="Enviar Quiniela"
            onClick={handleSubmit}
          />
        </div>
      </SectionGrid>
    </MainContainer>
  );
}
