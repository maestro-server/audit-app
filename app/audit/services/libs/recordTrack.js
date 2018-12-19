'use strict';

const _ = require('lodash');
const HookChanged = require('./hookChanged');

module.exports = (body, entity, entity_id, PersistenceStorage) => {

    return new Promise((resolve, reject) => {

        if (!_.isEmpty(body)) {

            return Promise.all([
                PersistenceStorage.create({entity, entity_id, body}),
                HookChanged({entity, entity_id, body})
            ])
            .then(resolve)
            .catch(reject);

        } else {
            resolve()
        }
    });
};