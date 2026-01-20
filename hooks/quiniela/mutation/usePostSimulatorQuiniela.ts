import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";

const postQuinielaSimulator = async (payload: {
  idProceso: number;
  idProcedure: number;
  parmRemp: {
    $1: number;
    $2: string;
    $3: string;
  };
}) => {
  const response = await axiosInstance.post("/Query/Procedure", payload);
  return response.data;
};

export const usePostSimulatorQuiniela = () => {
  return useMutation({
    mutationKey: ["quiniela-simulator"],
    mutationFn: (quinielaDataSimulated: string) =>
      postQuinielaSimulator({
        idProceso: 17,
        idProcedure: 8,
        parmRemp: {
          $1: 1,
          $2: "2",
          $3: quinielaDataSimulated,
        },
      }),
  });
};
