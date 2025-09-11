import { useGetSurvivorPayment } from "@/hooks/survivorPayment/queries/useGetSurvivorPayment";
import { Participant } from "@/types/participant/participant";
import { Card } from "@/components/shared/card/Card";
import { Icon } from "@/components/shared/icon/Icon";
import { TeamLogo } from "@/components/shared/teamLogo/TeamLogo";

interface SurvivorPaymentStatusCardProps {
  participantsData?: Participant[];
  togglePaymentStatus: (participantId: number) => void;
}

export const SurvivorPaymentStatusCard = ({
  participantsData,
  togglePaymentStatus,
}: SurvivorPaymentStatusCardProps) => {
  const { isPending, isError, isSuccess } = useGetSurvivorPayment();

  const totalParticipants = participantsData?.length || 0;
  const paidParticipants =
    participantsData?.filter((p) => p.B_PAGO).length || 0;
  const unpaidParticipants = totalParticipants - paidParticipants || 0;

  return (
    <section>
      <div className="w-full max-w-[1280px] mx-auto px-10 py-8">
        <Card>
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold">Estado de Pagos Survivor</p>

            <div className="flex gap-2">
              <Icon name="users" color="#1D4ED8" strokeWidth={2} />
              <Icon
                className="text-green-600"
                name="dollar-sign"
                strokeWidth={2}
              />
            </div>
          </div>

          <div className="grid lg:flex w-full gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-700">
                {totalParticipants}
              </div>
              <div className="text-sm text-blue-600">Total Participantes</div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-700">
                {paidParticipants}
              </div>
              <div className="text-sm text-green-600">Pagaron</div>
            </div>

            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-700">
                {unpaidParticipants}
              </div>
              <div className="text-sm text-red-600">Pendientes</div>
            </div>
          </div>

          {isPending && <p>Cargando...</p>}

          {isError && <p>Error al cargar los datos... </p>}

          {isSuccess && participantsData ? (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-700 text-white">
                    <th>Participante</th>
                    <th>Equipo Survivor</th>
                    <th>Estado Pago</th>
                  </tr>
                </thead>

                <tbody>
                  {participantsData.map(
                    (participant: Participant, index: number) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td>{participant.NOM_PARTICIPANTE}</td>

                        <td>
                          {" "}
                          <div className="flex items-center space-x-2">
                            <TeamLogo
                              teamName={participant.NOM_EQUIPO}
                              className="scale-60"
                            />
                            <span className="text-sm">
                              {participant.NOM_EQUIPO}
                            </span>
                          </div>
                        </td>

                        <td className="text-center">
                          <button
                            onClick={() =>
                              togglePaymentStatus(participant.ID_PARTICIPANTE)
                            }
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors hover:opacity-80 ${
                              participant.B_PAGO
                                ? "bg-green-100 text-green-800 border border-green-200"
                                : "bg-red-100 text-red-800 border border-red-200"
                            }`}
                          >
                            {participant.B_PAGO ? (
                              <>
                                <Icon name="circle-check" />
                                Pagado
                              </>
                            ) : (
                              <>
                                <Icon name="clock" />
                                No Pagado
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center">
              No hay información disponible para mostrar.
            </p>
          )}
        </Card>
      </div>
    </section>
  );
};
