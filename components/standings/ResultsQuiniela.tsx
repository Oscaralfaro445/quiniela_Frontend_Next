import { useGetResultsQuiniela } from "@/hooks/queries/useGetResultsQuiniela";
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
    <div className="grid py-4 gap-4">
      <div className="w-full rounded-lg border border-neutral-200 overflow-hidden bg-white">
        {isPending && <Loader />}
        {isError && (
          <div className="p-4 text-center text-red-600">
            Error al cargar las quinielas previas...
          </div>
        )}
        {!isPending && !isError && results && results.length > 0 && (
          <>
            <div className="grid grid-cols-3 gap-4 px-4 py-3 bg-neutral-50 border-b border-neutral-200 font-semibold text-neutral-700 text-sm">
              <div>Equipo 1</div>
              <div>Equipo 2</div>
              <div className="text-center">Resultado</div>
            </div>

            <div className="divide-y divide-neutral-200">
              {results.map((result: Results, index: number) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-4 px-4 py-3 hover:bg-neutral-50 transition-colors"
                >
                  <p className="text-neutral-800">{result?.equipo1}</p>
                  <p className="text-neutral-800">{result?.equipo2}</p>
                  <div className="flex justify-center">
                    {getWinner(
                      result?.scoreEquipo1,
                      result?.scoreEquipo2,
                      result?.cveGanador,
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {!isPending && !isError && (!results || results.length === 0) && (
          <div className="p-4 text-center text-neutral-500">
            No hay resultados disponibles
          </div>
        )}
      </div>
    </div>
  );
};
