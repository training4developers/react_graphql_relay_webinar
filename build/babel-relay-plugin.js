/* eslint-disable strict */
try {
	// this path should point the to Schema JSON file generated by /scripts/updateSchema.js
	// if this file does not exist, run the following command:
	// npm run update-schema
    const schema = require('../dist/graphql-relay/schema.json');
    const getBabelRelayPlugin = require('babel-relay-plugin');
    module.exports = getBabelRelayPlugin(schema.data);
} catch (err) {
    console.log(', no schema file was found, please run: npm run update-schema');
}
