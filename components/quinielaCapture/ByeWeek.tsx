import { ByeWeekTeam } from "@/types/quiniela/byeWeekTeam";
import { Card } from "../shared/card/Card";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";
import { useGetMatches } from "@/hooks/matches/queries/useGetMatches";
import { Icon } from "../shared/icon/Icon";

export const ByeWeek = () => {
  const { isPending, isError, isSuccess, data } = useGetMatches();

  return (
    <section>
      <div className="max-w-[1280px] mx-auto px-10 py-8">
        <Card>
          <p className="text-lg font-semibold">
            Equipos que Descansan (Bye Week)
          </p>

          {isPending && (
            <div className="flex justify-center items-center mt-10">
              <Icon
                name="loader"
                className="animate-spin h-5 w-5 text-blue-500"
              />
            </div>
          )}

          {isError && (
            <div className="flex justify-center items-center mt-10">
              <Icon name="alert-triangle" className="h-5 w-5 text-red-500" />
            </div>
          )}

          {isSuccess && data.data[0].bye !== null ? (
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
          ) : (
            <div className="flex gap-4 justify-center items-center">
              <p>No hay equipos en descanso</p>
              <Icon name="triangle-alert" className="h-6 w-6 text-yellow-600" />
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};
