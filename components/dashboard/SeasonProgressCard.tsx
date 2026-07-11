import { useGetPrecision } from "@/hooks/queries/useGetPrecision";
import { Card } from "../shared/card/Card";
import { ProgressBar } from "../shared/progressBar/ProgressBar";

export const SeasonProgressCard = () => {
  const { isPending, isError, data } = useGetPrecision();
  const targetInfo = data?.data?.[0]?.Dashboard_1?.[0];
  const porcentTotal = targetInfo?.posicionTotal?.pjeTemporada || 0;
  const matchesTotal = targetInfo?.posicionTotal?.partidosTemporada || 0;

  return (
    <Card>
      <div>
        <p className="text-lg text-blue-600 font-semibold">
          Progreso de la Temporada
        </p>
        <p className=" text-sm text-neutral-600">Tu rendimiento general</p>
      </div>

      {isPending && <p>Cargando...</p>}

      {isError && <p>Error al cargar los datos...</p>}

      <div>
        <div className="flex justify-between text-sm mb-2">
          <p className="text-neutral-600">Precisión general</p>
          <p className="font-medium text-neutral-600">
            {`${Math.trunc(porcentTotal)} %`}
          </p>
        </div>

        <ProgressBar max={100} value={Math.trunc(porcentTotal)} />

        <div className="flex justify-between text-sm mb-2">
          <p className="text-neutral-600">Juegos completados</p>
          <p className="font-medium text-neutral-600">
            {`${matchesTotal} / ${matchesTotal}`}
          </p>
        </div>

        <ProgressBar max={matchesTotal} value={matchesTotal} />
      </div>
    </Card>
  );
};
