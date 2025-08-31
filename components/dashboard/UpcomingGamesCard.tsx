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
                className="grid p-3 gap-4 border border-gray-300 rounded-lg"
              >
                <div className="grid sm:flex w-full justify-between">
                  <div className="flex gap-2 items-center">
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

                  <div className="flex sm:grid w-full gap-2 justify-between">
                    <div className="flex gap-2 items-center">
                      <Icon name="map-pin" />
                      <span className="lg:text-end text-sm text-gray-600">
                        {game.estadio}
                      </span>
                    </div>

                    <div className="flex gap-2 items-center">
                      <Icon name="calendar" />
                      <span className="lg:text-end text-sm text-gray-600">
                        {game.fechaPartido}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex h-fit justify-center items-center border-2 border-blue-600 rounded-2xl">
                  <span className="px-2 py-1 text-sm font-semibold text-blue-700">{`Ganador seleccionado: ${
                    game.ganador === "V"
                      ? game.nombreVisitante
                      : game.nombreLocal
                  }`}</span>
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
