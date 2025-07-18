"use client";

import axiosInstance from "@/hooks/axios/axiosInstance";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";

const fetchMenudata = async (token: string | null) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axiosInstance.get("/menuData", config);
  return response.data.data;
};

const useGetMenuData = () => {
  const { token } = useAuth();

  const { isSuccess, isPending, isError, data, error, ...values } = useQuery({
    queryKey: ["getMenudata"],
    queryFn: () => fetchMenudata(token),
  });

  return { isSuccess, isPending, isError, data, error, ...values };
};

export default useGetMenuData;
