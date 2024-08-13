const axios = require("axios");
const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const createStudentService = async (req, res) => {
  const { id, firstName, lastName, email, dob, teacher } = req.body;

  const lambdaPayload = {
    id: id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    dob: dob,
    teacher: teacher,
  };

  try {
    const response = await axios.post(
      process.env.AWS_CREATE_STUDENT_URL,
      lambdaPayload
    );
    return response?.data?.message;
  } catch (error) {
    res.status(500).json({ error: "Could not create student" });
  }
};

module.exports = { createStudentService };
