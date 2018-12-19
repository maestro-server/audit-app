'use strict';

const _ = require('lodash');
const {DataHTTPService} = require('core/services/HTTPService');

module.exports = {
    'sync': (data, entity_id, {foreign, field, filter}) => {

        if (_.isEmpty(filter))
            throw new Error("Must've filter");

        const query = {[filter]: entity_id};
        const body = {[field['query']]: _.get(data, field['replace'])};

        const post = {
            'entity': foreign,
            'query': JSON.stringify(query),
            'body': JSON.stringify(body)
        };

        DataHTTPService()
            .create(`/sync`, post)
            .catch(console.error);
    }
}