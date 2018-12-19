'use strict';

const _ = require('lodash');
const commands = require('./commands');

module.exports = (data, entity_id) => (rules, key) => {

    if (_.has(data, key)) {

        for (let rule in rules) {
            const {command} = rules[rule]
            commands[command](data, entity_id, rules[rule])
        }

    }

}