'use strict';

const _ = require('lodash');

const DPersistenceServices = require('core/services/PersistenceServices');
const validNotFound = require('core/applications/validator/validNotFound');
const notExist = require('core/applications/validator/validNotExist');
const jsonParser = require('core/applications/transforms/jsonParser');
const {transfID} = require('core/applications/transforms/mapRelationToObjectID');

const AuditTrack = require('audit/services/AuditTrack');


const ApplicationAudit = (EntityStorage) => (Entity, PersistenceServices = DPersistenceServices) => {

    const AuditTrackCharged = AuditTrack(PersistenceServices(Entity));

    return {
        find(req, res, next) {

            let {query, params} = req;
            query = _.defaults(query, {limit: 20000}, {page: 1});
            query = jsonParser(query, 'query');

            const {limit, page} = query;


            PersistenceServices(Entity)
                .find(query)
                .then((e) => validNotFound(e, e[1], limit, page))
                .then(e => res.json(e))
                .catch(next);
        },

        findOne(req, res, next) {

            PersistenceServices(Entity)
                .findOne(req.params.id, req.user)
                .then(notExist)
                .then(e => res.json(e))
                .catch(next);
        },

        create(req, res, next) {
            let {body, params} = req;

            params = transfID(params, 'id')
            const entity_id = _.get(params, 'id')
            const entity = _.get(params, 'entity')

            PersistenceServices(EntityStorage)
                .findOne({entity_id})
                .then(base => {
                    let tmp = _.assign({body}, {entity, entity_id})

                    return Promise.all([
                        PersistenceServices(EntityStorage).update(entity_id, tmp),
                        AuditTrackCharged({entity, entity_id}).update(_.get(base, 'body', {}), body)
                    ])
                })
                .then(e => res.status(201).json(e))
                .catch(next);
        },

        patch(req, res, next) {
            let {body, params} = req;

            params = transfID(params, 'id')
            const entity_id = _.get(params, 'id')
            const entity = _.get(params, 'entity')

            PersistenceServices(EntityStorage)
                .findOne({entity_id})
                .then(base => {
                    let tmp = _.assign({body}, {entity, entity_id})

                    return Promise.all([
                        PersistenceServices(EntityStorage).patch(entity_id, tmp),
                        AuditTrackCharged({entity, entity_id}).patch(_.get(base, 'body', {}), body)
                    ])
                })
                .then(e => res.status(201).json(e))
                .catch(next);
        },

        remove(req, res, next) {
            let {params} = req;

            params = transfID(params, 'id')
            const entity_id = _.get(params, 'id')
            const entity = _.get(params, 'entity')

            AuditTrackCharged({entity, entity_id})
                .remove()
                .then(e => res.status(201).json(e))
                .catch(next);
        }
    };
};

module.exports = _.curry(ApplicationAudit);
