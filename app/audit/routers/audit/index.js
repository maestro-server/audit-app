'use strict';

const authenticate = require('graph/middlewares/authenticate');

const Graph = require('../../entities/Graph');
const Team = require('../../entities/Teams');

const ViewGraph = require('../../applications/viewGraph');
const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Graph)(Team);
const WrapperPersistenceAppGraphs = WrapperPersistenceApp(ViewGraph);


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
        .get('/teams/:id/audit/:entity', authenticate(), WrapperPersistenceAppGraphs('view').findOne)
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
        .get('/teams/:id/audit/:entity/:idu', authenticate(), WrapperPersistenceAppGraphs('view').findOne)
        /**
         * @api {post} /teams/:id/audit/:entity ac. Create record
         * @apiName CreateTeamApi
         * @apiGroup Teams
         * @apiDescription Use for teams scope, have be all actions, params and option in /audit/:entity,
         *
         * @apiParam (Param) {String} id Team unique ID.
         * @apiParam (Param) {String} entity Entity type {applications, servers, systems, clients, networks and etc}.
         */
        .post('/teams/:id/audit/:entity', authenticate(), WrapperPersistenceAppGraphs('png').findOne);
};