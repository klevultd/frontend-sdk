# Build and run documentation website for Klevu headless

FROM node:current-alpine

# Create app directory
WORKDIR /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm ci
WORKDIR /usr/src/app/packages/klevu-core
RUN npm run docs
RUN npm install -g http-server
EXPOSE 8080
CMD "http-server" "docs"

