import { ByeWeekTeam } from "@/types/quiniela/byeWeekTeam";
import { Card } from "../shared/card/Card";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";

interface ByeWeekProps {
  byeData: ByeWeekTeam[];
}

export const ByeWeek = ({ byeData }: ByeWeekProps) => {
  return (
    <Card>
      <p className="text-lg font-semibold">Equipos que Descansan (Bye Week)</p>

      <div className="grid lg:grid-cols-2 w-full gap-4 items-center">
        {byeData &&
          byeData.map((team: ByeWeekTeam) => (
            <Card key={team.IdEquipo}>
              <div className="flex w-full gap-2 justify-start items-center">
                <TeamLogo teamName={team.NomEquipo} />

                <p>{team.NomEquipo}</p>
              </div>
            </Card>
          ))}
      </div>
    </Card>
  );
};
