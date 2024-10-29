import axios from "axios";
import { toast } from "react-hot-toast";

export const getApiBaseUrl = () => import.meta.env.VITE_API_BASE_URL;
export const getAccessToken = () =>
  localStorage.getItem("access_token") ||
  sessionStorage.getItem("access_token");

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

export const formatTimeInput = (value) => {
  const sanitizedValue = value.replace(/\D/g, "").slice(0, 4);

  let formattedValue = sanitizedValue;
  if (sanitizedValue.length > 2) {
    formattedValue = sanitizedValue.slice(0, 2) + ":" + sanitizedValue.slice(2);
  }

  if (sanitizedValue.length === 4) {
    const hours = parseInt(sanitizedValue.slice(0, 2), 10);
    const minutes = parseInt(sanitizedValue.slice(2), 10);

    if (hours > 23 || minutes > 59) {
      toast.error(
        "Invalid time. Please enter a valid time between 00:00 and 23:59."
      );
      return "";
    }

    formattedValue = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }

  return formattedValue;
};