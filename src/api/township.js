import api from "./axios";

export const getAllTownships = async (city_id) => {
  const res = await api.get(`/townships/${city_id}`);
  return res.data;
};
