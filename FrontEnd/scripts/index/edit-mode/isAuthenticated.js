const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
export const isAuthenticated = token && userId;
