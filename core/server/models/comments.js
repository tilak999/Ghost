const ghostBookshelf = require('./base');

const Comment = ghostBookshelf.Model.extend({
    tableName: 'comments',

    defaults: function defaults() {
        return {
            status: 'published'
        };
    },

    post() {
        return this.belongsTo('Post', 'post_id');
    }
}, {
    async permissible(model, action, context, unsafeAttrs, loadedPermissions, hasUserPermission, hasApiKeyPermission, hasMemberPermission) {
        console.log('checking permissions', hasMemberPermission);
        return true;
    }
});

module.exports = {
    Comment: ghostBookshelf.model('Comment', Comment)
};
