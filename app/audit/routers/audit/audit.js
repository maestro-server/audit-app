'use strict';

const authenticate_audit = require('audit/middlewares/authenticate_back');

const Audit = require('../../entities/Audit');
const Snapshot = require('../../entities/Snapshot');
const PersistenceAudit = require('../../applications/persistenceAudit')(Snapshot)(Audit);


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
         * @api {get} /audit/:entity a. List record by entity
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
        .get('/:entity', PersistenceAudit.find)
        /**
         * @api {get} /audit/:entity/:id b. Show record
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
        .get('/:entity/:id', PersistenceAudit.findOne)
        /**
         * @api {post} /audit/:entity/:id c. Create record command
         * @apiName CreateAudit
         * @apiGroup Audit
         * @apiDescription Set a full record on track
         *
         * @apiParam (Body x-www) {String} field All fields
         *
         * @apiParam (Param) {String} id Entity unique id.
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
        .post('/:entity/:id', PersistenceAudit.create)
        /**
         * @api {patch} /audit/:entity/:id c. Patch record command
         * @apiName PatchAudit
         * @apiGroup Audit
         * @apiDescription Set a partial record on track
         *
         * @apiParam (Body x-www) {String} field All fields
         *
         * @apiParam (Param) {String} id Entity unique id.
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
        .patch('/:entity/:id', PersistenceAudit.patch)
        /**
         * @api {delete} /audit/:entity/:id c. Remove record command
         * @apiName RemoveAudit
         * @apiGroup Audit
         * @apiDescription Set a delete record on track
         *
         *
         * @apiParam (Param) {String} id Entity unique id.
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
        .delete('/:entity/:id', PersistenceAudit.remove);
};