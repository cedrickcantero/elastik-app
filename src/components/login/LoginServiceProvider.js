import { default as documentApi } from "../../serviceApi";

export const loginUser = async (username, password) => {
  try {
    const response = await documentApi.post(`/login`, { username, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Login failed");
  }
};

export const getUserDetails = async () => {
  const token = JSON.parse(sessionStorage.getItem("authResult")).AccessToken;

  if (!token) {
    throw new Error("No token found in session storage");
  }

  try {
    const response = await documentApi.get("/user-details", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await documentApi.post(`/signup`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Register failed");
  }
};
