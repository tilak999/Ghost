const {combineTransactionalMigrations, addPermissionWithRoles} = require('../../utils');

module.exports = combineTransactionalMigrations(
    addPermissionWithRoles({
        name: 'Like comments',
        action: 'like',
        object: 'comment'
    }, [
        'Administrator'
    ]),
    addPermissionWithRoles({
        name: 'Unlike comments',
        action: 'unlike',
        object: 'comment'
    }, [
        'Administrator'
    ])
);
