import { ByeWeekTeam } from "@/types/quiniela/byeWeekTeam";
import { Card } from "../shared/card/Card";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";

interface ByeWeekProps {
  byeData: ByeWeekTeam[];
}

/* const getTeamAbbr = (teamName: string) => {
  return teamName.split(" ").pop()?.substring(0, 3).toUpperCase() || "TBD";
}; */

export const ByeWeek = ({ byeData }: ByeWeekProps) => {
  return (
    <Card>
      <div className="flex w-full items-center justify-start">
        <p className="text-lg font-semibold">
          Equipos que Descansan (Bye Week)
        </p>
      </div>

      <div className="flex flex-wrap w-full gap-4 justify-between items-center">
        {byeData !== null &&
          byeData.map((team: ByeWeekTeam) => (
            <Card key={team.IdEquipo}>
              <div className="flex w-full gap-2 justify-start items-center">
                {/* <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {getTeamAbbr(team.NomEquipo)}
                  </span>
                </div> */}
                <TeamLogo teamName={team.NomEquipo} />

                <p>{team.NomEquipo}</p>
              </div>
            </Card>
          ))}
      </div>
    </Card>
  );
};
