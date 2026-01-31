import { Bolt } from "lucide-react";

export const Loader = () => {
  return (
    <div className="flex w-full px-4 py-2 gap-2 justify-center ">
      <Bolt
        className="animate-bounce bolt1-delay-bounce text-blue-600"
        size={25}
      />
      <Bolt
        className="animate-bounce bolt2-delay-bounce text-blue-600"
        size={25}
      />
      <Bolt
        className="animate-bounce bolt3-delay-bounce text-blue-600"
        size={25}
      />
    </div>
  );
};
