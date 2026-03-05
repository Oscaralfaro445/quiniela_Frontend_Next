import { useGetUpcomingGames } from "@/hooks/queries/useGetUpcomingGames";

import { Game } from "@/types/games/game";
import { Card } from "../shared/card/Card";
import { GameCard } from "./GameCard";

export const UpcomingGamesCard = () => {
  const { isPending, isError, data } = useGetUpcomingGames();
  const upcomingGames = data?.data;

  return (
    <div className="grid col-span-2">
      <Card>
        <div className="flex flex-col">
          <p className="text-lg text-blue-600 font-semibold">Próximos juegos</p>
          <p className=" text-sm text-neutral-600">
            Juegos pendientes por jugar de la semana actual
          </p>
        </div>

        {isPending && <p>Cargando...</p>}

        {isError && <p>Error al cargar los datos...</p>}

        {upcomingGames ? (
          <div className="grid lg:grid-cols-2 gap-4">
            {upcomingGames.map((game: Game, index: number) => (
              <GameCard key={index} game={game} />
            ))}
          </div>
        ) : (
          <p className="text-neutral-600">
            No hay partidos pendientes por jugar...
          </p>
        )}
      </Card>
    </div>
  );
};
