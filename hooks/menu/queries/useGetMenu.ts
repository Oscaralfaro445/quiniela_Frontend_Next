import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { DataUser } from "@/types/user/dataUser";
import { useQuery } from "@tanstack/react-query";

const fetchMenu = async (payload: {
  idProceso: number;
  idProcedure: number;
  parmRemp: {
    $1: string;
  };
}) => {
  const response = await axiosInstance.post("/Query/Procedure", payload);
  return response.data;
};

export const useGetMenu = () => {
  const { data: user } = useGetMe();
  const userInfo: DataUser = user?.data?.[0];

  const { isPending, isError, isSuccess, data, error } = useQuery({
    queryKey: ["menu"],
    queryFn: () =>
      fetchMenu({
        idProceso: 12,
        idProcedure: 7,
        parmRemp: {
          $1: userInfo?.cveUsuario,
        },
      }),
    enabled: !!userInfo,
  });
  return { isPending, isError, isSuccess, data, error };
};
