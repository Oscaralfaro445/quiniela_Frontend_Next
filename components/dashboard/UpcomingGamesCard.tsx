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
  fechaPartido: "2024-11-09";
  horaPartido: "20:30";
  estadio: "Estadio no Definido";
  ganador: "V";
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
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
              >
                <div className="text-sm font-medium text-gray-900">
                  {game.nombreVisitante} vs {game.nombreLocal}
                </div>

                <div className="text-sm text-gray-600">{game.fechaPartido}</div>
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
