"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useGetSurvivorPayment } from "@/hooks/survivorPayment/queries/useGetSurvivorPayment";
import { usePostSurvivorPayment } from "@/hooks/survivorPayment/mutations/usePostSurvivorPayment";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { Participant } from "@/types/participant/participant";
import { Button } from "@/components/shared/button/Button";
import { PageHeader } from "@/components/ui/pageHeader/PageHeader";
import { SurvivorPaymentStatusCard } from "@/components/captures/survivorPayment/SurvivorPaymentStatusCard";

export default function SurvivorPaymentPage() {
  const { data: me } = useGetMe();
  const dataUser = me?.data;
  const { isSuccess, data } = useGetSurvivorPayment();
  const survivorPayment = usePostSurvivorPayment();

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
      ID_QUINIELA: dataUser!.idQuiniela,
      ID_PARTICIPANTE: participant.ID_PARTICIPANTE,
      ID_PERIODO: dataUser!.idPeriodo,
      B_PAGO: participant.B_PAGO,
    }));

    survivorPayment.mutate(participantsDataUpdated);
  };

  return (
    <div className="min-h-screen pt-18">
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

      <div className="flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center">
        <Link href="/dashboard">
          <Button type="button" title="Volver al dashboard" theme="normal" />
        </Link>

        <Button type="button" title="Actualizar pagos" onClick={handleSubmit} />
      </div>
    </div>
  );
}
