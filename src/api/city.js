import api from "./axios";

export const getAllCities = async () => {
  const res = await api.get("/cities");
  return res.data;
};
