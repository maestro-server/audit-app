'use strict';

const privateAuth = require('audit/config/auth_conector_private');

module.exports = function () {
    return privateAuth().initialize();
};
