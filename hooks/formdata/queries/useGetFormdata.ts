"use client";

import axiosInstance from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchFormdata = async () => {
  const response = await axiosInstance.get("/formData");
  return response.data;
};

const useGetFormdata = () => {
  const { isSuccess, isPending, isError, data, error, ...values } = useQuery({
    queryKey: ["getFormdata"],
    queryFn: fetchFormdata,
  });
  return { isSuccess, isPending, isError, data, error, ...values };
};

export default useGetFormdata;
