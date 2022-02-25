# Build and run documentation website for Klevu headless

FROM node:current-alpine

# Create app directory
WORKDIR /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm ci
WORKDIR /usr/src/app/packages/klevu-core
RUN npm run docs
WORKDIR /usr/src/app/docs
RUN npm install
EXPOSE 3000
CMD "npm" "start"

