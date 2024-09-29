import axios from "axios";

export const getApiBaseUrl = () => import.meta.env.VITE_API_BASE_URL;
export const getAccessToken = () => localStorage.getItem("access_token");
export const calculateFormProgress = (fieldsFilled) => {
  const filledCount = fieldsFilled.filter(Boolean).length;
  const progressPercentage = (filledCount / fieldsFilled.length) * 100;
  return progressPercentage;
};

export const uploadFile = async (file) => {
  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post("/upload/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.fileUrl;
    } catch (error) {
      console.error(
        `Error: ${error.response ? error.response.data.message : error.message}`
      );
    }
  }
};
