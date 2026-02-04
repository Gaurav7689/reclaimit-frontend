import api from "./api";

// GET all items
export const getAllItems = () => {
  return api.get("/api/items");
};

// CREATE item (JWT REQUIRED)
export const createItem = (item) => {
  return api.post("/api/items", item);
};

// REPORT item (JWT REQUIRED)
export const reportItem = (itemId, message) =>
  api.post(`/api/reports/${itemId}`, { message });

