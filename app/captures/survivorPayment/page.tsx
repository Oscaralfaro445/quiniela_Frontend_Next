"use client";

import { useEffect, useState } from "react";
import useGetSurvivorPayment from "@/hooks/survivorPayment/queries/useGetSurvivorPayment";
import usePostSurvivorPayment from "@/hooks/survivorPayment/mutations/usePostSurvivorPayment";
import { Participant } from "@/types/participant/participant";
import { Card } from "@/components/shared/card/Card";
import { Icon } from "@/components/shared/icon/Icon";
import { MainContainer } from "@/components/shared/mainContainer/MainContainer";
import { SectionGrid } from "@/components/shared/sectionGrid/SectionGrid";
import Link from "next/link";
import { Button } from "@/components/shared/button/Button";

export default function SurvivorPaymentPage() {
  const survivorPayment = useGetSurvivorPayment();
  const survivor = usePostSurvivorPayment();

  const [participantsData, setParticipantsData] = useState<Participant[]>([]);
  const totalParticipants = participantsData.length;
  const paidParticipants = participantsData.filter((p) => p.B_PAGO).length;
  const unpaidParticipants = totalParticipants - paidParticipants;

  useEffect(() => {
    if (survivorPayment.isSuccess) {
      const data = survivorPayment.data.data;
      setParticipantsData(data);
    }
  }, [survivorPayment.isSuccess, survivorPayment.data]);

  const togglePaymentStatus = (participantId: number) => {
    setParticipantsData((prev) =>
      prev.map((participant) =>
        participant.ID_PARTICIPANTE === participantId
          ? { ...participant, B_PAGO: !participant.B_PAGO }
          : participant
      )
    );
  };

  const handleSubmit = () => {
    survivor.mutate({ participants: participantsData });
  };

  return (
    <MainContainer>
      <SectionGrid>Consulta de Pagos</SectionGrid>

      <SectionGrid>
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

          <div className="grid md:flex w-full gap-4">
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

          {participantsData && (
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
                            <div className="w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-white">
                                {participant.NOM_EQUIPO.split(" ")
                                  .pop()
                                  ?.substring(0, 2)
                                  .toUpperCase()}
                              </span>
                            </div>
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
          )}
        </Card>
      </SectionGrid>

      <SectionGrid>
        <div className="grid sm:flex w-full gap-4 justify-center items-center">
          <Link href="/dashboard">
            <Button type="button" title="Volver al Dashboard" theme="normal" />
          </Link>

          <Button
            type="button"
            title="Actualizar Pagos"
            onClick={handleSubmit}
          />
        </div>
      </SectionGrid>
    </MainContainer>
  );
}
