const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('transactions.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Añadir encabezados CORS para permitir solicitudes desde tu frontend
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://control-de-gastos-11gt.vercel.app');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

server.use(jsonServer.rewriter({
  '/api/*': '/$1',
}));

server.use(router);

module.exports = server;