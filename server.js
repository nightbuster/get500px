const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('src/app/mock-photos.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use('/api', router);
server.listen(3000, function() {
    console.log('JSON Server is running')
});