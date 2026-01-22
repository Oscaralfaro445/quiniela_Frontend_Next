"use client";

import { useGetSurvivorReport } from "@/hooks/survivorReport/queries/useGetSurvivorReport";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { Card } from "../shared/card/Card";
import { useEffect, useState } from "react";
import { Paginator } from "../shared/paginator/paginator";
import { ParticipantSurvivor } from "@/types/participantSurvivor/participantSurvivor";

export const SurvivorReportCard = () => {
  const { isPending, isError, data, error } = useGetSurvivorReport();
  const { data: user } = useGetMe();
  const userInfo = user?.data?.[0];
  const survivorData = data?.data;
  const semanas = Object.keys(survivorData?.[0] || {})
    .filter((key) => key.startsWith("NOM_EQ_"))
    .map((key) => parseInt(key.split("_")[2]))
    .slice(0, parseInt(userInfo?.idPeriodo));

  const [rango, setRango] = useState({
    inicio: 0,
    fin: 0,
  });

  useEffect(() => {
    if (semanas.length > 0) {
      setRango({
        inicio: semanas.length - 4,
        fin: semanas.length,
      });
    }
  }, [semanas.length]);

  const handlePageChange = (page: number) => {
    setRango({
      inicio: page - 1,
      fin: page + 3,
    });
  };

  const semanasVisibles = semanas.slice(rango.inicio, rango.fin);

  const getBackgroundColor = (team: string) => {
    if (team.includes("(X)")) {
      return "bg-red-500 text-white";
    } else if (team.includes("(P)")) {
      return "bg-yellow-500 text-white";
    } else if (team !== " ") {
      return "bg-green-500 text-white";
    } else if (team === " ") {
      return "";
    }
  };

  const getCleanTeamName = (team: string) => {
    return team?.replace(/\s*\((X|P)\)\s*/g, "").trim() || "";
  };

  return (
    <div className="flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center">
      <Card>
        <p className="text-lg text-neutral-700">Progeso de participantes</p>

        {isPending && <p>Cargando datos...</p>}

        {isError && <p>Error cargando datos... {error?.message}</p>}

        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-600 text-white text-md leading-normal">
                <th>Participante</th>
                <th>SUV</th>
                <th>Aciertos</th>
                <th>Inv($)</th>
                {semanasVisibles.map((semana) => (
                  <th key={`header-${semana}`}>Semana {semana}</th>
                ))}
              </tr>
            </thead>

            <tbody className="text-neutral-600 text-sm">
              {survivorData?.map(
                (participante: ParticipantSurvivor, index: number) => (
                  <tr key={index}>
                    <td className="px-1 py-1 border border-gray-300 w-44">
                      {participante.NOM_PARTICIPANTE}
                    </td>
                    <td className="px-1 py-1 border border-gray-300 w-12">
                      {participante.NUM_SURVIVORS}
                    </td>
                    <td className="px-1 py-1 border border-gray-300 w-20">
                      {participante.NUM_ACIERTOS}
                    </td>
                    <td className="px-1 py-1 border border-gray-300 w-20">
                      {participante.IMP_INVERSION}
                    </td>
                    {semanasVisibles.map((semana) => (
                      <td
                        key={`row-${participante.ID_PARTICIPANTE}-semana-${semana}`}
                        className={`px-1 py-1 border border-gray-300 ${getBackgroundColor(
                          participante[`NOM_EQ_${semana}`],
                        )}`}
                      >
                        {getCleanTeamName(participante[`NOM_EQ_${semana}`])}
                      </td>
                    ))}
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>

        <Paginator
          currentPage={rango.inicio + 1}
          totalPages={semanas.length}
          onPageChange={handlePageChange}
        />
      </Card>
    </div>
  );
};
