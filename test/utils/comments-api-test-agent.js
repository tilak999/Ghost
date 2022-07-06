const TestAgent = require('./test-agent');

/**
 * NOTE: this class is not doing much at the moment. It's rather a placeholder to put
 * any Comments API specific functionality into. If there is none in the nearest
 * future, it would make sense to remove it alltogether.
 * @constructor
 * @param {Object} app  Ghost express app instance
 * @param {Object} options
 * @param {String} options.apiURL
 * @param {String} options.originURL
 */
class CommentsAPITestAgent extends TestAgent {
    constructor(app, options) {
        super(app, options);
    }
}

module.exports = CommentsAPITestAgent;
