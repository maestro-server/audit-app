'use strict';

const _ = require('lodash');

const Snapshot = require('../repositories/dao/snapshot');

const snapshot = () => {
    const resFilled = ['_id', 'updated_at', 'entity', 'entity_id', 'body'];

    const singleFilled = [...resFilled];

    const filled = [..._.slice(singleFilled, 2)]; // delete id

    return {
      name: "snapshot",

      access: 'roles',

      validators: require('../validators/snapshot'),

      dao: Snapshot,

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = snapshot();
