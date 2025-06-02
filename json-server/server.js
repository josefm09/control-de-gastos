const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('transactions.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Añadir encabezados CORS para permitir solicitudes desde tu frontend
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

server.use(jsonServer.rewriter({
  '/api/*': '/$1',
}));

server.use(router);

module.exports = server;