const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

AWS.config.update({
  region: process.env.region,
  accessKeyId: process.env.access_key,
  secretAccessKey: process.env.secret_access_key,
});

exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));
  const { id, firstName, lastName, email, dob, teacher } = JSON.parse(
    event.body || "{}"
  );

  const params = {
    TableName: "Students",
    Item: {
      ID: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      dob: dob,
      teacher: teacher,
    },
  };

  try {
    await dynamo.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Student created successfully!" }),
    };
  } catch (error) {
    console.error("Error creating student:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not create student" }),
    };
  }
};
