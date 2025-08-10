"use client";

import { useState } from "react";
import Link from "next/link";
import useGetMatches from "@/hooks/matches/queries/useGetMatches";
import useGetSurvivorTeams from "@/hooks/survivor/queries/useGetSurvivorTeams";
import { useAuth } from "@/context/authContext/AuthContext";
import { MainContainer } from "@/components/shared/mainContainer/MainContainer";
import { SectionGrid } from "@/components/shared/sectionGrid/SectionGrid";
import { WeeklyHeadline } from "@/components/quinielaCapture/WeeklyHeadline";
import { Survivor } from "@/components/quinielaCapture/Survivor";
import { Card } from "@/components/shared/card/Card";
import { Icon } from "@/components/shared/icon/Icon";
import { Button } from "@/components/shared/button/Button";
import { ByeWeek } from "@/components/quinielaCapture/ByeWeek";

interface QuinielaItem {
  ID_QUINIELA: number | undefined;
  ID_PARTICIPANTE: number | undefined;
  ID_PERIODO: string | undefined;
  ID_PARTIDO: number;
  CVE_GANADOR: string;
}

export interface ByeWeekTeam {
  IdEquipo: number;
  NomEquipo: string;
}

interface QuinielaWeekTeam {
  Partido: number;
  IdL: number;
  EquipoL: string;
  IdV: number;
  EquipoV: string;
  Fecha: string;
  HoraPartido: string;
  Estadio: string;
}

export interface SurvivorTeam {
  llave: number;
  valor: string;
}

export default function QuinielaCapturePage() {
  const { dataUser } = useAuth();
  const matches = useGetMatches();
  const survivor = useGetSurvivorTeams();
  const week = dataUser?.idPeriodo;
  const gamesData: QuinielaWeekTeam[] = matches?.data?.data[0].quiniela;
  const byeData: ByeWeekTeam[] = matches?.data?.data[0].bye;
  const survivorData: SurvivorTeam[] = survivor?.data?.data;
  const totalGames = gamesData.length;

  const [selectedSurvivor, setSelectedSurvivor] = useState(0);
  const [quinielaData, setQuinielaData] = useState<QuinielaItem[]>([]);

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

    console.log("Quiniela Data:", quinielaData);
  };

  const handleSubmit = () => {};

  return (
    <MainContainer>
      <SectionGrid>
        <>Timer</>
      </SectionGrid>

      <SectionGrid>
        <WeeklyHeadline week={week} />
      </SectionGrid>

      <SectionGrid>
        <Card>
          <div className="flex w-full justify-between items-center">
            <p className="text-lg font-semibold">Progreso</p>
            <p className="text-sm">{"0/6 juegos"}</p>
          </div>
        </Card>
      </SectionGrid>

      {dataUser?.bSurvivor && survivorData && (
        <SectionGrid>
          <Survivor
            survivorData={survivorData}
            selectedSurvivor={survivorData[selectedSurvivor].valor}
            handleChangeSurvivor={handleChangeSurvivor}
          />
        </SectionGrid>
      )}

      {byeData && (
        <SectionGrid>
          <ByeWeek byeData={byeData} />
        </SectionGrid>
      )}

      {gamesData && (
        <SectionGrid>
          {gamesData.map((game: QuinielaWeekTeam) => (
            <Card
              className="hover:shadow-md transition-shadow"
              key={game.Partido}
            >
              <div className="flex w-full gap-4 justify-start items-center">
                <Icon name="clock" size={18} />
                <p className="text-sm">{game.Fecha}</p>
                <Icon name="map-pin" size={18} />
                <p className="text-sm">{game.Estadio}</p>
              </div>

              <Card>
                <div className="flex w-full justify-between items-center">
                  <div className="flex w-full justify-start items-center gap-2">
                    <input
                      type="radio"
                      name={`game-${game.Partido}`}
                      id={`game-${game.Partido}`}
                      value={game.IdV}
                      disabled={false}
                      checked={quinielaData.some(
                        (item) =>
                          item.ID_PARTIDO === game.Partido &&
                          item.CVE_GANADOR === game.EquipoV
                      )}
                      onChange={() =>
                        handleChangeQuiniela(game.Partido, game.EquipoV)
                      }
                    />
                    Circulo de equipo
                    <label htmlFor={`game-${game.Partido}`} className="text-sm">
                      {game.EquipoV}
                    </label>
                  </div>

                  {quinielaData.some(
                    (item) =>
                      item.ID_PARTIDO === game.Partido &&
                      item.CVE_GANADOR === game.EquipoV && (
                        <Icon name="check" size={12} />
                      )
                  )}
                </div>
              </Card>

              <Card>
                <input
                  type="radio"
                  name={`game-${game.Partido}`}
                  id={`game-${game.Partido}`}
                  value={game.IdL}
                  disabled={false}
                  checked={quinielaData.some(
                    (item) =>
                      item.ID_PARTIDO === game.Partido &&
                      item.CVE_GANADOR === game.EquipoL
                  )}
                  onChange={() =>
                    handleChangeQuiniela(game.Partido, game.EquipoL)
                  }
                />
              </Card>
            </Card>
          ))}
        </SectionGrid>
      )}

      <SectionGrid>
        <div className="flex w-full gap-4 justify-center items-center">
          <Link href="/dashboard">
            <Button type="button" title="Volver al Dashboard" theme="normal" />
          </Link>

          <Button
            type="submit"
            // title={isTimeExpired ? "Tiempo Agotado" : "Enviar Quiniela"}
            // theme={isTimeExpired ? "danger" : "primary"}
            onClick={handleSubmit}
            disabled={
              isTimeExpired ||
              selectedSurvivor < 1 ||
              quinielaData.length !== totalGames
            }
          />
        </div>

        <div className="flex w-full justify-center items-center">
          {/* {isTimeExpired && (
            <p className="text-sm text-red-600 ml-2">
              El tiempo límite ha expirado. No se puede enviar la quiniela.
            </p>
          )} */}
        </div>
      </SectionGrid>
    </MainContainer>
  );
}
