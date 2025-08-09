import { ByeWeekTeam } from "@/app/quinielaCapture/page";
import { Card } from "../shared/card/Card";

interface ByeWeekProps {
  byeData: ByeWeekTeam[];
}

export const ByeWeek = ({ byeData }: ByeWeekProps) => {
  return (
    <Card>
      <div className="flex w-full items-center justify-between">
        <p className="text-lg font-semibold">
          Equipos que Descansan (Bye Week)
        </p>
      </div>

      <div className="flex w-full gap-4 items-center justify-between">
        {byeData !== null &&
          byeData.map((team: ByeWeekTeam) => (
            <Card className="" key={team.IdEquipo}>
              <div className="flex w-full gap-2 justify-start items-center">
                <p>Figura</p>
                <p>{team.NomEquipo}</p>
              </div>
            </Card>
          ))}
      </div>
    </Card>
  );
};
