"use client";

import axiosIntance from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchProfileData = async () => {
  const response = await axiosIntance.get("/profile", {
    withCredentials: true,
  });
  return response.data;
};

const useGetProfileData = () => {
  const { isSuccess, isPending, isError, data, error, ...values } = useQuery({
    queryKey: ["getProfileData"],
    queryFn: fetchProfileData,
  });

  return { isSuccess, isPending, isError, data, error, ...values };
};

export default useGetProfileData;
