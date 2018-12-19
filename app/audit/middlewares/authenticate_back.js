'use strict';

const analyticsAuth = require('audit/config/auth_conector_analytics');

module.exports = function () {
    return analyticsAuth().authenticate();
};
