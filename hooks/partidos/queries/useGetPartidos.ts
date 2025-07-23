"use client";

import axiosInstance from "@/hooks/axios/axiosInstance";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";

const fetchPartidos = async (
  token: string | null,
  payload: {
    idProceso: number;
    idQuery: number;
    parmRemp: any;
  }
) => {
  const response = await axiosInstance.post("/Query/Consulta", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log("Response from fetchPartidos:", response.data);
  return response.data.data;
};

const useGetPartidos = () => {
  const { token, data: authData } = useAuth();
  const parmRemp = {
    $1: 1, // authData?.idQuiniela,
    $2: 1, // authData?.idParticipante,
    $3: 3, //authData?.idPeriodo,
  };
  // console.log("Parametros de fetchPartidos: ", token, parmRemp);

  const { isSuccess, isPending, isError, data, error, ...values } = useQuery({
    queryKey: ["getPartidos", authData],
    queryFn: () => fetchPartidos(token, { idProceso: 2, idQuery: 1, parmRemp }),
  });

  return { isSuccess, isPending, isError, data, error, ...values };
};

export default useGetPartidos;
