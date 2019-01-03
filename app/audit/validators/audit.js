'use strict';

const Joi = require('joi');
const {roles, entity, entity_id, user, body, parent, active} = require('core/validators/validators');

const schema = Joi.object().keys({
    entity,
    entity_id,
    body,
    user,
    parent,
    roles,
    active
});

module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
