export const getApiBaseUrl = () => import.meta.env.VITE_API_BASE_URL;
export const getAccessToken = () => localStorage.getItem("access_token");
export const calculateFormProgress=(fieldsFilled)=>{
    const filledCount = fieldsFilled.filter(Boolean).length;
    const progressPercentage = (filledCount / fieldsFilled.length) * 100;
    return progressPercentage;
}