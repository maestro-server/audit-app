"use strict";

require('app-module-path').addPath(`${__dirname}/../../../app`); 

const _ = require('lodash');
let MongoClient = require("mongodb").MongoClient;
const dbpath = require('core/libs/dbpath')();

module.exports = function (done, conn = dbpath) {
    const strOpts = {
        useUnifiedTopology: true,
        useNewUrlParser: true
      };

    MongoClient.connect(conn, strOpts)
        .then((client) => {
            const db = client.db(dbname, strOpts);
            let pets = db.collection('adminer');

            const data = [
                {
                    "value": {
                        'permissions': {
                            'AWS': {
                                'server-list': [
                                    {
                                        'access': 'describe_instances',
                                        'command': 'ec2',
                                        'entity': 'servers',
                                        'result_path': 'Reservations',
                                        'single_result_path': 'Instances',
                                        'key_comparer': 'datacenters.instance_id',
                                        'vars': [
                                            {
                                                'name': 'MaxResults',
                                                'env': 'MAESTRO_SCAN_QTD',
                                                'default': 200,
                                                'type': 'int'
                                            }
                                        ],
                                        'init_job': true
                                    }
                                ]
                            }
                        }
                    },
                    "key": "connections",
                    "active": true,
                    "updated_at": new Date()
                },
                {
                    "value": {
                        period: ['seconds', 'minutes', 'hours', 'days', 'weeks'],
                        period_type: ['interval', 'cron'],
                        method: ['GET', 'POST', 'PUT', 'DELETE'],
                        modules: ['webhook', 'connections'],
                        configs: [
                            {
                                name: 'connections',
                                description: 'Polling provider',
                                source: 'discovery-app',
                                url: "<url_discovery>/crawler/<provider>/<_id>/<task>",
                                method: 'PUT',
                                options: {
                                    'server-list': {
                                        every: 5,
                                        period: 'minutes'
                                    }
                                }
                            }
                        ]
                    },
                    "key": "scheduler_options",
                    "active": true,
                    "updated_at": new Date()
                }
            ];

            pets.insertMany(data, done);
        });
};
