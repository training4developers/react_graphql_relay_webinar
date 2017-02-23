import fs from 'fs';
import path from 'path';
import { graphql } from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';

// path to the root schema file for GraphQL
import { schema } from '../dist/graphql-relay/schema';

// output directory for the schema.json and schema.graphql file
// the schema.json file is used by the babelRelayPlugin to validate
// Relay QL in the Relay Containers
const outputDir = '../dist/graphql-relay';

// Save JSON of full schema introspection for Babel Relay Plugin to use
(async() => {

    const result = await (graphql(schema, introspectionQuery));

    if (result.errors) {
        console.error('ERROR introspecting schema: ', JSON.stringify(result.errors, null, 2));
    } else {
        // output introspection JSON file
        fs.writeFileSync(
            path.join(__dirname, outputDir, 'schema.json'),
            JSON.stringify(result, null, 2)
        );
    }

})();

// Save user readable type system shorthand of schema
fs.writeFileSync(
    path.join(__dirname, outputDir, 'schema.graphql'),
    printSchema(schema)
);