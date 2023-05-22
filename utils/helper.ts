export const isSuccessResponse = (status: number): boolean => {
  return [200, 201].includes(status);
};