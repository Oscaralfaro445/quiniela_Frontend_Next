"use client";

import axiosInstance from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { ParamValue } from "next/dist/server/request/params";

const fetchFormdata = async (cveForma: ParamValue) => {
  const response = await axiosInstance.get(`/formData/${cveForma}`);
  return response.data;
};

const useGetFormdata = (cveForma: ParamValue) => {
  const { isSuccess, isPending, isError, data, error, ...values } = useQuery({
    queryKey: ["getFormdata", cveForma],
    queryFn: () => fetchFormdata(cveForma),
  });

  return { isSuccess, isPending, isError, data, error, ...values };
};

export default useGetFormdata;
