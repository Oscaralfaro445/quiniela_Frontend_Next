import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";

const sendEmail = async (email: string) => {
  const response = await axiosInstance.get("/Email/SendEmail", {
    params: {
      email: email,
    },
  });
  return response.data;
};

export const useSendEmail = () => {
  return useMutation({
    mutationKey: ["sendEmail"],
    mutationFn: sendEmail,
  });
};
