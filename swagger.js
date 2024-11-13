const swaggerAutogen = require("swagger-autogen")

const doc = {
    info: {
        title: "User API",
        description: "You can create a new user, get all users, get a specific user, update a user, and delete a user."
    },
    host: "localhost:3000",
    schemes: ["http"],
};

const outputFile = "./swagger.json"
const endpointsFiles = ["./routes/index.js"]

swaggerAutogen(outputFile, endpointsFiles, doc)