const AWS = require("aws-sdk");

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const getStudents = async () => {
  const params = {
    TableName: "Students",
  };

  try {
    const data = await dynamoDB.scan(params).promise();
    return data.Items;
  } catch (error) {
    throw new Error("Error fetching students: " + error.message);
  }
};

module.exports = { getStudents };
