'use strict';

const authenticate_private = require('audit/middlewares/authenticate_private');

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
         * @api {get} /audit/:entity/:id b. Show record
         * @apiName GetAuditId
         * @apiGroup Audit
         *
         * @apiParam (Query) {String} [token] Authorization JWT {Token}
         *
         * @apiParam (Param) {String} id Entity unique id.
         * @apiParam (Param) {String} entity Entity type {applications, servers, systems, clients, networks and etc}.
         *
         * @apiPermission JWT Private (MAESTRO_SECRETJWT_PRIVATE)
         * @apiHeader (Header) {String} Authorization JWT {Token}
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
         *          body: <object>
         *               {}
         *          }
         *     ]
         */
        .get('/:entity/:id', authenticate_private(), PersistenceAudit.find)
        /**
         * @api {post} /audit/:entity/:id c. Create new record
         * @apiName CreateAudit
         * @apiGroup Audit
         * @apiDescription Set a full record on track
         *
         * @apiParam (Body x-www) {String} field All fields
         *
         * @apiParam (Param) {String} id Entity unique id.
         * @apiParam (Param) {String} entity Entity type {applications, servers, systems, clients, networks and etc}.
         *
         * @apiPermission JWT Private (MAESTRO_SECRETJWT_PRIVATE)
         * @apiHeader (Header) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 201 OK
         *     {}
         */
        .post('/:entity/:id/:user?', authenticate_private(), PersistenceAudit.create)
        /**
         * @api {put} /audit/:entity/:id d. Set record command
         * @apiName UpdateAudit
         * @apiGroup Audit
         * @apiDescription Set a full record on track
         *
         * @apiParam (Body x-www) {String} field All fields
         *
         * @apiParam (Param) {String} id Entity unique id.
         * @apiParam (Param) {String} entity Entity type {applications, servers, systems, clients, networks and etc}.
         *
         * @apiPermission JWT Private (MAESTRO_SECRETJWT_PRIVATE)
         * @apiHeader (Header) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 204 OK
         *     {}
         */
        .put('/:entity/:id/:user?', authenticate_private(), PersistenceAudit.update)
        /**
         * @api {patch} /audit/:entity/:id e. Patch record command
         * @apiName PatchAudit
         * @apiGroup Audit
         * @apiDescription Set a partial record on track
         *
         * @apiParam (Body x-www) {String} field All fields
         *
         * @apiParam (Param) {String} id Entity unique id.
         * @apiParam (Param) {String} entity Entity type {applications, servers, systems, clients, networks and etc}.
         *
         * @apiPermission JWT Private (MAESTRO_SECRETJWT_PRIVATE)
         * @apiHeader (Header) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 201 OK
         *     {}
         */
        .patch('/:entity/:id/:user?', authenticate_private(), PersistenceAudit.patch)
        /**
         * @api {delete} /audit/:entity/:id f. Remove record command
         * @apiName RemoveAudit
         * @apiGroup Audit
         * @apiDescription Set a delete record on track
         *
         *
         * @apiParam (Param) {String} id Entity unique id.
         * @apiParam (Param) {String} entity Entity type {applications, servers, systems, clients, networks and etc}.
         *
         * @apiPermission JWT Private (MAESTRO_SECRETJWT_PRIVATE)
         * @apiHeader (Header) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 201 OK
         *     {}
         */
        .delete('/:entity/:id/:user?', authenticate_private(), PersistenceAudit.remove);
};