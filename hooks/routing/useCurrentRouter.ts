"use client";

import { usePathname } from "next/navigation";

const useCurrentRoute = (): string => {
  const pathname = usePathname();
  return pathname;
};

export default useCurrentRoute;
