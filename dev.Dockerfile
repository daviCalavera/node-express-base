##################################################
# PROJECT BUILDER IMAGE
FROM node:18-alpine AS builder

ARG NODE_ENV=development
ARG APP_SOURCE=/app

# Environment:
ENV NODE_ENV ${NODE_ENV}
ENV PATH ./node_modules/.bin:$PATH
  # to make npm test run only once non-interactively
ENV CI ${CI:-false}

# Volume source dir:
WORKDIR ${APP_SOURCE}
