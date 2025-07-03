"use client";

import { useEffect, useState } from "react";
// import TeamLogo from "./TeamLogo";

interface gameResultsData {
  ID_PARTIDO: number;
  ID_EQUIPO_2: number;
  VISITANTE: string;
  ID_SCORE_E2: number;
  ID_SCORE_E1: number;
  LOCAL: string;
  ID_EQUIPO_1: number;
}

const GameResults = ({ SEMANA }: { SEMANA: number }) => {
  const [gameResultsData, setGameResultsData] = useState<gameResultsData[]>([]);

  useEffect(() => {
    const fetchGameResultsData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/gameResults`
        );

        if (!response.ok)
          throw new Error(
            `Error HTTP: ${response.status} ${response.statusText}`
          );

        const data: gameResultsData[] = await response.json();
        setGameResultsData(data);
      } catch (err) {
        console.log("Error al obtener los datos de los resultados:", err);
        alert(
          "Hubo un problema al cargar los datos de los resultados. Intenta de nuevo más tarde."
        );
      }
    };

    fetchGameResultsData();
  }, [SEMANA]);

  return (
    <div className="w-full flex flex-col bg-white shadow-md rounded-lg overflow-hidden pb-4 pt-2 px-2 items-center">
      <table className="w-3/4">
        <thead>
          <tr className="bg-blue-600 text-white text-center text-md leading-normal">
            <th className="py-1 w-auto" colSpan={2}>
              Visitante
            </th>
            <th className="py-1 w-auto">S1</th>
            <th className="py-1 w-auto">S2</th>
            <th className="py-1 w-auto" colSpan={2}>
              Local
            </th>
          </tr>
        </thead>
        <tbody className="text-center text-gray-700 text-sm">
          {gameResultsData.map((game, index) => (
            <GameResultsRow key={game.ID_PARTIDO} game={game} index={index} />
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4"></div>
    </div>
  );
};

const GameResultsRow = ({
  game,
  index,
}: {
  game: gameResultsData;
  index: number;
}) => {
  return (
    <>
      <tr key={index} className="bg-white">
        <td className="items-center px-4 py-2 border border-gray-300">
          {/* <TeamLogo teamId={game.ID_EQUIPO_1}></TeamLogo> */}
        </td>
        <td className="justify-center px-4 py-2 border border-gray-300">
          {game.VISITANTE}
        </td>
        <td className="justify-center px-4 py-2 border border-gray-300">
          {game.ID_SCORE_E1}
        </td>
        <td className="justify-center px-4 py-2 border border-gray-300">
          {game.ID_SCORE_E2}
        </td>
        <td className="justify-center px-4 py-2 border border-gray-300">
          {game.LOCAL}
        </td>
        <td className="items-center px-4 py-2 border border-gray-300">
          {/* <TeamLogo teamId={game.ID_EQUIPO_2}></TeamLogo> */}
        </td>
      </tr>
    </>
  );
};

export default GameResults;
