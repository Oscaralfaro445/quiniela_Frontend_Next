"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/shared/button/Button";

interface Match {
  ID_PARTIDO: number;
  EQ_LOCAL: string;
  EQ_VISITANTE: string;
}

interface Score {
  ID_PARTIDO: number;
  LOCAL_SCORE: number | null;
  VISITANTE_SCORE: number | null;
}

interface MatchScoreInputRowProps {
  match: Match;
  scores: Score[];
  handleScoreChange: (
    id: number,
    team: "LOCAL_SCORE" | "VISITANTE_SCORE",
    value: number
  ) => void;
}

const MatchScoreInput = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch de partidos al montar el componente
  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3001/api/v1/matchData");

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data: Match[] = await response.json();
        setMatches(data);

        // Inicializar los scores con datos vacíos
        const initialScores = data.map((match) => ({
          ID_PARTIDO: match.ID_PARTIDO,
          LOCAL_SCORE: null,
          VISITANTE_SCORE: null,
        }));
        setScores(initialScores);
      } catch (err) {
        console.error("Error fetching matches:", err);
        alert("No se pudieron cargar los partidos. Intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  // Manejar cambios en los inputs de scores
  const handleScoreChange = (
    id: number,
    team: "LOCAL_SCORE" | "VISITANTE_SCORE",
    value: number
  ) => {
    setScores((prevScores) =>
      prevScores.map((score) =>
        score.ID_PARTIDO === id ? { ...score, [team]: value } : score
      )
    );
  };

  // Mostrar mensaje para confirmar los datos almacenados
  const handleSave = () => {
    console.log("Marcadores guardados:", scores);
    alert("Marcadores guardados correctamente.");
  };

  return (
    <div className="w-full h-full flex flex-col bg-white  overflow-hidden pb-4 pt-2 px-2 justify-center items-center">
      {loading ? (
        <p>Cargando partidos...</p>
      ) : (
        <table className="w-3/4">
          <thead>
            <tr className="bg-blue-600 text-white text-center text-md leading-normal">
              <th className="py-1 w-auto">Partido</th>
              <th className="py-1 w-auto">Local</th>
              <th className="py-1 w-auto">S1</th>
              <th className="py-1 w-auto">S2</th>
              <th className="py-1 w-auto">Visitante</th>
            </tr>
          </thead>
          <tbody className="text-center text-gray-700 text-sm">
            {matches.map((match) => (
              <MatchScoreInputRow
                key={match.ID_PARTIDO}
                match={match}
                scores={scores}
                handleScoreChange={handleScoreChange}
              />
            ))}
          </tbody>
        </table>
      )}
      <div className="flex justify-end mt-4 w-full">
        <Button type="submit" title="Guardar Marcadores" onClick={handleSave} />
      </div>
    </div>
  );
};

const MatchScoreInputRow: React.FC<MatchScoreInputRowProps> = ({
  match,
  scores,
  handleScoreChange,
}) => {
  const localScore =
    scores.find((s) => s.ID_PARTIDO === match.ID_PARTIDO)?.LOCAL_SCORE ?? "";
  const visitanteScore =
    scores.find((s) => s.ID_PARTIDO === match.ID_PARTIDO)?.VISITANTE_SCORE ??
    "";

  return (
    <tr>
      <td className="py-1 border border-gray-300">{match.ID_PARTIDO}</td>
      <td className="py-1 border border-gray-300">{match.EQ_LOCAL}</td>
      <td className="py-1 border border-gray-300">
        <input
          type="number"
          min="0"
          className="w-16 px-2 py-1 border border-gray-600 rounded-md text-center"
          value={localScore}
          onChange={(e) =>
            handleScoreChange(
              match.ID_PARTIDO,
              "LOCAL_SCORE",
              parseInt(e.target.value, 10) || 0
            )
          }
        />
      </td>
      <td className="py-1 border border-gray-300">
        <input
          type="number"
          min="0"
          className="w-16 px-2 py-1 border border-gray-600 rounded-md text-center"
          value={visitanteScore}
          onChange={(e) =>
            handleScoreChange(
              match.ID_PARTIDO,
              "VISITANTE_SCORE",
              parseInt(e.target.value, 10) || 0
            )
          }
        />
      </td>
      <td className="py-1 border border-gray-300">{match.EQ_VISITANTE}</td>
    </tr>
  );
};

export default MatchScoreInput;
