import axios from "axios";
import moment from "moment";

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

export const formatTimeInput = (
  nextDate,
  setData,
  parentPropertyName,
  childPropertyName
) => {
  const formattedTime = `${String(nextDate?.getHours()).padStart(
    2,
    "0"
  )}:${String(nextDate?.getMinutes()).padStart(2, "0")}`;

  setData((prev) => ({
    ...prev,
    [parentPropertyName]: {
      ...prev[parentPropertyName],
      [childPropertyName]: formattedTime,
    },
  }));
};

export const parseTimeString = (timeString) => {
  if (!timeString) return null;

  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  return date;
};

export const formatDate = (date) => {
  return moment.utc(date).local().format("YYYY-MM-DDTHH:mm:SS.sss");
};
