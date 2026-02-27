import { useGetParticipantPositions } from "@/hooks/participantPositions/queries/useGetParticipantPositions";
import { useGetPrecision } from "@/hooks/dashboard/queries/useGetPrecision";
import { ParticipantStatistics } from "@/types/participantStatistics/participantStatistics";
import { Card } from "../shared/card/Card";
import { Icon } from "../shared/icon/Icon";
import { TabType } from "../shared/tabs/TabSelector";
import { useGetMe } from "@/hooks/queries/user/useGetMe";

interface StatisticsCardProps {
  activeTab: TabType;
}

export const StatisticsCard = ({ activeTab }: StatisticsCardProps) => {
  const { data } = useGetParticipantPositions();
  const { data: precisionData } = useGetPrecision();
  const { data: userData } = useGetMe();
  const userInfo = userData?.data?.[0];

  return (
    <div className="grid lg:flex gap-4">
      <Card>
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

      <Card>
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-600">
            Precisión Promedio
          </div>

          <Icon className="text-blue-600" name="target" />
        </div>

        {true && (
          <div className="grid gap-1">
            <div className="text-2xl font-bold text-gray-900">
              {activeTab === 0
                ? (Math.trunc(
                    precisionData?.data?.[0]?.Dashboard_1[0]?.posicionPeriodo
                      ?.pjeSemana,
                  ) ?? 0)
                : (Math.trunc(
                    precisionData?.data?.[0]?.Dashboard_1[0]?.posicionTotal
                      ?.pjeTemporada,
                  ) ?? 0)}
              %
            </div>

            <p className="text-xs text-gray-600">
              {activeTab === 0
                ? precisionData?.data?.[0]?.Dashboard_1[0]?.posicionPeriodo
                    ?.puntosPeriodo +
                  "/" +
                  precisionData?.data?.[0]?.Dashboard_1?.[0]?.posicionPeriodo
                    ?.partidosPeriodo +
                  " correctas"
                : precisionData?.data?.[0]?.Dashboard_1[0]?.posicionTotal
                    ?.puntosTemporada +
                  "/" +
                  precisionData?.data?.[0]?.Dashboard_1[0]?.posicionTotal
                    ?.partidosTemporada +
                  " correctas"}
            </p>
          </div>
        )}
      </Card>

      <Card>
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="text-sm font-medium text-gray-600">Tu Posición</div>
          <Icon name="medal" className="text-blue-700" />
        </div>

        <div>
          <div className="text-2xl font-bold text-gray-900">{`#${
            activeTab === 0
              ? (data?.data[0]?.puntosPeriodo?.find(
                  (item: ParticipantStatistics) =>
                    item.ID_PARTICIPANTE === userInfo?.idParticipante,
                )?.Posicion ?? "0")
              : (data?.data[0]?.puntosTotal?.find(
                  (item: ParticipantStatistics) =>
                    item.ID_PARTICIPANTE === userInfo?.idParticipante,
                )?.Posicion ?? "0")
          }`}</div>
          <p className="text-xs text-gray-600">{`de ${
            activeTab === 0
              ? (data?.data[0]?.puntosPeriodo?.length ?? "0")
              : (data?.data[0]?.puntosTotal?.length ?? "0")
          } participantes`}</p>
        </div>
      </Card>
    </div>
  );
};
