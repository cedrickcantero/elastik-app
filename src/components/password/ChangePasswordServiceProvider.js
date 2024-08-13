import { default as documentApi } from "../../serviceApi";

export const changePasswordOnFirstLogin = async (
  username,
  email,
  password,
  newPassword
) => {
  try {
    const response = await documentApi.post(`/change-password`, {
      username,
      email,
      password,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Change Password failed");
  }
};
