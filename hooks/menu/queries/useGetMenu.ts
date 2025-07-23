"use client";

// import axiosInstance from "@/hooks/axios/axiosInstance";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchMenu = async (token: string | null) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("http://localhost:3001/api/v1/Menu", config);
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
