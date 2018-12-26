'use strict';

const _ = require('lodash');

const DPersistenceServices = require('core/services/PersistenceServices');
const validNotFound = require('core/applications/validator/validNotFound');
const {transfID} = require('core/applications/transforms/mapRelationToObjectID');

const hateaosTransform = require('core/applications/transforms/hateoasTransform');

const AuditTrack = require('audit/services/AuditTrack');


const ApplicationAudit = (EntityStorage) => (Entity, PersistenceServices = DPersistenceServices) => {

    const AuditTrackCharged = AuditTrack(PersistenceServices(Entity));

    return {
        find(req, res, next) {

            let {query, params} = req;

            params = transfID(params, 'id');
            const entity_id = _.get(params, 'id');
            const entity = _.get(params, 'entity');

            query = _.defaults(query, {entity, entity_id}, {limit: 20000}, {page: 1});

            const {limit, page} = query;

            PersistenceServices(Entity)
                .find(query)
                .then((e) => validNotFound(e, e[1], limit, page))
                .then((e) => hateaosTransform(Entity).collectionTransform(e[0], e[1], limit, page))
                .then(e => res.json(e))
                .catch(next);
        },

        create(req, res, next) {
            let {body, params} = req;

            params = transfID(params, 'id');
            const entity_id = _.get(params, 'id');
            const entity = _.get(params, 'entity');

            let tmp = _.assign({body}, {entity, entity_id})

            Promise.all([
                    PersistenceServices(EntityStorage).create(tmp),
                    AuditTrackCharged({entity, entity_id}).update({}, body)
                ])
                .then(e => res.status(201).json(e))
                .catch(next);
        },

        update(req, res, next) {
            let {body, params} = req;

            params = transfID(params, 'id');
            const entity_id = _.get(params, 'id');
            const entity = _.get(params, 'entity');

            PersistenceServices(EntityStorage)
                .findOne({entity_id})
                .then(base => {
                    let tmp = _.assign({body}, {entity, entity_id})

                    return Promise.all([
                        PersistenceServices(EntityStorage).update(entity_id, tmp),
                        AuditTrackCharged({entity, entity_id}).update(_.get(base, 'body', {}), body)
                    ])
                })
                .then(e => res.status(204).json(e))
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

            params = transfID(params, 'id');
            const entity_id = _.get(params, 'id');
            const entity = _.get(params, 'entity');

            AuditTrackCharged({entity, entity_id})
                .remove()
                .then(e => res.status(201).json(e))
                .catch(next);
        }
    };
};

module.exports = _.curry(ApplicationAudit);
