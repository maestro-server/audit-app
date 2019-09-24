'use strict';

const _ = require('lodash');

const Snapshots = require('../repositories/dao/snapshot');

const snapshot = () => {
    const resFilled = ['_id', 'updated_at', 'entity', 'entity_id', 'user', 'body'];

    const singleFilled = [...resFilled];

    const filled = [..._.slice(singleFilled, 2)]; // delete id

    return {
      name: "snapshot",

      access: 'roles',

      validators: require('../validators/audit'),

      dao: Snapshots,

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = snapshot();
