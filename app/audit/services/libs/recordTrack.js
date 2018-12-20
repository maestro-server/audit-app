'use strict';

const _ = require('lodash');
const HookChanged = require('./hookChanged');

module.exports = (PersistenceStorage) => (body, entity, entity_id, created=false) => {

    return new Promise((resolve, reject) => {

        if (!_.isEmpty(body)) {

            let actions = [
                PersistenceStorage.create({entity, entity_id, body})
            ];

            if(!created)
                actions.push(HookChanged({entity, entity_id, body}));

            return Promise.all(actions)
            .then(resolve)
            .catch(reject);

        } else {
            resolve()
        }
    });
};