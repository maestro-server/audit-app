'use strict';

module.exports = function(type) {

    const maps = {
        'txt': 'text/plain',
        'html': 'text/html',
        'css': 'text/css',
        'xml': 'application/xml',
        'json': 'application/json',
        'js': 'application/javascript',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'gif': 'image/gif',
        'png': 'image/png',
        'svg': 'image/svg+xml'
    };

    if(maps[type] !== null && maps.hasOwnProperty(type)) {
        return maps[type];
    }

    return type;
};