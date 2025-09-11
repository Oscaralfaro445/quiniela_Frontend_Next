import { useAuth } from "@/context/authContext/AuthContext";
import { useGetParticipantPositions } from "@/hooks/participantPositions/queries/useGetParticipantPositions";
import { Card } from "../shared/card/Card";
import { Icon } from "../shared/icon/Icon";
import { ParticipantData } from "@/app/positionQuery/page";

interface StatisticsCardProps {
  currentWeek: string | undefined;
}

export const StatisticsCard = ({ currentWeek }: StatisticsCardProps) => {
  const { dataUser } = useAuth();
  const { isPending, isError, isSuccess, data } = useGetParticipantPositions();

  return (
    <section>
      <div className="grid lg:flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4">
        <Card className="border-gray-200">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-gray-600">
              Total Participantes
            </div>
            <Icon name="trophy" className="text-blue-700" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {data?.data[0]?.puntosPeriodo?.length ?? "0"}
            </div>
            <p className="text-xs text-gray-600">participantes</p>
          </div>
        </Card>

        <Card className="border-gray-200">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-gray-600">
              Precisión Promedio
            </div>
            <Icon name="target" className="text-blue-700" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">64.2%</div>
            <p className="text-xs text-gray-600">Semana {currentWeek}</p>
          </div>
        </Card>

        <Card className="border-gray-200">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-gray-600">Tu Posición</div>
            <Icon name="medal" className="text-blue-700" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{`#${
              data?.data[0]?.puntosPeriodo?.find(
                (item: ParticipantData) =>
                  item.ID_PARTICIPANTE === dataUser?.idParticipante
              )?.Posicion ?? "0"
            }`}</div>
            <p className="text-xs text-gray-600">↑ 23 posiciones</p>
          </div>
        </Card>
      </div>
    </section>
  );
};
