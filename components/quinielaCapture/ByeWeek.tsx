import { ByeWeekTeam } from "@/types/quiniela/byeWeekTeam";
import { Card } from "../shared/card/Card";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";
import { useGetMatches } from "@/hooks/matches/queries/useGetMatches";

export const ByeWeek = () => {
  const { isPending, isError, isSuccess, data } = useGetMatches();

  return (
    <section>
      <div className="max-w-[1280px] mx-auto px-10 py-8">
        <Card>
          <p className="text-lg font-semibold">
            Equipos que Descansan (Bye Week)
          </p>

          {isPending && <p>Cargando...</p>}

          {isError && <p>Error al cargar los datos</p>}

          {isSuccess && (
            <div className="grid lg:grid-cols-2 w-full gap-4 items-center">
              {data.data[0].bye.map((team: ByeWeekTeam) => (
                <Card key={team.IdEquipo}>
                  <div className="flex w-full gap-2 justify-start items-center">
                    <TeamLogo teamName={team.NomEquipo} />
                    <p>{team.NomEquipo}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};
