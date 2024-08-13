const AWS = require("aws-sdk");

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const cognito = new AWS.CognitoIdentityServiceProvider();

const verifyToken = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  const params = {
    AccessToken: token,
  };

  try {
    const user = await cognito.getUser(params).promise();
    return user;
  } catch (error) {
    console.error("Token verification failed:", error);
    throw error;
  }
};

module.exports = { verifyToken };
