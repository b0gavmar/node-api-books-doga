import swaggerAutogen from 'swagger-autogen'
const doc = {
    info: {
        title: "api",
        version: "1.0.0",
        desciption: "api"
    },
    host: "localhost:3000",
    basePath: "/"
};
const swaggerOutput = "./swagger-output.json";
const routes = ["./routes/books.js"];
swaggerAutogen()(swaggerOutput,routes,doc);