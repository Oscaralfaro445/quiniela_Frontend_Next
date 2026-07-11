import { AxiosError } from "axios";
import { ApiResponse } from "./ApiResponse";

export type ApiError = AxiosError<ApiResponse<null>>;
