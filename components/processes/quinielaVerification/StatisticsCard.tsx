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
  const completedQuinielas = data?.data?.filter(
    (p: Participant) => p.quiniela === 1
  ).length;
  const correctQuinielas = data?.data?.filter(
    (p: Participant) => p.resultados === 1
  ).length;
  const registeredSurvivors = data?.data
    ?.map((p: Participant) => p.survivor === !!p.existe)
    .filter(Boolean).length;

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
              icon="trophy"
              title="Quinielas Completas"
              number={completedQuinielas}
            />

            <ParticipantCard
              icon="shield"
              title="Quiniela Correctas"
              number={correctQuinielas}
            />

            <ParticipantCard
              icon="refresh-ccw"
              title="Survivors Registrados"
              number={registeredSurvivors}
            />
          </div>
        </section>
      )}
    </>
  );
};
