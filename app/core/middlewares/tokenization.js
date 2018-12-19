'use strict';

const middleAuth = require('audit/config/auth_conector');

module.exports = function () {
    return middleAuth().initialize();
};
