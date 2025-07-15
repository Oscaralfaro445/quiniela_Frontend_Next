export const getFilterFields = (fields: any[]) => {
  if (!fields) return [];

  return fields
    .filter((field: any) => field?.bFiltra)
    .map((field: any) => ({ ...field }));
};
