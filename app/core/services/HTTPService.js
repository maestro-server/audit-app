'use strict';

const _ = require('lodash/fp');
const Connector = require('../libs/request');
const privateToken = require('audit/config/private_token.js');
const HTTPError = require('core/errors/factoryError')('HTTPError');

const HTTPService = (url) => (header = {}) => {

    Object.assign(header, {Authorization: privateToken.token}); // inject private token, used to autheticate on private services

    const factoryRequest = (caller, path, args) => {
        return new Promise((resolve, reject) => {
            return Connector(url, header)[caller](path, args)
                .then(_.get('data'))
                .then(resolve)
                .catch(e=>{
                    if (e.response) {
                        if(e.response.data.message) {
                            const str = _.reduce((result, value) => result = `${result} ${value}`, '')(e.response.data.message);
                            reject(HTTPError(str));
                        }
                        reject(HTTPError(e.response.data.error));
                    } else {
                        reject(HTTPError(e.toString()));
                    }
                });
        });
    };

    return {
        find(path, args = {}) {
            return factoryRequest('get', path, args);
        },

        create(path, args = {}) {
            return factoryRequest('post', path, args);
        },

        update(path, args = {}) {
            return factoryRequest('put', path, args);
        },

        remove(path, args = {}) {
            return factoryRequest('delete', path, args);
        }
    };
};


const DataHTTPService = (header = {}) => {
    const url = process.env.MAESTRO_DATA_URI || 'http://localhost:5010';
    return HTTPService(url)(header);
};

module.exports = {
    HTTPService,
    DataHTTPService
};
