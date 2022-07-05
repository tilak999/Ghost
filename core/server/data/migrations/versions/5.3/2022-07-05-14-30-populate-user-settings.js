const logging = require('@tryghost/logging');
const ObjectID = require('bson-objectid').default;

const {createTransactionalMigration} = require('../../utils');

module.exports = createTransactionalMigration(
    async function up(knex) {
        logging.info('Populating `user_settings` with default settings for all staff users');

        const userSettingsIdRows = await knex('user_settings')
            .select('id', 'user_id');

        const userIdsWithExistingSettings = userSettingsIdRows.map(r => r.user_id);

        const userIdRows = await knex('users').select('id');

        const toInsert = [];

        // eslint-disable-next-line no-restricted-syntax
        for (const userIdRow of userIdRows) {
            const {id: userId} = userIdRow;

            if (userIdsWithExistingSettings.includes(userId)) {
                continue;
            }

            const userSettings = {
                id: ObjectID().toHexString(),
                user_id: userId,
                comment_notifications: true
            };

            toInsert.push(userSettings);
        }

        await knex.batchInsert('user_settings', toInsert);
    },

    async function down(knex) {
        logging.info('Clearing `user_settings` table');

        await knex.raw('truncate table user_settings');
    }
);
