const jsonServer = require('json-server');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(cors()); // enable CORS for all origins
server.use(middlewares);
server.use(router);

server.listen(5000, () => {
  console.log('JSON Server with CORS running on port 5000');
});
