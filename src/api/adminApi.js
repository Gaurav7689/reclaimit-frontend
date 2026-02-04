import api from "./api";

export const getAdminStats = () => {
  return api.get("/api/admin/stats");
};
