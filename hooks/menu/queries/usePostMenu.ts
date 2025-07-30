import axiosInstance from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";

const postMenu = async (token: string | null) => {
  const response = await axiosInstance.post(
    "/Menu",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const usePostMenu = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["menu"],
    queryFn: () => postMenu(token),
  });
};

export default usePostMenu;
