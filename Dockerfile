FROM keymetrics/pm2:8-jessie
MAINTAINER maestro@maestroserver.io

ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /sbin/tini
RUN chmod +x /sbin/tini

# Bundle APP files
WORKDIR /data

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

COPY app/ app/
COPY package.json .
COPY pm2.json .
COPY server.js .

RUN npm install --only=production


ENTRYPOINT ["/sbin/tini","-g","--"]
CMD ["docker-entrypoint.sh"]