const AWS = require("aws-sdk");

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const CognitoIdentityServiceProvider = AWS.CognitoIdentityServiceProvider;
const cognito = new CognitoIdentityServiceProvider();

const loginUser = async (username, password) => {
  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: process.env.AWS_CLIENT_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  try {
    const response = await cognito.initiateAuth(params).promise();
    return response;
  } catch (error) {
    throw error;
  }
};

const changePasswordOnFirstLogin = async (
  username,
  email,
  password,
  newPassword
) => {
  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: process.env.AWS_CLIENT_ID,
    AuthParameters: {
      USERNAME: username,
      EMAIL: email,
      PASSWORD: password,
    },
  };

  try {
    const response = await cognito.initiateAuth(params).promise();

    if (response.ChallengeName === "NEW_PASSWORD_REQUIRED") {
      console.log("User is required to change password.");

      const challengeParams = {
        ClientId: process.env.AWS_CLIENT_ID,
        ChallengeName: "NEW_PASSWORD_REQUIRED",
        Session: response.Session,
        ChallengeResponses: {
          USERNAME: username,
          EMAIL: email,
          NEW_PASSWORD: newPassword,
        },
      };

      const challengeResponse = await cognito
        .respondToAuthChallenge(challengeParams)
        .promise();
      console.log("Password changed successfully:", challengeResponse);
      return challengeResponse;
    } else {
      throw new Error("User does not require a password change.");
    }
  } catch (error) {
    console.error("Password change failed:", error);
    throw error;
  }
};

const signUpUser = async (username, password, email) => {
  const params = {
    ClientId: process.env.AWS_CLIENT_ID,
    Username: username,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  };

  try {
    const response = await cognito.signUp(params).promise();
    return response;
  } catch (error) {
    throw new Error(error.message || "Failed to sign up user");
  }
};

module.exports = { loginUser, changePasswordOnFirstLogin, signUpUser };
