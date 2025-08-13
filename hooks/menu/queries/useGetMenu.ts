import axiosInstance from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";

const fetchMenu = async (
  token: string,
  payload: {
    idProceso: number;
    idProcedure: number;
    parmRemp: {
      $1: string;
    };
  }
) => {
  const response = await axiosInstance.post("/Query/Procedure", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const useGetMenu = () => {
  const { token, dataUser } = useAuth();
  console.log("hook useGetMenu", { token, dataUser });

  return useQuery({
    queryKey: ["menu"],
    queryFn: () =>
      fetchMenu(token!, {
        idProceso: 12,
        idProcedure: 7,
        parmRemp: {
          $1: dataUser!.cveUsuario,
        },
      }),
    enabled: !!token && !!dataUser?.cveUsuario,
  });
};

export default useGetMenu;
