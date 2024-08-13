const axios = require("axios");
const AWS = require("aws-sdk");

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const deleteStudentService = async (req, res) => {
  const { id } = req?.params;
  const lambdaPayload = {
    ID: id,
  };

  try {
    const response = await axios.post(
      process.env.AWS_DELETE_STUDENT_URL,
      lambdaPayload
    );
    return response?.data?.message;
  } catch (error) {
    res.status(500).json({ error: "Could not delete student" });
  }
};

module.exports = { deleteStudentService };
