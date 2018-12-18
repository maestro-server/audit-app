'use strict';

const authenticate = require('graph/middlewares/authenticate');
const authenticate_public = require('graph/middlewares/authenticate_public');
const authenticate_audit = require('graph/middlewares/authenticate_back');

const Graph = require('../../entities/Graph');
const PersistenceGraph = require('../../applications/persistenceGraph')(Graph);
const ViewGraph = require('../../applications/viewGraph')(Graph);


module.exports = function (router) {

    router
        /**
         *
         * @api {get} / Ping
         * @apiName GetPing
         * @apiGroup Ping
         *
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *        app: (String),
         *        description: (String),
         *        version: (Float),
         *        api_timeout: (Number)
         *     }
         */

        /**
         * @api {get} /api/:entity a. List record by entity
         * @apiName GetAudit
         * @apiGroup Audit
         *
         * @apiParam (Query) {String} [token] Authorization JWT {Token}
         * @apiParam (Query) {String} entity_id Entity unique id
         * @apiParam (Query) {Object} data Filter by field
         * <br/>
         * Must used with dot notation, like
         * <pre class="prettyprint language-json" data-type="json">
         * <code>
         * "data.hostname": 'search by hostname' // or<br/>
         * "data.datacenters.providers": 'search by providers'
         *  </code>
         * </pre>
         *
         * @apiParam (Param) {String} entity Entity type {applications, servers, systems, clients, networks and etc}.
         *
         * @apiPermission JWT (Read | Write | Admin)
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     [
         *      {
         *          _id: <string>
         *          entity_id: <string>
         *          entity: <string>
         *          created_at: <date TZ>
         *          data: <object>
         *               {}
         *          }
         *     ]
         */
        .get('/:entity', authenticate(), ViewGraph.view)
        /**
         * @api {get} /api/:entity/:id b. Show record
         * @apiName GetAuditId
         * @apiGroup Audit
         *
         * @apiParam (Query) {String} [token] Authorization JWT {Token}
         *
         * @apiParam (Param) {String} id Entity unique id.
         * @apiParam (Param) {String} entity Entity type {applications, servers, systems, clients, networks and etc}.
         *
         * @apiPermission JWT (Read | Write | Admin)
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     [
         *      {
         *          _id: <string>
         *          entity_id: <string>
         *          entity: <string>
         *          created_at: <date TZ>
         *          data: <object>
         *               {}
         *          }
         *     ]
         */
        .get('/:entity/:id', authenticate(), ViewGraph.view)
        /**
         * @api {post} /api/:entity c. Create record
         * @apiName CreateAudit
         * @apiGroup Audit
         *
         * @apiParam (Body x-www) {String} [entity_id] Entity ID
         * @apiParam (Body x-www) {String} [roles] Current roles
         * @apiParam (Body x-www) {String} field All fields
         *
         * @apiParam (Param) {String} entity Entity type {applications, servers, systems, clients, networks and etc}.
         *
         * @apiPermission JWT Audit (Contract)
         * @apiHeader (Header) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 201 OK
         *     {}
         */
        .post('/:entity', authenticate_audit(), PersistenceGraph.create);
};