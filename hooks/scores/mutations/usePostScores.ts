import axiosInstance from "@/hooks/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";

const postScores = async (
  token: string | null,
  payload: { idProceso: number; idQuery: string; parmRemp: { $1: number } }
) => {
  const response = await axiosInstance.post("/Query/Consulta", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const usePostScores = () => {
  const { token } = useAuth();

  return useMutation({
    mutationKey: ["scores"],
    mutationFn: ({ idEquipo }: { idEquipo: number }) =>
      postScores(token, {
        idProceso: 2,
        idQuery: "3",
        parmRemp: { $1: idEquipo },
      }),
    onError: () => {},
    onSuccess: () => {},
    onSettled: () => {},
  });
};

export default usePostScores;
