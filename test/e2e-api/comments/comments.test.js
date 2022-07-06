const {agentProvider, mockManager, fixtureManager} = require('../../utils/e2e-framework');

let membersAgent, membersService;

describe('Comments API', function () {
    before(async function () {
        const agents = await agentProvider.getAgentsForComments();
        membersAgent = agents.membersAgent;

        await fixtureManager.init('members');
        await fixtureManager.init('comments');
    });

    afterEach(function () {
        mockManager.restore();
    });

    describe('when not authenticated', function () {
        it('can browse posts');
    });
});
