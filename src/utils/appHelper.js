export const getApiBaseUrl = () => import.meta.env.VITE_API_BASE_URL;
export const getAccessToken = () => localStorage.getItem("access_token");
