"use client";

import axiosInstance from "@/hooks/axios/axiosInstance";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { ParamValue } from "next/dist/server/request/params";

const fetchFormdata = async (cveForma: ParamValue, token: string | null) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      // "Content-Type": "application/json",
    },
  };

  // console.log("Token en fetchFormdata: ", token);
  // console.log("Configuracion completa: ", config);
  // console.log("Headers que se enviarán:", config.headers);

  const response = await axiosInstance.get(`/formData/${cveForma}`, config);
  return response.data;
};

const useGetFormdata = (cveForma: ParamValue) => {
  const { token } = useAuth();
  // console.log("Token a mandar:", token);

  const { isSuccess, isPending, isError, data, error, ...values } = useQuery({
    queryKey: ["getFormdata", cveForma, token], // Incluir token en queryKey
    queryFn: () => fetchFormdata(cveForma, token),
    // enabled: !!cveForma && !!token, // Solo ejecutar si tenemos cveForma Y token
  });

  return { isSuccess, isPending, isError, data, error, ...values };
};

export default useGetFormdata;
