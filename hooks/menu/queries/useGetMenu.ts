import { axiosInstance } from "@/api/axiosInstance";
// import { useGetMe } from "@/hooks/queries/user/useGetMe";
// import { GetMeResponse } from "@/types/user/user.types";
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
  // const { data: user } = useGetMe();
  //const userInfo: GetMeResponse = user?.data?.[0];

  const { isPending, isError, isSuccess, data, error } = useQuery({
    queryKey: ["menu"],
    queryFn: () =>
      fetchMenu({
        idProceso: 12,
        idProcedure: 7,
        parmRemp: {
          $1: "1",
        },
      }),
    // enabled: !!userInfo,
  });
  return { isPending, isError, isSuccess, data, error };
};
