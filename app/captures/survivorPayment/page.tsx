"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useGetMe } from "@/hooks/queries/user/useGetMe";
import { useGetSurvivorPayment } from "@/hooks/queries/useGetSurvivorPayment";
import { usePostSurvivorPayment } from "@/hooks/mutations/usePostSurvivorPayment";
import { Participant } from "@/types/participant/participant";
import { SurvivorPaymentStatusCard } from "@/components/captures/survivorPayment/SurvivorPaymentStatusCard";
import { Button } from "@/components/shared/button/Button";
import { PageHeader } from "@/components/shared/pageHeader/PageHeader";
import { MainContainer } from "@/components/ui/containers/MainContainer";

export default function SurvivorPaymentPage() {
  const { isSuccess, data } = useGetSurvivorPayment();
  const survivorPayment = usePostSurvivorPayment();
  const { data: userData } = useGetMe();
  const user = userData?.data?.[0];

  const [participantsData, setParticipantsData] = useState<Participant[]>([]);

  useEffect(() => {
    if (isSuccess) {
      const participantsData = data.data;
      setParticipantsData(participantsData);
    }
  }, [isSuccess, data]);

  const togglePaymentStatus = (participantId: number) => {
    setParticipantsData((prev) =>
      prev.map((participant) =>
        participant.ID_PARTICIPANTE === participantId
          ? { ...participant, B_PAGO: !participant.B_PAGO }
          : participant,
      ),
    );
  };

  const handleSubmit = () => {
    const participantsDataUpdated = participantsData.map((participant) => ({
      ID_QUINIELA: user!.idQuiniela,
      ID_PARTICIPANTE: participant.ID_PARTICIPANTE,
      ID_PERIODO: user!.idPeriodo,
      B_PAGO: participant.B_PAGO,
    }));

    survivorPayment.mutate(participantsDataUpdated);
  };

  return (
    <MainContainer>
      <div className="grid gap-4 content-start">
        <PageHeader
          title="Pagos Survivor"
          text="Gestiona los pagos de los participantes en la quiniela."
        />

        {isSuccess && (
          <SurvivorPaymentStatusCard
            participantsData={participantsData}
            togglePaymentStatus={togglePaymentStatus}
          />
        )}

        <div className="flex w-full gap-4 justify-center">
          <Link href="/dashboard">
            <Button type="button" title="Volver al dashboard" theme="normal" />
          </Link>

          <Button
            type="button"
            title="Actualizar pagos"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </MainContainer>
  );
}
