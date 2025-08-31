import { ParticipantCardSkeleton } from "./ParticipantCardSkeleton";

export const StatisticsCardSkeleton = () => {
  return (
    <div className="grid lg:flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center lg:justify-between">
      <ParticipantCardSkeleton />
      <ParticipantCardSkeleton />
      <ParticipantCardSkeleton />
      <ParticipantCardSkeleton />
      <ParticipantCardSkeleton />
    </div>
  );
};
