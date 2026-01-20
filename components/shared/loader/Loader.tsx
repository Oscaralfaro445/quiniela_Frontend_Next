import { Bolt } from "lucide-react";

export const Loader = () => {
  return (
    <div className="flex w-full px-4 gap-2 justify-center">
      <Bolt
        className="animate-bounce bolt1-delay-bounce text-sm8-blue-800/75"
        size={25}
      />
      <Bolt
        className="animate-bounce bolt2-delay-bounce text-sm8-blue-800/75"
        size={25}
      />
      <Bolt
        className="animate-bounce bolt3-delay-bounce text-sm8-blue-800/75"
        size={25}
      />
    </div>
  );
};
