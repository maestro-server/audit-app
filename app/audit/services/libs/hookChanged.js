'use strict';

const _ = require('lodash');
const Rules = require('config/rules_changed.json');
const activeHooks = require('./activeHooks');

const HookChanged = ({entity, entity_id, body}) => {

    return new Promise((resolve) => {

        if (_.has(Rules, entity))
            _.forEach(Rules[entity], activeHooks(body, entity_id))

        resolve()
    });
};

module.exports = HookChanged;