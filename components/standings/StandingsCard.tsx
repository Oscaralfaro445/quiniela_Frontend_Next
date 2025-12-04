import { ParticipantStatistics } from "@/types/participantStatistics/participantStatistics";
import { Card } from "../shared/card/Card";
import { Icon } from "../shared/icon/Icon";

interface StandingsCardProps {
  period: string;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  leaderboard: ParticipantStatistics[] | undefined;
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Icon name="crown" className="text-yellow-500" />;
    case 2:
      return <Icon name="medal" className="text-gray-500" />;
    case 3:
      return <Icon name="award" className="text-orange-500" />;
    default:
      return <p className="text-lg font-semibold text-neutral-600">#{rank}</p>;
  }
};

const getNameAbbr = (teamName: string) => {
  return teamName.split(" ").map((word) => word.charAt(0).toUpperCase());
};

export const StandingsCard = ({
  period,
  isPending,
  isError,
  isSuccess,
  leaderboard,
}: StandingsCardProps) => {
  return (
    <Card>
      <div>
        <p className="text-lg font-semibold text-neutral-700">
          {`Clasificación ${period}`}
        </p>
        <p className="text-md text-neutral-600">
          Basada en el rendimiento de toda la temporada
        </p>
      </div>

      {isPending && (
        <div className="flex justify-center items-center mt-10">
          <Icon name="loader" className="animate-spin h-5 w-5 text-blue-500" />
        </div>
      )}

      {isError && (
        <div className="flex justify-center items-center mt-10">
          <Icon name="alert-triangle" className="h-5 w-5 text-red-500" />
        </div>
      )}

      {isSuccess && (
        <div className="grid w-full gap-2">
          {leaderboard?.map((player, index) => (
            <div
              key={index}
              className={`flex p-4 items-center justify-between rounded-lg border transition-all duration-300 hover:bg-gray-50 hover:shadow-sm ${
                player.Posicion <= 3
                  ? "bg-blue-50 border-blue-300"
                  : "border-gray-400"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10">
                  {getRankIcon(player.Posicion)}
                </div>

                <div className="hidden md:flex w-10 h-10 bg-blue-700 rounded-full items-center justify-center">
                  <p className="text-sm font-bold text-white">
                    {getNameAbbr(player.Nombre)}
                  </p>
                </div>

                <p className="font-medium text-neutral-600">{player.Nombre}</p>
              </div>

              <div className="flex gap-2 items-center">
                <p className="text-lg font-semibold text-neutral-600">
                  {`${player.Puntos} puntos`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
