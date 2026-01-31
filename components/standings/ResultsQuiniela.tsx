import { useGetResultsQuiniela } from "@/hooks/quiniela/queries/useGetResultsQuiniela";
import { Icon } from "../shared/icon/Icon";
import { Loader } from "../shared/loader/Loader";

interface Results {
  equipo1: string;
  scoreEquipo1: number;
  equipo2: string;
  scoreEquipo2: number;
  cveGanador: string;
  puntos: number;
}

interface ResultsQuinielaProps {
  participant: {
    idParticipante: number;
    idQuiniela: number;
    periodo: number;
  };
}

const getWinner = (scoreV: number, scoreL: number, prediction: string) => {
  const winner = scoreV === scoreL ? "E" : scoreV > scoreL ? "V" : "L";

  if (winner === prediction) {
    return <Icon name="check" className="text-green-500" />;
  } else {
    return <Icon name="x" className="text-red-500" />;
  }
};

export const ResultsQuiniela = ({ participant }: ResultsQuinielaProps) => {
  const { isPending, isError, data } = useGetResultsQuiniela(participant);
  const results = data?.data;

  return (
    <div className="grid w-full p-2 divide-y divide-neutral-200">
      {isPending && <Loader />}
      {isError && <p>Error al cargar las quinielas previas...</p>}
      {results?.map((result: Results, index: number) => (
        <div key={index} className="flex justify-between">
          <p className="w-2/5">{result?.equipo1}</p>
          <p className="w-2/5">{result?.equipo2}</p>
          <p className="w-1/5">
            {getWinner(
              result?.scoreEquipo1,
              result?.scoreEquipo2,
              result?.cveGanador,
            )}
          </p>
        </div>
      ))}
    </div>
  );
};
