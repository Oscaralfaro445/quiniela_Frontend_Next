"use client";

import axiosInstance from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchMenudata = async () => {
  const response = await axiosInstance.get("/menuData");
  return response.data.data;
};

const useGetMenuData = () => {
  const { isSuccess, isPending, isError, data, error, ...values } = useQuery({
    queryKey: ["getMenudata"],
    queryFn: fetchMenudata,
  });

  return { isSuccess, isPending, isError, data, error, ...values };
};

export default useGetMenuData;
