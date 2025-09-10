import { useGetUpcomingGames } from "@/hooks/dashboard/queries/useGetUpcomingGames";
import { useRouter } from "next/navigation";
import { Button } from "../shared/button/Button";
import { Card } from "../shared/card/Card";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";
import { Icon } from "../shared/icon/Icon";

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
      <Card className="lg:col-span-2">
        <div className="flex flex-col">
          <span className="text-lg text-blue-700 font-semibold">
            Próximos Juegos
          </span>
          <span className=" text-sm text-gray-600">
            Semana {currentWeek} - Pendientes por jugar
          </span>
        </div>

        {isPending && <span>Cargando...</span>}

        {isError && <span>Error al cargar los datos...</span>}

        {isSuccess && (
          <div className="grid lg:grid-cols-2 gap-4">
            {data?.data.map((game: Game, index: number) => (
              <div
                key={index}
                className="grid p-3 gap-4 justify-items-center border border-gray-400 rounded-lg hover:shadow-lg"
              >
                <div className="grid sm:flex w-full sm:px-10">
                  <div className="flex w-full gap-2 justify-center sm:justify-start items-center">
                    <TeamLogo
                      className="transform scale-65"
                      teamName={game.nombreVisitante}
                    />

                    <span className="text-md font-semibold">vs</span>

                    <TeamLogo
                      className="transform scale-65"
                      teamName={game.nombreLocal}
                    />
                  </div>

                  <div className="flex sm:grid gap-2 justify-between">
                    <div className="flex gap-2 items-center">
                      <Icon name="map-pin" />
                      <span className="text-sm text-gray-600">
                        {game.estadio}
                      </span>
                    </div>

                    <div className="flex gap-2 items-center">
                      <Icon name="calendar" />
                      <span className="text-sm text-gray-600">
                        {game.fechaPartido}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex w-fit justify-center items-center border-2 border-blue-600 rounded-2xl">
                  <p className="px-2 py-1 text-sm font-semibold text-blue-700">{`Ganador seleccionado: ${
                    game.ganador === "V"
                      ? game.nombreVisitante
                      : game.nombreLocal
                  }`}</p>
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
