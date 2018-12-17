'use strict';

const {ExtractJwt} = require('passport-jwt');

module.exports = () => {
    const secret = process.env.MAESTRO_SECRETJWT_ANALYTICS;

    return {
        jwtSecret: {
            secretOrKey: secret || 'defaultSecretKey',
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
        },
        jwtSession: {
            session: false
        }
    };
};
