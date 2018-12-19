'use strict';

const Access = require('core/entities/accessRole');

const PersistenceServices = require('core/services/PersistenceServices');
const validAccessEmpty = require('core/applications/validator/validAccessEmpty');
const changerUser = require('./transforms/swapUser');


const WrapperPersistenceApp = (Entity) => (ACEntity) => (FactoryPesistenceApp) => (apply) => {

    const PesistenceApp = FactoryPesistenceApp(Entity);

    const factoryWrapper = function(method, access) {
        return (req, res, next) => {
          const {user, params} = req;

          PersistenceServices(ACEntity)
              .findOne(params.id, user, access)
              .then(validAccessEmpty)
              .then((e) => {
                  const newReq = changerUser(req, e, params, ACEntity);
                  PesistenceApp[method](newReq, res, next);
              })
              .catch(next);
        };
    };

    return {
        find (req, res, next) {
            const mtd = apply || 'find';
            factoryWrapper(mtd, Access.ROLE_READ)(req, res, next);
        },

        findOne (req, res, next) {
            const mtd = apply || 'findOne';
            factoryWrapper(mtd, Access.ROLE_READ)(req, res, next);
        },

        create (req, res, next) {
            const mtd = apply || 'create';
            factoryWrapper(mtd, Access.ROLE_WRITER)(req, res, next);
        }
    };

};


module.exports = WrapperPersistenceApp;
