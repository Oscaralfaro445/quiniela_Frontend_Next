"use client";

import axiosInstance from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchGridData = async (rows: number, page: number) => {
  const response = await axiosInstance.get("/gridData", {
    params: { rows, page },
  });
  return response.data;
};

const useGetGridData = (rows: number, page: number) => {
  const { isSuccess, isPending, isError, data, error, ...values } = useQuery({
    queryKey: ["getGridData", rows, page],
    queryFn: () => fetchGridData(rows, page),
  });

  return { isSuccess, isPending, isError, data, error, ...values };
};

export default useGetGridData;
