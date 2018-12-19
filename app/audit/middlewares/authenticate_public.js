'use strict';

const analyticsAuth = require('audit/config/auth_conector_public');

module.exports = function () {
    return analyticsAuth().authenticate();
};
