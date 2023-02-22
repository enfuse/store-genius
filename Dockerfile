# build environment
FROM node:14-alpine AS builder

# set environment file based on the argument
ARG BUILD_ENV
ARG MATTERPORT_API_KEY
ARG APP_PASSCODE
ENV ENV_FILE=.env.$BUILD_ENV
ENV MATTERPORT_API_KEY = $MATTERPORT_API_KEY
ENV APP_PASSCODE = $APP_PASSCODE
# copy environment file to container
COPY $ENV_FILE /app/$ENV_FILE
# RUN apt update -y && apt upgrade -y && apt install -y bash
RUN apk add gettext
RUN envsubst '\$MATTERPORT_API_KEY \$APP_PASSCODE' < /app/$ENV_FILE > /app/.env
WORKDIR /app

COPY package*.json ./

RUN npm i
COPY . ./
RUN npm run build

# server environment
FROM nginx:latest
WORKDIR /web
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder app/nginx/templates/default.conf.template /etc/nginx/conf.d/site.conf
# COPY
COPY --from=builder app/dist /usr/share/nginx/html
# To copy env variables later
# COPY --from=builder app/.env.local /usr/share/nginx/html/.env

RUN apt update -y && apt upgrade -y && apt install -y bash

# RUN apt install -y nodejs
# RUN apt install -y npm
# RUN npm install -g runtime-env-cra@0.2.2
# RUN envsubst '\$PORT \$CANDIDATE_SERVICE' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/site.conf

RUN useradd -u 1001 -r -g 0 -d /web -s /sbin/nologin -c "Default User" default
RUN chown -R 1001:0 /usr/share/nginx
RUN chmod -R ug+rwx /usr/share/nginx
RUN chown -R 1001:0 /var/cache/nginx
RUN chmod -R ug+rwx /var/cache/nginx
RUN chown -R 1001:0 /var/run
RUN chmod -R ug+rwx /var/run
USER 1001

ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
# WORKDIR /usr/share/nginx/html
CMD /bin/sh -c "nginx -g 'daemon off;'"
