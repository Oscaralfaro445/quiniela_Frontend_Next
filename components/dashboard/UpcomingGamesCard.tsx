import { useGetUpcomingGames } from "@/hooks/dashboard/queries/useGetUpcomingGames";
import { useRouter } from "next/navigation";
import { Button } from "../shared/button/Button";
import { Card } from "../shared/card/Card";

interface UpcomingGamesCardProps {
  currentWeek: string;
}

interface Game {
  nombreVisitante: string;
  nombreLocal: string;
  fechaPartido: string;
  horaPartido: string;
  estadio: string;
  ganador: string;
}

export const UpcomingGamesCard = ({ currentWeek }: UpcomingGamesCardProps) => {
  const router = useRouter();
  const { isPending, isError, isSuccess, data } = useGetUpcomingGames();

  return (
    <>
      <Card className="lg:col-span-2 border-gray-200">
        <div>
          <div className="text-gray-900">Próximos Juegos</div>
          <div>Semana {currentWeek} - Pendientes por jugar</div>
        </div>

        {isPending && <span>Cargando...</span>}

        {isError && <span>Error al cargar los datos...</span>}

        {isSuccess && (
          <div className="grid lg:grid-cols-2 gap-4">
            {data?.data.map((game: Game, index: number) => (
              <div
                key={index}
                className="grid lg:flex gap-2 items-center lg:justify-between p-3 border border-gray-200 rounded-lg"
              >
                <div className="grid lg:flex gap-2 text-center lg:text-start text-sm font-medium text-neutral-900">
                  <span>{game.nombreVisitante}</span>
                  <span>vs</span>
                  <span>{game.nombreLocal}</span>
                </div>

                <div className="text-center lg:text-end text-sm text-gray-600">
                  {game.fechaPartido}
                </div>
              </div>
            ))}
          </div>
        )}

        <Button
          type="button"
          title="Ver Quiniela"
          onClick={() => router.push("/quinielaCapture")}
        />
      </Card>
    </>
  );
};
