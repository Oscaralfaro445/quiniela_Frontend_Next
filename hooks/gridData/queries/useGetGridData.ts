"use client";

import axiosInstance from "@/hooks/axios/axiosInstance";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { ParamValue } from "next/dist/server/request/params";

const fetchGridData = async (
  cveForma: ParamValue,
  rows: number,
  page: number,
  token: string | null
) => {
  const response = await axiosInstance.get(`/gridData/${cveForma}`, {
    params: { rows, page },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const useGetGridData = (cveForma: ParamValue, rows: number, page: number) => {
  const { token } = useAuth();

  const { isSuccess, isPending, isError, data, error, ...values } = useQuery({
    queryKey: ["getGridData", cveForma, rows, page],
    queryFn: () => fetchGridData(cveForma, rows, page, token),
  });

  return { isSuccess, isPending, isError, data, error, ...values };
};

export default useGetGridData;
