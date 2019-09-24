'use strict';

const _ = require('lodash');
const diff = require('deep-object-diff').diff;
const recordTrack = require('./libs/recordTrack');
const diffRightHand = require('./libs/diffRightHand');

const AuditTrack = (PersistenceStorage) => ({entity, entity_id, user}) => {

    const recordTrackCharged = recordTrack(PersistenceStorage);

    return {
        update(odata, ndata) {
            const created = _.isEmpty(odata);
            const body = diff(odata, ndata);
            return recordTrackCharged(body, entity, entity_id, user, created);
        },

        patch(odata, ndata) {
            const body = diffRightHand(ndata, odata);
            return recordTrackCharged(body, entity, entity_id, user);
        },

        remove() {
            const removed = true;
            return recordTrackCharged({removed}, entity, entity_id, user);
        }
    };

};
module.exports = AuditTrack;