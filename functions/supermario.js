exports.handler = async () => {
  console.log("handler function run");

  const data = { name: "mario", age: 34, job: "plumber" };

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
