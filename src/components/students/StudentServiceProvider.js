import { default as documentApi } from "../../serviceApi";

// Function to get the list of students
export const getStudents = async () => {
  try {
    const response = await documentApi.get(`/students`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch students");
  }
};

export const addStudent = async (
  firstName,
  lastName,
  email,
  dob,
  id,
  teacher
) => {
  try {
    const response = await documentApi.post("/students", {
      firstName,
      lastName,
      email,
      dob,
      id,
      teacher,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to create student");
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await documentApi.delete(`/students/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to delete student");
  }
};
