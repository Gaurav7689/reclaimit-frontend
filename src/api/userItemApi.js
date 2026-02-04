import api from "./api";

// ✅ GET LOGGED-IN USER ITEMS
export const getMyItems = () => {
  return api.get("/api/user/items");
};

// ✅ UPDATE ITEM STATUS
export const updateItemStatus = (id, status) => {
  return api.put(`/api/user/items/${id}/status?status=${status}`);
};
