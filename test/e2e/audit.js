'use strict';

require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    request = require('supertest'),
    cleaner_db = require('./libs/cleaner_db'),
    {expect} = chai;

describe('e2e audit', function () {

    let app, mock;

    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHAiOiJzZXJ2ZXItYXBwIiwidmVyc2lvbiI6IjAuNS4xOCIsIm5vYXV0aCI6ImRlZmF1bHRTZWNyZXROb0F1dGhUb2tlbiJ9.mC4C8o7egeyR-az4Tnq2Lq6jv-uIg73OzjSueZdyLfg"

    let apps = [{
        hostname: "Myserver",
        ipv4_private: "127.0.0.1",
        ipv4_public: "127.0.0.1",
        os: {base: 'Linux', dist: 'CentOs', version: "7"},
        cpu: '24',
        memory: '24',
        storage: [{name: '/dev/sda', size: 30, root: "true"}, {name: '/dev/sdb', size: 24}],
        services: [{name: 'Apache', version: '7'}],
        role: 'Application',
        auth: [{name: 'mykey', type: 'PKI', username: 'signorini', key: 'master.pem'}],
        tags: [{key: 'Tager', value: 'ValueTager'}],
    }, {
        name: "MySecondeapplication",
        description: "My app description",
        role: {role: 'Application'},
        family: "DNS",
        thisFieldMustnApper: 'NotApper'
    }];

    let entries = [
        {
           'id': '5d8a25132cf2688fd2407ca6',
           'entity': 'servers'
        },
        {
            'id': '5d8a25132cf2688fd2407ca7',
            'entity': 'applications'
        }
    ]

    before(function (done) {
      cleaner_db([{tb: 'snapshots'}, {tb: 'audits'}], () => {
        app = require('./libs/bootApp')();

        app.once('start', done);
        mock = app.listen(1344);
      }, null);
    });

    after(function (done) {
      mock.close(done);
    });

    /**
    *
    * Checking if the application it's running
    */
    describe('Healthcheck', function () {
      it('Healthcheck', function (done) {
          request(mock)
              .get('/')
              .expect(200)
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });
    });

    /**
    *
    * Create entry
    * @depends create entry
    * @description I like to create a new entry
    */
    describe('create new entry', function () {
      it('Create entry - create servers', function (done) {
          request(mock)
              .post('/audit/'+entries[0]['entity']+'/'+entries[0]['id'])
              .send(apps[0])
              .set('Authorization', `JWT ${token}`)
              .expect(201)
              .expect('Content-Type', /json/)
              .expect(/Myserver/)
              .expect(/_id/)
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });

      it('Create entry - create project without token', function (done) {
          request(mock)
              .post('/audit/'+entries[0]['entity']+'/'+entries[0]['id'])
              .send(apps[0])
              .expect(401)
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });

      it('Create entry - create applications', function (done) {
        request(mock)
            .post('/audit/'+entries[1]['entity']+'/'+entries[1]['id'])
            .send(apps[1])
            .set('Authorization', `JWT ${token}`)
            .expect(201)
            .expect('Content-Type', /json/)
            .expect(/MySecondeapplication/)
            .expect(/_id/)
            .end(function (err) {
                if (err) return done(err);
                done(err);
            });
        });
    });

    /**
    *
    * read entry
    * @depends read entry
    * @description I like to read my entries
    */
    describe('read entry', function () {
        it('read server', function (done) {
            request(mock)
                .get('/audit/'+entries[0]['entity']+'/'+entries[0]['id'])
                .set('Authorization', `JWT ${token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"entity\":\"servers\"/)
                .expect(/Myserver/)
                .expect(/body/)
                .expect(/memory/)
                .expect(/tags/)
                .expect(/tags/)
                .expect(/role/)
                .expect(/tags/)
                .expect(/_id/)
                .expect(/127.0.0.1/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(1);
                })
                .expect(function (res) {
                    Object.assign(entries[0]['entity'], res.body.entity);
                    Object.assign(apps[0], res.body.body);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('read app', function (done) {
            request(mock)
                .get('/audit/'+entries[1]['entity']+'/'+entries[1]['id'])
                .set('Authorization', `JWT ${token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"entity\":\"applications\"/)
                .expect(/MySecondeapplication/)
                .expect(/body/)
                .expect(/family/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(1);
                })
                .expect(function (res) {
                    Object.assign(entries[1]['entity'], res.body.entity);
                    Object.assign(apps[1], res.body.body);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('update new entry', function () {
        it('Update entry - update servers - no changes', function (done) {
            request(mock)
                .put('/audit/'+entries[0]['entity']+'/'+entries[0]['id'])
                .send(apps[0])
                .set('Authorization', `JWT ${token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Update entry - update servers - with changes', function (done) {
            apps[0]['hostname'] = 'Changename'

            request(mock)
                .put('/audit/'+entries[0]['entity']+'/'+entries[0]['id'])
                .send(apps[0])
                .set('Authorization', `JWT ${token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Update entry - update project without token', function (done) {
            request(mock)
                .put('/audit/'+entries[0]['entity']+'/'+entries[0]['id'])
                .send(apps[0])
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Update entry - update applications - no changes', function (done) {
            request(mock)
                .put('/audit/'+entries[1]['entity']+'/'+entries[1]['id'])
                .send(apps[1])
                .set('Authorization', `JWT ${token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

    });

    describe('update new entry', function () {
        it('Patch entry - patch servers - no changes', function (done) {
            request(mock)
                .patch('/audit/'+entries[0]['entity']+'/'+entries[0]['id'])
                .send(apps[0])
                .set('Authorization', `JWT ${token}`)
                .expect('Content-Type', /json/)
                .expect(/\"entity\":\"servers\"/)
                .expect(/Changename/)
                .expect(201)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Patch entry - patch servers - with changes', function (done) {
            apps[0]['hostname'] = 'Changename2'

            request(mock)
                .patch('/audit/'+entries[0]['entity']+'/'+entries[0]['id'])
                .send(apps[0])
                .set('Authorization', `JWT ${token}`)
                .expect('Content-Type', /json/)
                .expect(/\"entity\":\"servers\"/)
                .expect(/Changename2/)
                .expect(201)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Patch entry - patch project without token', function (done) {
            request(mock)
                .patch('/audit/'+entries[0]['entity']+'/'+entries[0]['id'])
                .send(apps[0])
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

    });


    /**
    *
    * checking history
    * @depends read entry
    * @description I like to read my histories
    */
    describe('read entry', function () {
        it('checking history servers', function (done) {
            request(mock)
                .get('/audit/'+entries[0]['entity']+'/'+entries[0]['id'])
                .set('Authorization', `JWT ${token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"entity\":\"servers\"/)
                .expect(/Myserver/)
                .expect(/Changename/)
                .expect(/Changename2/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(3);
                })
                .expect(function (res) {
                    Object.assign(entries[0]['entity'], res.body.entity);
                    Object.assign(apps[0], res.body.body);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('checking history applications', function (done) {
            request(mock)
                .get('/audit/'+entries[1]['entity']+'/'+entries[1]['id'])
                .set('Authorization', `JWT ${token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"entity\":\"applications\"/)
                .expect(/MySecondeapplication/)
                .expect(/body/)
                .expect(/family/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(1);
                })
                .expect(function (res) {
                    Object.assign(entries[1]['entity'], res.body.entity);
                    Object.assign(apps[1], res.body.body);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    /**
    *
    * deleted entry
    * @depends delete entry
    * @description I like to mark a deleted item
    */
    describe('delete servers', function () {
        it('Delete entry - delete server', function (done) {
            request(mock)
                .delete('/audit/'+entries[0]['entity']+'/'+entries[0]['id'])
                .set('Authorization', `JWT ${token}`)
                .expect(201)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Delete entry - delete application', function (done) {
            request(mock)
                .delete('/audit/'+entries[1]['entity']+'/'+entries[1]['id'])
                .set('Authorization', `JWT ${token}`)
                .expect(201)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

    });

    describe('read entry', function () {
        it('checking deleted servers', function (done) {
            request(mock)
                .get('/audit/'+entries[0]['entity']+'/'+entries[0]['id'])
                .set('Authorization', `JWT ${token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"entity\":\"servers\"/)
                .expect(/removed/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(4);
                })
                .expect(function (res) {
                    Object.assign(entries[0]['entity'], res.body.entity);
                    Object.assign(apps[0], res.body.body);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('checking deleted applications', function (done) {
            request(mock)
                .get('/audit/'+entries[1]['entity']+'/'+entries[1]['id'])
                .set('Authorization', `JWT ${token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"entity\":\"applications\"/)
                .expect(/removed/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });
});