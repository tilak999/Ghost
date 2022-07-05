const ghostBookshelf = require('./base');
const errors = require('@tryghost/errors');
const tpl = require('@tryghost/tpl');

const messages = {
    notYourComment: 'You may only edit your own comments'
};

const Comment = ghostBookshelf.Model.extend({
    tableName: 'comments',

    defaults: function defaults() {
        return {
            status: 'published'
        };
    },

    post() {
        return this.belongsTo('Post', 'post_id');
    },

    member() {
        return this.belongsTo('Member', 'member_id');
    },

    parent() {
        return this.belongsTo('Comment', 'parent_id');
    },

    emitChange: function emitChange(event, options) {
        const eventToTrigger = 'comment' + '.' + event;
        ghostBookshelf.Model.prototype.emitChange.bind(this)(this, eventToTrigger, options);
    },

    onCreated: function onCreated(model, options) {
        ghostBookshelf.Model.prototype.onCreated.apply(this, arguments);

        model.emitChange('added', options);
    }
}, {
    async permissible(id, action, context, unsafeAttrs, loadedPermissions, hasUserPermission, hasApiKeyPermission, hasMemberPermission) {
        if (action === 'edit' || action === 'destroy' && id !== context.member.id) {
            return Promise.reject(new errors.NoPermissionError({
                message: tpl(messages.notYourComment)
            }));
        }

        return hasMemberPermission;
    }
});

module.exports = {
    Comment: ghostBookshelf.model('Comment', Comment)
};
