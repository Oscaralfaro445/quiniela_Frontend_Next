import axiosInstance from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";

const postMarkers = async (
  token: string,
  payload: {
    idProceso: number;
    idQuery: string;
    parmRemp: { $1: string };
  }
) => {
  const response = await axiosInstance.post("/Query/Consulta", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const usePostMarkers = () => {
  const { token, dataUser } = useAuth();

  return useQuery({
    queryKey: ["markers"],
    queryFn: () =>
      postMarkers(token!, {
        idProceso: 5,
        idQuery: "6",
        parmRemp: {
          $1: dataUser!.idPeriodo,
        },
      }),
    enabled: !!token && !!dataUser?.idQuiniela,
  });
};

export default usePostMarkers;
