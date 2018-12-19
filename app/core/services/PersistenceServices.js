'use strict';

const _ = require('lodash');

const DFactoryDBRepository = require('core/repositories/DBRepository');

const Access = require('core/entities/accessRole');
const accessMergeTransform = require('./transforms/accessMergeTransform');
const regexFilterQuery = require('./transforms/regexFilterQuery');
const mapArrIn = require('./transforms/mapArrIn');


const Persistence = (Entity, FactoryDBRepository = DFactoryDBRepository) => {

    const DBRepository = FactoryDBRepository(Entity);

    return {
        find (query) {
            return new Promise((resolve, reject) => {

                query =  mapArrIn(query);

                const prepared = _.assign({},
                    query,
                    ...regexFilterQuery(_.get(query, 'query'))
                );

                return Promise.all([
                    DBRepository.find(prepared),
                    DBRepository.count(prepared)
                ])
                    .then(resolve)
                    .catch(reject);
            });
        },


        findOne (filter) {

            return new Promise((resolve, reject) => {

                return DBRepository
                    .findOne(filter)
                    .then(resolve)
                    .catch(reject);
            });
        },

        create (post) {
            return new Promise((resolve, reject) => {

                return DBRepository
                    .create(post)
                    .then(resolve)
                    .catch(reject);
            });
        },

        update (entity_id, post) {

            return new Promise((resolve, reject) => {
                const fill = _.slice(Entity.singleFilled, 2);

                return DBRepository
                    .update({entity_id}, post, fill)
                    .then(resolve)
                    .catch(reject);
            });
        },

        patch (entity_id, post, owner, access = Access.ROLE_WRITER) {

            return new Promise((resolve, reject) => {
                const fill = _.slice(Entity.singleFilled, 2);

                return DBRepository
                    .patch({entity_id}, post, fill)
                    .then(resolve)
                    .catch(reject);
            });
        }

    };
};

module.exports = _.curry(Persistence);
