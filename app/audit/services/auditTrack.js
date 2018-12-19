'use strict';


const diff = require('deep-object-diff').diff;
const recordTrack = require('./libs/recordTrack');
const diffRightHand = require('./libs/diffRightHand');

const AuditTrack = (PersistenceStorage) => ({entity, entity_id}) => {

    return {
        update(odata, ndata) {
            const body = diff(odata, ndata)
            return recordTrack(body, entity, entity_id, PersistenceStorage);
        },

        patch(odata, ndata) {
            const body = diffRightHand(ndata, odata)
            return recordTrack(body, entity, entity_id, PersistenceStorage);
        },

        remove() {
            const removed = true;
            return recordTrack({removed}, entity, entity_id, PersistenceStorage);
        }
    }

}
module.exports = AuditTrack;