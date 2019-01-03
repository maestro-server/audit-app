'use strict';

const _ = require('lodash');
const HookChanged = require('./hookChanged');

module.exports = (PersistenceStorage) => (body, entity, entity_id, user, created=false) => {

    return new Promise((resolve, reject) => {

        if (!_.isEmpty(body)) {

            let actions = [
                PersistenceStorage.create({entity, entity_id, user, body})
            ];

            if(!created)
                actions.push(HookChanged({entity, entity_id, user, body}));

            return Promise.all(actions)
            .then(resolve)
            .catch(reject);

        } else {
            resolve()
        }
    });
};