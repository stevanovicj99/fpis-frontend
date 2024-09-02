import api from "./axios";

export const getAllConsents = async () => {
  const res = await api.get("/consents");
  return res.data;
};
