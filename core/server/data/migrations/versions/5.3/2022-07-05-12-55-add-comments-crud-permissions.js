const {combineTransactionalMigrations, addPermissionWithRoles} = require('../../utils');

module.exports = combineTransactionalMigrations(
    addPermissionWithRoles({
        name: 'Browse comments',
        action: 'browse',
        object: 'comment'
    }, [
        'Administrator'
    ]),
    addPermissionWithRoles({
        name: 'Read comments',
        action: 'read',
        object: 'comment'
    }, [
        'Administrator'
    ]),
    addPermissionWithRoles({
        name: 'Edit comments',
        action: 'edit',
        object: 'comment'
    }, [
        'Administrator'
    ]),
    addPermissionWithRoles({
        name: 'Add comments',
        action: 'add',
        object: 'comment'
    }, [
        'Administrator'
    ]),
    addPermissionWithRoles({
        name: 'Delete comments',
        action: 'destroy',
        object: 'comment'
    }, [
        'Administrator'
    ]),
    addPermissionWithRoles({
        name: 'Moderate comments',
        action: 'moderate',
        object: 'comment'
    }, [
        'Administrator'
    ])
);
