const axios = require("axios");
const AWS = require("aws-sdk");

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const loginUserService = async (username, password) => {
  const lambdaPayload = {
    username: username,
    password: password,
  };

  try {
    const response = await axios.post(
      process.env.AWS_LOGIN_USER_URL,
      lambdaPayload
    );
    return response?.data?.data;
  } catch (error) {
    res.status(500).json({ error: "Could not create student" });
  }
};

module.exports = { loginUserService };
