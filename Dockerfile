##################################################
# PROJECT BUILDER IMAGE
FROM node:16-alpine as Builder

ARG NODE_ENV=production
ARG APP_SOURCE=/tmp/app

# Environment:
ENV NODE_ENV ${NODE_ENV}
ENV PATH ./node_modules/.bin:$PATH
  # to make npm test run only once non-interactively
ENV CI ${CI:-false}

# Prepare directories:
RUN mkdir -p ${APP_SOURCE}

# Bundle WebApp source:
WORKDIR ${APP_SOURCE}
ADD . ${APP_SOURCE}

# Install app deps:
RUN NODE_ENV=development npm ci

# Running tests:
RUN npm run test

# Generate optimize build:
RUN npm run build


##################################################
# DEPLOYMENT IMAGE
FROM node:16-alpine

# Install Alpine deps:
RUN apk --no-cache add ca-certificates

ARG PORT=3000
ARG NODE_ENV=production
ARG APP_DIR=/opt/api

# Environment:
ENV NODE_ENV ${NODE_ENV}
ENV PORT ${PORT}
ENV PATH ./node_modules/.bin:$PATH
  # to make npm test run only once non-interactively
ENV CI ${CI:-false}

# Prepare directories:
RUN mkdir -p ${APP_DIR}

COPY --from=Builder /tmp/app/build ${APP_DIR}
COPY --from=Builder /tmp/app/package.json ${APP_DIR}/package.json

WORKDIR ${APP_DIR}

EXPOSE ${PORT} 443

# Set Command
CMD npm run serve
