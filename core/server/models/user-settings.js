const ghostBookshelf = require('./base');

const UserSettings = ghostBookshelf.Model.extend({
    tableName: 'user_settings',

    defaults: function defaults() {
        return {
            comment_notifications: true
        };
    }
}, {
    user() {
        return this.belongsTo('User');
    }
});

module.exports = {
    UserSettings: ghostBookshelf.model('UserSettings', UserSettings)
};
