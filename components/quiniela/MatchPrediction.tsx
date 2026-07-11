import Link from "next/link";
import { useEffect, useState } from "react";
import { useGetMatches } from "@/hooks/queries/useGetMatches";
import { usePostSurvivorTeam } from "@/hooks/mutations/usePostSurvivorTeam";
import { usePostQuiniela } from "@/hooks/mutations/usePostQuiniela";
import { QuinielaItem } from "@/types/quiniela/quinielaItem";
import { Card } from "../shared/card/Card";
import { Icon } from "../shared/icon/Icon";
import { TextBody } from "../shared/text/TextBody";
import { Title } from "../shared/text/Title";
import { GroupRadio } from "./GroupRadio";
import { SurvivorSelector } from "./SurvivorSelector";
import { QuinielaProgressBarCard } from "./QuinielaProgressCard";
import { Button } from "../shared/button/Button";
import { AlertState } from "@/types/alert/alert";
import { useAlert } from "@/context/alert/AlertContext";
import { useGetMe } from "@/hooks/queries/user/useGetMe";

export const MatchPrediction = () => {
  const [selectedSurvivor, setSelectedSurvivor] = useState<number>(0);
  const [quinielaData, setQuinielaData] = useState<QuinielaItem[]>([]);
  const { isPending, isError, data, error } = useGetMatches();
  const survivorAlta = usePostSurvivorTeam();
  const quinielaAlta = usePostQuiniela();
  const { data: userData } = useGetMe();
  const { showAlert } = useAlert();
  const user = userData?.data?.[0];
  const totalGames = data?.data[0]?.quiniela?.length || 0;
  const isQuinielaEnabled =
    data?.data[0]?.extraData?.bQuiniela === 1 ? false : true;
  const completedPicks = quinielaData?.filter(
    (game) => game.partGanador !== " ",
  ).length;

  useEffect(() => {
    if (data?.data) {
      const quinielaInitialData = data?.data?.[0]?.quiniela?.map(
        (game: QuinielaItem) => ({
          ...game,
          ID_SCORE_E1: game.ID_SCORE_E1 ? game.ID_SCORE_E1 : 0,
          ID_SCORE_E2: game.ID_SCORE_E2 ? game.ID_SCORE_E2 : 0,
        }),
      );
      const initialSurvivor = data?.data?.[0]?.extraData?.idSurvivor;
      setSelectedSurvivor(initialSurvivor);
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

  const handleScoreChange = (
    partido: number,
    team: "away" | "home",
    score: number,
  ) => {
    setQuinielaData((prevGames) =>
      prevGames.map((game) =>
        game.Partido === partido
          ? {
              ...game,
              [team === "away" ? "ID_SCORE_E1" : "ID_SCORE_E2"]: score,
            }
          : game,
      ),
    );
  };

  const handleChangeSurvivor = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedSurvivor(Number(event.target.value));
  };

  const handleSubmit = () => {
    const fechaActual = new Date();
    const fechaLimite = new Date(`${user?.fLimite}T${user?.horaLimite}`);

    if (!isQuinielaEnabled) {
      showAlert(
        AlertState.WARNING,
        "Error de envio",
        "Quiniela previamente enviada, solo se puede enviar una vez",
      );

      return;
    }

    if (user?.bSurvivor) {
      if (selectedSurvivor < 1 || completedPicks !== totalGames) {
        showAlert(
          AlertState.WARNING,
          "Campos incompletos",
          "Por favor, completa todos los campos requeridos",
        );

        return;
      }
    } else {
      if (completedPicks !== totalGames) {
        showAlert(
          AlertState.WARNING,
          "Campos incompletos",
          "Por favor, completa todos los campos requeridos",
        );

        return;
      }
    }

    if (fechaActual > fechaLimite) {
      showAlert(
        AlertState.ERROR,
        "Fecha límite alcanzada",
        "El tiempo para enviar tu quiniela ha expirado.",
      );
      return;
    }

    if (
      quinielaData.some(
        (game) =>
          game.bMarcador && game.ID_SCORE_E1 === 0 && game.ID_SCORE_E2 === 0,
      )
    ) {
      showAlert(
        AlertState.ERROR,
        "Marcadores incompletos",
        "Ingresa los marcadores correspondientes al partido de desempate.",
      );
      return;
    }

    const quinielaDataUpdated = quinielaData.map((game: QuinielaItem) => ({
      ID_QUINIELA: user!.idQuiniela,
      ID_PARTICIPANTE: user!.idParticipante,
      ID_PERIODO: user!.idPeriodo,
      ID_PARTIDO: game.Partido,
      ID_SCORE_E1: game.ID_SCORE_E1,
      ID_SCORE_E2: game.ID_SCORE_E2,
      CVE_GANADOR: game.partGanador,
      B_MARCARDOR: game.bMarcador,
    }));

    if (user?.bSurvivor && selectedSurvivor > 0) {
      survivorAlta.mutate(selectedSurvivor);
    }
    quinielaAlta.mutate(quinielaDataUpdated);
  };

  return (
    <div className="space-y-6">
      <QuinielaProgressBarCard
        title="Progreso de la quiniela"
        description="Partidos completados de la semana"
        value={completedPicks}
        max={totalGames}
      />

      <Card>
        <div className="grid gap-2">
          <Title title="Quiniela" />

          <div className="grid md:flex gap-2 justify-between items-center">
            <TextBody text="Selecciona el ganador de cada juego" />

            <div className="grid md:flex p-2 gap-4 items-center border border-neutral-400 rounded-lg">
              <div className="flex gap-2">
                <Icon className="text-green-600" name="check" />
                <p>Equipo ganador</p>
              </div>

              <div className="flex gap-2">
                <Icon className="text-red-500" name="swords" />
                <p>Survivor utilizado</p>
              </div>
            </div>
          </div>
        </div>

        {isPending && <p>Loading...</p>}

        {isError && <p>Error al cargar los datos... {error?.message}</p>}

        <div className="grid lg:grid-cols-2 py-4 gap-4 overflow-y-auto max-h-[600px] ">
          {quinielaData?.map((game: QuinielaItem) => (
            <GroupRadio
              key={game.Partido}
              disabled={!isQuinielaEnabled}
              game={game}
              quinielaData={quinielaData}
              handleChangeQuiniela={handleChangeQuiniela}
              handleScoreChange={handleScoreChange}
            />
          ))}
        </div>
      </Card>

      {user?.bSurvivor && (
        <SurvivorSelector
          disabled={!isQuinielaEnabled}
          selectedSurvivor={selectedSurvivor}
          handleSelectedSurvivor={handleChangeSurvivor}
        />
      )}

      <div className="flex w-full gap-4 justify-center">
        <Link href="/dashboard">
          <Button type="button" title="Volver al Dashboard" theme="normal" />
        </Link>

        <Button type="submit" title="Enviar Quiniela" onClick={handleSubmit} />
      </div>
    </div>
  );
};
