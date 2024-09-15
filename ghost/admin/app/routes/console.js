import AuthenticatedRoute from 'ghost-admin/routes/authenticated';

export default class ConsoleRoute extends AuthenticatedRoute {
    model() {
        return (new Date()).valueOf();
    }

    buildRouteInfoMetadata() {
        return {
            titleToken: 'Console'
        };
    }
}
