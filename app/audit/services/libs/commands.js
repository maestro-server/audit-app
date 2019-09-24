'use strict';

const _ = require('lodash');
const {DataHTTPService} = require('core/services/HTTPService');

const requestData = (post) => {
    DataHTTPService()
        .create(`/sync`, post)
        .then(console.info)
        .catch(console.error);
};

module.exports = {
    'sync': (data, entity_id, {foreign, field, filter}) => {

        if (_.isEmpty(filter))
            throw new Error("Must've filter");

        const query = {[filter]: entity_id};
        const body = {[field['query']]: _.get(data, field['replace'])};

        const post = {
            'query': JSON.stringify(query),
            'body': JSON.stringify(body)
        };

        if(_.isArray(foreign)) {
            for(let fitem in foreign) {
                _.assign(post, {'entity': foreign[fitem]});
                requestData(post);
            }
        }

        if(_.isString(foreign)) {
            _.assign(post, {'entity': foreign});
            requestData(post);
        }

    }
};