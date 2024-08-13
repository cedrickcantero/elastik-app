const AWS = require("aws-sdk");

const CognitoIdentityServiceProvider = AWS.CognitoIdentityServiceProvider;
const cognito = new CognitoIdentityServiceProvider();

AWS.config.update({
  region: process.env.region,
  accessKeyId: process.env.access_key,
  secretAccessKey: process.env.secret_access_key,
});

exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));
  const { username, password } = JSON.parse(event.body || "{}");

  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: process.env.client_id,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  try {
    const authResult = await cognito.initiateAuth(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Login successfully!",
        data: authResult,
      }),
    };
  } catch (error) {
    console.error("Error Logging in:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Login Failed" }),
    };
  }
};
