const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('transactions.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Añadir encabezados CORS para permitir solicitudes desde tu frontend
server.use((req, res, next) => {
  // Opción 1: Permitir cualquier origen (menos seguro pero más flexible)
  res.header('Access-Control-Allow-Origin', '*');
  
  // Opción 2: Permitir orígenes específicos (más seguro)
  // const allowedOrigins = [
  //   'https://control-de-gastos-11gt.vercel.app',
  //   'https://control-de-gastos-11gt-ppkjiwmhq.vercel.app'
  // ];
  // const origin = req.headers.origin;
  // if (allowedOrigins.includes(origin)) {
  //   res.header('Access-Control-Allow-Origin', origin);
  // }
  
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Manejar solicitudes preflight OPTIONS directamente
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

server.use(jsonServer.rewriter({
  '/api/*': '/$1',
}));

server.use(router);

module.exports = server;