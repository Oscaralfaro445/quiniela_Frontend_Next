import { useAlert } from "@/context/alertContext/AlertContext";
import { useGetQuinielaVerification } from "@/hooks/quinielaVerification/queries/useGetQuinielaVerification";
import { Participant } from "@/app/processes/quinielaVerification/page";
import { ParticipantCard } from "./ParticipantsCard";
import { AlertState } from "@/types/alert/alert";
import { StatisticsCardSkeleton } from "./StatisticsCardSkeleton";

export const StatisticsCard = () => {
  const { showAlert } = useAlert();
  const { isPending, isError, isSuccess, error, data } =
    useGetQuinielaVerification();

  const totalParticipants = data?.data?.length;
  const activeParticipants = data?.data?.filter(
    (p: Participant) => p.existe === 1
  ).length;
  const quinielaParticipants = data?.data?.filter(
    (p: Participant) => p.quin === 1
  ).length;
  const survivorParticipants = data?.data?.filter(
    (p: Participant) => p.survivor
  ).length;
  const resurrectionParticipants = data?.data?.filter(
    (p: Participant) => p.quinRes === 1
  ).length;

  return (
    <>
      {isError &&
        showAlert(
          AlertState.ERROR,
          "Error en la Solicitud",
          "Tuvimos un problema al enviar la información de la quiniela: " +
            error?.message
        ) && <StatisticsCardSkeleton />}

      {isPending && <StatisticsCardSkeleton />}

      {isSuccess && (
        <section>
          <div className="grid lg:flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center lg:justify-between">
            <ParticipantCard
              icon="list"
              title="Total Participantes"
              number={totalParticipants}
            />

            <ParticipantCard
              icon="check"
              title="Activos"
              number={activeParticipants}
            />

            <ParticipantCard
              icon="trophy"
              title="En Quiniela"
              number={quinielaParticipants}
            />

            <ParticipantCard
              icon="shield"
              title="En Survivor"
              number={survivorParticipants}
            />

            <ParticipantCard
              icon="refresh-ccw"
              title="Resurrección"
              number={resurrectionParticipants}
            />
          </div>
        </section>
      )}
    </>
  );
};
