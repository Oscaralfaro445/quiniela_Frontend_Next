"use client";

import axiosInstance from "@/hooks/axios/axiosInstance";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";

const fetchMenu = async (token: string | null) => {
  const response = await axiosInstance.post(
    "/Menu",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};

const useGetMenu = () => {
  const { token } = useAuth();

  const { isSuccess, isPending, isError, data, error, ...values } = useQuery({
    queryKey: ["getMenu"],
    queryFn: () => fetchMenu(token),
  });

  return { isSuccess, isPending, isError, data, error, ...values };
};

export default useGetMenu;
