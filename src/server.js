import http from 'http';
import express from 'express';
import graphqlHttp from 'express-graphql';

//import { schema } from './graphql/schema';
import { schema } from './graphql-relay/schema';

export default function (config) {

    const app = express();
    const server = http.createServer(app);
    const graphqlHttpConfig = schema => ({
        schema,
        pretty: true,
        graphiql: true,
        context: {
            baseUrl: 'http://localhost:3010'
        }
    });

    app.use('/graphql', graphqlHttp(graphqlHttpConfig(schema)));
    app.use(express.static(config.webServer.folder));

    server.listen(config.webServer.port, err => {

        if (err) {
            console.error(err);
            return;
        }

        console.log(`web server running on port ${config.webServer.port}
please do not close this terminal window
please use a new terminal window to run additional commands`);
    });

}
