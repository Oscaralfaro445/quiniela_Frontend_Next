import axiosInstance from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";

const fetchSurvivorActivation = async ({ token, payload }) => {
  const response = await axiosInstance.post("/Query/Procedure", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const useGetSurvivorActivation = () => {};
