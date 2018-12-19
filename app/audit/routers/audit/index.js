'use strict';

const authenticate = require('audit/middlewares/authenticate');

const Audit = require('../../entities/Audit');
const Snapshot = require('../../entities/Snapshot');
const Team = require('../../entities/Teams');

const PersistenceAppAudit = require('../../applications/persistenceAudit')(Snapshot);
const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Audit)(Team);
const WrapperPersistenceAppAudit = WrapperPersistenceApp(PersistenceAppAudit);




module.exports = function (router) {

    router
        /**
         * @api {get} /teams/:id/audit/:entity aa. List record by entity
         * @apiName GetTeamApi
         * @apiGroup Teams
         * @apiDescription Use for teams scope, have be all actions, params and option in /audit/:entity,
         *
         * @apiParam (Param) {String} id Team unique ID.
         * @apiParam (Param) {String} entity Entity type {applications, servers, systems, clients, networks and etc}.
         */
        .get('/teams/:id/audit/:entity', authenticate(), WrapperPersistenceAppAudit().find)
        /**
         * @api {get} /teams/:id/audit/:entity ab. Show record
         * @apiName GetTeamApiID
         * @apiGroup Teams
         * @apiDescription Use for teams scope, have be all actions, params and option in /audit/:entity/:id,
         *
         * @apiParam (Param) {String} id Team unique ID.
         * @apiParam (Param) {String} idu Entity unique ID.
         * @apiParam (Param) {String} entity Entity type {applications, servers, systems, clients, networks and etc}.
         */
        .get('/teams/:id/audit/:entity/:idu', authenticate(), WrapperPersistenceAppAudit().findOne)
        /**
         * @api {post} /teams/:id/audit/:entity ac. Create record
         * @apiName CreateTeamApi
         * @apiGroup Teams
         * @apiDescription Use for teams scope, have be all actions, params and option in /audit/:entity,
         *
         * @apiParam (Param) {String} id Team unique ID.
         * @apiParam (Param) {String} entity Entity type {applications, servers, systems, clients, networks and etc}.
         */
        .post('/teams/:id/audit/:entity', authenticate(), WrapperPersistenceAppAudit().create);
};