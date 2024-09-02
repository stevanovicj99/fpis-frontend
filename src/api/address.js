import api from "./axios";

export const getAllAddresses = async (township_id) => {
  const res = await api.get(`/addresses/${township_id}`);
  return res.data;
};
