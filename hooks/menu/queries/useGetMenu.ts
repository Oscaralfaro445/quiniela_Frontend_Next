import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchMenu = async (payload: {
  idProceso: number;
  idProcedure: number;
  parmRemp: {
    $1: string;
  };
}) => {
  const response = await axiosInstance.post("/Query/Procedure", payload);
  return response.data;
};

export const useGetMenu = () => {
  return useQuery({
    queryKey: ["menu"],
    queryFn: () =>
      fetchMenu({
        idProceso: 12,
        idProcedure: 7,
        parmRemp: {
          $1: "4",
        },
      }),
  });
};
