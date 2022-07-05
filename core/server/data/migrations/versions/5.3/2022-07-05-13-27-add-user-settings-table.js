const {addTable} = require('../../utils');

module.exports = addTable('user_settings', {
    id: {type: 'string', maxlength: 24, nullable: false, primary: true},
    user_id: {type: 'string', maxlength: 24, nullable: false, references: 'users.id', unique: true, cascadeDelete: true},
    comment_notifications: {type: 'boolean', nullable: false, defaultTo: true}
});
