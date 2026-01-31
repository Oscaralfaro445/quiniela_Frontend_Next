import { ParticipantStatistics } from "@/types/participantStatistics/participantStatistics";
import { Card } from "../shared/card/Card";
import { Icon } from "../shared/icon/Icon";

interface StandingsGridSimulatorProps {
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  leaderboard: ParticipantStatistics[];
  typeTab: "semanal" | "global";
}

export const StandingsGridSimulator = ({
  isPending,
  isError,
  isSuccess,
  leaderboard,
  typeTab,
}: StandingsGridSimulatorProps) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Icon name="crown" className="text-yellow-500" />;
      case 2:
        return <Icon name="medal" className="text-gray-500" />;
      case 3:
        return <Icon name="award" className="text-orange-500" />;
      default:
        return (
          <span className="text-lg font-semibold text-gray-700">#{rank}</span>
        );
    }
  };

  const getNameAbbr = (teamName: string) => {
    return teamName.split(" ").map((word) => word.charAt(0).toUpperCase());
  };

  return (
    <Card>
      <p className="text-neutral-700">{`Clasificación ${typeTab}`}</p>

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
        <div className="grid gap-2 h-[400px] overflow-y-auto">
          {leaderboard?.map((player, index) => (
            <div
              key={index}
              className={`flex p-4 items-center justify-between rounded-lg border hover:bg-gray-50 hover:shadow-sm ${
                player.Posicion <= 3
                  ? "bg-blue-50 border-blue-200"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10">
                  {getRankIcon(player.Posicion)}
                </div>

                <div className="hidden md:flex w-10 h-10 items-center justify-center bg-blue-700 rounded-full">
                  <p className="text-sm font-bold text-white">
                    {getNameAbbr(player.Nombre)}
                  </p>
                </div>

                <div className="font-medium text-gray-700">{player.Nombre}</div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-gray-500">
                    {player.Puntos} puntos
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
