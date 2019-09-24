'use strict';

const {Passport} = require('passport');

const {Strategy} = require('passport-jwt');
const config = require('./auth_config_private')();
const PermissionError = require('core/errors/factoryError')('PermissionError');

module.exports = function () {
    const passport = new Passport();

    const strategy = new Strategy(config.jwtSecret, function (payload, done) {

        const {noauth} = payload;

        if (noauth) {
            const slfnoauth = process.env.MAESTRO_NOAUTH || "defaultSecretNoAuthToken";

            if (noauth === slfnoauth) {
                return done(null, payload);
            }
            return done(new PermissionError("Invalid token"), false);
        }

        return done(new PermissionError("Payload MissMatch"), false);

    });

    passport.use(strategy);

    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate("jwt", config.jwtSession);
        }
    };
};
