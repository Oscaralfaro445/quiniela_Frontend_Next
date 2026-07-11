/*
 ** Mutation
 ** TData, retorna mutationFn cuando es exitosa
 ** TError, el tipo de error
 ** TVariables, lo que recibe mutationFn
 ** TContext, contexto para optimizar actualizaciones
 */

/*
 ** Querie
 ** TQueryFnData, retorna el queryFn
 ** TError, el tipo de error
 ** TData, transformación opcional con select
 ** TQueryKey, el tipo de query key
 */

export interface ApiResponse<T> {
  data: T[] | null;
  errorUs: string | null;
  errorNeg: string[] | null;
  estatus: number;
}
