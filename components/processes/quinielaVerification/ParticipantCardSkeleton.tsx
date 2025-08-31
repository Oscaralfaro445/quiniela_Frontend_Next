export const ParticipantCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center w-52 h-32 rounded-2xl border shadow-md animate-pulse space-y-3">
      <div className="h-8 w-8 bg-gray-300 rounded-full" />
      <div className="h-4 w-24 bg-gray-300 rounded" />
      <div className="h-6 w-16 bg-gray-300 rounded" />
    </div>
  );
};
