/* eslint-disable strict */
'use strict';

// starts the web server using the configuation loaded from package.json
const { webServer } = require('./package.json');

require('./dist/server.js').default({ webServer });
