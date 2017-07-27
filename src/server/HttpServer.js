import http from 'http';
import config from 'config';

function HttpServer(app) {

    const server = http.createServer(app);
    const port = config.get('server.port');

    server.start = () => {
        server.listen(port);
    };

    server.finish = (cb) => {
        server.close(cb);
    };

    return server;
}

export default HttpServer;

