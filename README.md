[![Code Climate](https://codeclimate.com/github/maestro-server/audit-app/badges/gpa.svg)](https://codeclimate.com/github/maestro-server/audit-app) [![Build Status](https://travis-ci.com/maestro-server/audit-app.svg?branch=master)](https://travis-ci.com/maestro-server/audit-app) [![Issue Count](https://codeclimate.com/github/maestro-server/audit-app/badges/issue_count.svg)](https://codeclimate.com/github/maestro-server/audit-app)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/8ef849b904ca4654a6f09397d8fff85e)](https://www.codacy.com/gh/maestro-server/audit-app/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=maestro-server/audit-app&amp;utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/maestro-server/audit-app/badge.svg?branch=master)](https://coveralls.io/github/maestro-server/audit-app?branch=master)

# Maestro Server #

Maestro Server is an open source software platform for management and discovery servers, apps and system for Hybrid IT. Can manage small and large environments, be able to visualize the latest multi-cloud environment state.

### Demo ###
To test out the demo, [Demo Online](http://demo.maestroserver.io "Demo Online")

## Documentation ##
* [UserGuide](http://docs.maestroserver.io/en/latest/userguide/cloud_inventory/inventory.html "User Guide")
* [API Contract](https://maestro-server.github.io/audit-app/inventory/index.html "API Contract")

# Maestro Server - Audit App #

Audit App is a single application to track and record resources change:

* Track resources changes
* Create a change tree
* Store those data

![arch](http://docs.maestroserver.io/en/latest/_images/audit_arch.png)


**Core API:**

* Core
* Authetication
* Audit

## TechStack ##

* NodeJs 8.11.
* MongoDB 3.6


## Connect to: ##

* Maestro Server App
* Data App

## Setup ##

#### Installation by docker ####

```bash
docker run -p 10900:10900  -e "MAESTRO_MONGO_URI=mongodb://localhost" -e "MAESTRO_MONGO_DATABASE=maestro-audit"  maestroserver/audit-maestro
```
Or by docker-compose

```bash
version: '2'

services:
    audit:
        image: maestroserver/audit-app-maestro
        environment:
        - "MAESTRO_MONGO_URI=mongodb://mongodb"
        - "MAESTRO_MONGO_DATABASE=maestro-audit"
        - "MAESTRO_DATA_URI=http://data:5010"
        depends_on:
        - mongodb
```

#### Dev Env ####

Configure database and port application in .env file

```bash
MAESTRO_PORT=10900
MAESTRO_MONGO_URI='mongodb://localhost'
MAESTRO_MONGO_DATABASE='maestro-audit'
```

Development

Install nodejs, version above 7.6, and mongodb need to be running.

```bash
npm install
npm run server
```

Run all tests or any test type

```bash
mocha test/**/*js --reporter spec

gulp test_e2e
gulp test_unit
gulp eslint
```


### Env variables ###

| Env Variables                        | Example                  | Description                                |
|--------------------------------------|--------------------------|--------------------------------------------|
| MAESTRO_PORT                         | 10900                    |                                            |
| NODE_ENV                             | development|production   |                                            |
| MAESTRO_MONGO_URI                    | mongodb://localhost      | DB string connection                       |
| MAESTRO_MONGO_DATABASE               | maestro-audit            | Database name                              |
| MAESTRO_TIMEOUT                      | 1000                     | Timeout any http private request           |
| MAESTRO_DATA_URI                     | http://localhost:5010    | Data App - API URL                         |
|                                      |                          |                                            |
| MAESTRO_SECRETJWT_PRIVATE            | XXX                      | Secret Key - JWT private connections       |
| MAESTRO_NOAUTH                       | XXX                      | Secret Pass to validate private connections|


### Contribute ###

Are you interested in developing Maestro Server, creating new features or extending them?

We created a set of documentation, explaining how to set up your development environment, coding styles, standards, learn about the architecture and more. Welcome to the team and contribute with us.

[See our developer guide](http://docs.maestroserver.io/en/latest/contrib.html)

### Contact ###

We may be able to resolve support queries via email. [Please send me a message here](https://maestroserver.typeform.com/to/vf6sGR)

### Donate ###

I have made Maestro Server with my heart, think to solve a real operation IT problem. Its not easy, take time and resources.

The donation will be user to:

- Create new features, implement new providers.
- Maintenance libs, securities flaws, and technical points.

<a href="https://www.buymeacoffee.com/9lVypB7WQ" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/purple_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

### Sponsor ###

[<img src="docs/_imgs/jetbrains.png" width="100">](https://www.jetbrains.com/?from=maestroserver) 
