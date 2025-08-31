import axiosInstance from "@/hooks/axios/axiosInstance";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";

interface Marker {
  ID_PERIODO: string;
  ID_PARTIDO: number;
  ID_SCORE_E1: number;
  ID_SCORE_E2: number;
}

const postMarkers = async (
  token: string,
  payload: {
    idProceso: number;
    model: string;
    data: Marker[];
  }
) => {
  const response = await axiosInstance.post("/Crud/BulkU", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const usePostMarkers = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationKey: ["markers"],
    mutationFn: (markersData: Marker[]) =>
      postMarkers(token!, {
        idProceso: 5,
        model: "Q_PARTIDO",
        data: markersData,
      }),
    onError: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["markers"] });
    },
    onSettled: () => {},
  });
};
