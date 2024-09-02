import api from "./axios";

export const getAllEmployees = async () => {
  const res = await api.get("/employees");
  return res.data;
};
