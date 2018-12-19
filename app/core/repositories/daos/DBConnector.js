'use strict';

const _ = require('lodash');
const {Model} = require('mongorito');


class Dao extends Model {

    updateFull(filter, options) {
        const opts = _.get(options, 'oUpdater', '');
        const opp = `update${opts}Factory`;
        this.set('updated_at', new Date());

        return this[opp](filter, null, options);
    }

    updateAndModify(filter, options) {
        const opts = _.get(options, 'oUpdater', '');
        const opp = `update${opts}Factory`;
        this.set('updated_at', new Date());

        return this[opp](filter, '$set', options);
    }

    updateFactory(entity, entry, options) {

        return this._collection()
            .tap(() => {
                return this._runHooks('before', 'update');
            })
            .then((collection) => {
                const subs = entry ? {[entry]: this.get()} : this.get();
                return collection.update(entity, subs, options);
            })
            .then((e) => {
                return this.isUpdater = e.result;
            })
            .return(this);
    }

}

module.exports = Dao;
