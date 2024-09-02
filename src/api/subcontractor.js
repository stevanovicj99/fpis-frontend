import api from "./axios";

export const getAllSubcontractors = async () => {
  const res = await api.get("/subcontractors");
  return res.data;
};

export const getSubcontractor = async (id) => {
  const res = await api.get(`/subcontractors/${id}`);

  return res.data;
};

export const deleteSpecificSubcontractor = async (id) => {
  await api.delete(`/subcontractors/${id}`);
};

export const createSubcontractor = async (body) => {
  const res = await api.post("/subcontractors", body);

  return res.data;
};

export const editSubcontractor = async (id, body) => {
  const res = await api.put(`/subcontractors/${id}`, body);

  return res.data;
};
