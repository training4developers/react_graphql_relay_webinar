import Relay from 'react-relay';

export default class ViewerRoute extends Relay.Route {

    static queries = {
        viewer: () => Relay.QL `query { viewer }`
    };

    static routeName = 'ViewerRoute';

}