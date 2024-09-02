import api from "./axios";

export const getAllSubcontractorOffers = async () => {
  const res = await api.get("/subcontractor-offers");
  return res.data;
};

export const createSubcontractorOffer = async (data) => {
  const res = await api.post("/subcontractor-offers", data);
  return res.data;
};

export const getSpecificSubcontractorOffer = async (id) => {
  const res = await api.get(`/subcontractor-offers/${id}`);
  return res.data;
};

export const updateSubcontractorOffer = async (id, data) => {
  const res = await api.put(`/subcontractor-offers/${id}`, data);
  return res.data;
};
