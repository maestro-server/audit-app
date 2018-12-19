'use strict';

const _ = require('lodash');

const Audit = require('../repositories/dao/audit');

const audit = () => {
    const resFilled = ['_id', 'updated_at', 'entity', 'entity_id', 'body'];

    const singleFilled = [...resFilled];

    const filled = [..._.slice(singleFilled, 2)]; // delete id

    return {
      name: "audit",

      access: 'roles',

      validators: require('../validators/audit'),

      dao: Audit,

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = audit();
