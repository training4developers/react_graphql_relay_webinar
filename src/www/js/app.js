import '../css/styles.scss';

import React from 'react';
import Relay from 'react-relay';	
import ReactDOM from 'react-dom';

import BookToolContainer from './containers/book-tool-container';
import ViewerRoute from './routes/viewer-route';

ReactDOM.render(
	<Relay.RootContainer Component={BookToolContainer} route={new ViewerRoute()} />,
	document.querySelector('main')
);
