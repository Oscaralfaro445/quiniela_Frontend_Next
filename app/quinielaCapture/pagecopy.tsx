"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import usePostMatches from "@/hooks/matches/queries/useGetMatches";
import { useAuth } from "@/context/authContext/AuthContext";
import { Icon } from "@/components/shared/icon/Icon";
import { Card } from "@/components/shared/card/Card";

import { Button } from "@/components/shared/button/Button";
import { InputCombo } from "@/components/shared/input/inputs/InputCombo";
import usePostSurvivorTeams from "@/hooks/survivor/queries/useGetSurvivorTeams";
// import usePostScores from "@/hooks/scores/mutations/usePostScores";
import usePostSurvivorTeam from "@/hooks/survivor/mutations/usePostSurvivorTeam";
import { MainContainer } from "@/components/shared/mainContainer/MainContainer";
import { SectionGrid } from "@/components/shared/sectionGrid/SectionGrid";

interface QuinielaItem {
  ID_QUINIELA: number | undefined;
  ID_PARTICIPANTE: number | undefined;
  ID_PERIODO: string | undefined;
  ID_PARTIDO: number;
  CVE_GANADOR: string;
}

interface GameData {
  Partido: number;
  IdL: number;
  EquipoL: string;
  IdV: number;
  EquipoV: string;
  Fecha: string;
  HoraPartido: string;
  Estadio: string;
  // awayTeam?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export default function QuinielaCapturePage() {
  const { dataUser } = useAuth();
  // const scores = usePostScores();
  const matches = usePostMatches();
  const survivor = usePostSurvivorTeams();
  const survivorTeam = usePostSurvivorTeam();
  const week = dataUser?.idPeriodo;
  const survivorTeams = survivor?.data?.data;

  const [selectedSurvivor, setSelectedSurvivor] = useState(0);
  const [quinielaData, setQuinielaData] = useState<QuinielaItem[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  });

  const handleChangeQuiniela = (idGame: number, team: string): void => {
    setQuinielaData((prev) => {
      const updated = prev.some((item) => item.ID_PARTIDO === idGame)
        ? prev.map((item) =>
            item.ID_PARTIDO === idGame ? { ...item, CVE_GANADOR: team } : item
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

    console.log("Quiniela Data:", quinielaData);
  };

  const handleChangeSurvivor = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSurvivor(Number(event.target.value));
  };

  // Función para calcular tiempo restante detallado
  const calculateTimeRemaining = useCallback((): TimeRemaining => {
    if (!dataUser?.fLimite || !dataUser?.horaLimite) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    try {
      const fechaLimite = new Date(
        `${dataUser.fLimite}T${dataUser.horaLimite}`
      );
      const ahora = new Date();
      const diferencia = fechaLimite.getTime() - ahora.getTime();

      if (diferencia <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
      }

      const days = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diferencia % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds, total: diferencia };
    } catch (error) {
      console.error("Error calculando tiempo restante:", error);
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }
  }, [dataUser?.fLimite, dataUser?.horaLimite]);

  // useEffect para actualizar el contador cada segundo
  useEffect(() => {
    const updateTimer = () => {
      const newTimeRemaining = calculateTimeRemaining();
      setTimeRemaining(newTimeRemaining);
    };

    // Actualizar inmediatamente
    updateTimer();

    // Configurar el intervalo para actualizar cada segundo
    const interval = setInterval(updateTimer, 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [dataUser?.fLimite, dataUser?.horaLimite, calculateTimeRemaining]);

  // Función para verificar si aún está dentro del horario permitido
  const isWithinTimeLimit = (): boolean => {
    return timeRemaining.total > 0;
  };

  const handleSubmit = () => {
    // Validar que todos los campos estén completos
    if (selectedSurvivor < 1 || quinielaData.length !== totalGames) {
      console.log("Llene todos los campos antes de enviar su quiniela");
      // Aquí podrías mostrar una alerta al usuario
      return;
    }

    // Verificar si aún está dentro del horario permitido
    if (!isWithinTimeLimit()) {
      console.log("El tiempo límite para enviar la quiniela ha expirado");
      // Aquí podrías mostrar una alerta al usuario
      alert(`El tiempo límite para enviar la quiniela ha expirado. 
Fecha límite: ${dataUser?.fLimite} ${dataUser?.horaLimite}`);
      return;
    }

    // Enviar survivor
    survivorTeam.mutate(selectedSurvivor);

    // Aquí también podrías enviar la quinielaData si tienes una mutación para eso
    // quinielaMutation.mutate(quinielaData);
  };

  const games = matches?.data?.data[0].quiniela;
  const isTimeExpired = !isWithinTimeLimit();

  const completedPicks = quinielaData.length;
  const totalGames = games?.length || 0;
  const progressPercentage =
    totalGames > 0 ? (completedPicks / totalGames) * 100 : 0;

  return (
    <MainContainer>
      <SectionGrid>
        <div className="flex w-full items-center justify-between">
          <div className="grid gap-2">
            <h2 className="text-3xl font-bold text-gray-900">
              Semana {week} - Quiniela
            </h2>

            <p className="text-gray-600">Selecciona el ganador de cada juego</p>
          </div>
          {/* <Badge variant="outline" className="text-blue-700 border-blue-700">
            </Badge> */}
          NFL Temporada 2025
        </div>
      </SectionGrid>

      <SectionGrid>
        <div className="flex w-full justify-between items-center">
          <Card className="min-w-[200px]">
            <div className="p-4">
              <div className="flex flex-col gap-3">
                <div className="flex gap-4 items-center justify-between">
                  <p className="text-sm font-medium text-gray-700">Progreso</p>
                  <p className="text-sm text-gray-600">
                    {completedPicks}/{totalGames} juegos
                  </p>
                </div>

                {/* Barra de progreso */}
                <div className="w-full">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500">
                      {progressPercentage.toFixed(0)}% completado
                    </span>
                    {completedPicks === totalGames && totalGames > 0 && (
                      <span className="text-xs text-green-600 font-medium">
                        ¡Completo!
                      </span>
                    )}
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ease-out ${
                        completedPicks === totalGames && totalGames > 0
                          ? "bg-green-500"
                          : progressPercentage > 50
                          ? "bg-blue-500"
                          : "bg-blue-300"
                      }`}
                      style={{ width: `${progressPercentage}%` }}
                    >
                      {/* Efecto de brillo */}
                      <div className="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Indicadores de juegos */}
                  <div className="flex justify-between mt-2">
                    {Array.from(
                      { length: Math.min(totalGames, 12) },
                      (_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                            index < completedPicks
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                          title={`Juego ${index + 1}`}
                        ></div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Información del tiempo límite */}
          <Card
            className={`${
              isTimeExpired
                ? "border-red-500 bg-red-50"
                : "border-green-500 bg-green-50"
            } min-w-[280px]`}
          >
            <div className="p-4">
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center gap-2">
                  <Icon name={isTimeExpired ? "check" : "clock"} />
                  <p
                    className={`text-sm font-medium ${
                      isTimeExpired ? "text-red-700" : "text-green-700"
                    }`}
                  >
                    {isTimeExpired ? "Tiempo Agotado" : "Tiempo Restante"}
                  </p>
                </div>

                {!isTimeExpired ? (
                  <div className="bg-gray-900 rounded-lg px-4 py-2 font-mono">
                    <div className="flex items-center justify-center space-x-1 text-green-400">
                      {timeRemaining.days > 0 && (
                        <>
                          <div className="text-center">
                            <div className="text-lg font-bold">
                              {timeRemaining.days.toString().padStart(2, "0")}
                            </div>
                            <div className="text-xs">días</div>
                          </div>
                          <div className="text-lg font-bold">:</div>
                        </>
                      )}
                      <div className="text-center">
                        <div className="text-lg font-bold">
                          {timeRemaining.hours.toString().padStart(2, "0")}
                        </div>
                        <div className="text-xs">hrs</div>
                      </div>
                      <div className="text-lg font-bold">:</div>
                      <div className="text-center">
                        <div className="text-lg font-bold">
                          {timeRemaining.minutes.toString().padStart(2, "0")}
                        </div>
                        <div className="text-xs">min</div>
                      </div>
                      <div className="text-lg font-bold">:</div>
                      <div className="text-center">
                        <div className="text-lg font-bold">
                          {timeRemaining.seconds.toString().padStart(2, "0")}
                        </div>
                        <div className="text-xs">seg</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-900 rounded-lg px-4 py-2 font-mono">
                    <div className="text-red-400 text-center text-lg font-bold">
                      00:00:00:00
                    </div>
                  </div>
                )}

                <p
                  className={`text-xs ${
                    isTimeExpired ? "text-red-600" : "text-green-600"
                  }`}
                >
                  Límite: {dataUser?.fLimite} {dataUser?.horaLimite}
                </p>
              </div>
            </div>
          </Card>

          <div className="">
            {!isTimeExpired && dataUser?.bSurvivor && (
              <InputCombo
                name="survivor"
                data={survivorTeams || []}
                value={selectedSurvivor}
                onChange={handleChangeSurvivor}
                optionValueKey="llave"
                optionLabelKey="valor"
                disabled={isTimeExpired}
              />
            )}
          </div>
        </div>
      </SectionGrid>

      <SectionGrid>
        <div className="grid w-full">
          {games?.map((game: GameData) => (
            <Card
              key={game.Partido}
              className="border-gray-200 hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Icon name="clock" />
                    <span className="text-sm font-medium text-gray-700">
                      {game.Fecha}
                    </span>

                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Icon name="map-pin" />
                      <span>{game.Estadio}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    id={`${game.IdV}-${game.Partido}`}
                    name={`game-${game.Partido}`}
                    value={game.IdV}
                    disabled={isTimeExpired}
                    checked={quinielaData.some(
                      (item) =>
                        item.ID_PARTIDO === game.Partido &&
                        item.CVE_GANADOR === "V"
                    )}
                    onChange={() => handleChangeQuiniela(game.Partido, "V")}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex w-full items-center justify-between">
                      <span className="text-xs font-bold text-gray-700">
                        {game?.EquipoV}
                      </span>
                      {quinielaData.some(
                        (item) =>
                          item.ID_PARTIDO === game.Partido &&
                          item.CVE_GANADOR === "V"
                      ) && <Icon name="check" />}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    id={`${game.IdL}-${game.Partido}`}
                    name={`game-${game.Partido}`}
                    value={game.IdL}
                    disabled={isTimeExpired}
                    checked={quinielaData.some(
                      (item) =>
                        item.ID_PARTIDO === game.Partido &&
                        item.CVE_GANADOR === "L"
                    )}
                    onChange={() => handleChangeQuiniela(game.Partido, "L")}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex w-full items-center justify-between">
                      <span className="text-xs font-bold text-gray-700">
                        {game.EquipoL}
                      </span>
                      {quinielaData.some(
                        (item) =>
                          item.ID_PARTIDO === game.Partido &&
                          item.CVE_GANADOR === "L"
                      ) && <Icon name="check" />}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </SectionGrid>

      <SectionGrid>
        <div className="flex gap-4 justify-center items-center">
          <Link href="/dashboard">
            <Button type="button" title="Volver al Dashboard" theme="normal" />
          </Link>

          <Button
            type="submit"
            title={isTimeExpired ? "Tiempo Agotado" : "Enviar Quiniela"}
            theme={isTimeExpired ? "danger" : "primary"}
            onClick={handleSubmit}
            disabled={
              isTimeExpired ||
              selectedSurvivor < 1 ||
              quinielaData.length !== totalGames
            }
          />

          {isTimeExpired && (
            <p className="text-sm text-red-600 ml-2">
              El tiempo límite ha expirado. No se puede enviar la quiniela.
            </p>
          )}
        </div>
      </SectionGrid>
    </MainContainer>
  );
}
/* useEffect(() => {
    if (!dataUser?.fLimite || !dataUser?.horaLimite) return;

    const fechaLimite = new Date(`${dataUser.fLimite}T${dataUser.horaLimite}`);

    const updateTimer = () => {
      const diferencia = fechaLimite.getTime() - Date.now();
      setTimeRemaining(Math.max(0, diferencia));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [dataUser?.fLimite, dataUser?.horaLimite]);

  useEffect(() => {
    console.log("Timer updated:", timeRemaining);
  }, [timeRemaining]); */

/* const isWithinTimeLimit = (): boolean => {
    return timeRemaining > 0;
  }; */
