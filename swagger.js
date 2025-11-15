const env = require("dotenv").config()
const swaggerAutogen = require('swagger-autogen')();

const local = process.env.LOCAL === 'true';
const schemes = local ? ['http'] : ['https']
const host = local ? 'localhost:8080' : 'cse341w0203.onrender.com'


const doc = {
  info: {
    title: 'Project W03-04',
    description: 'CSE-341 W03-04 API'
  },
  host,
  schemes,
  tags: [
    {
      name: 'Students',
    },
    {
      name: 'Courses',
    },
  ],
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);