FROM node:17-alpine

ENV NODE_ENV "development"

WORKDIR /app

COPY examples/react-klevu-ui/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ADD examples/react-klevu-ui examples/react-klevu-ui
ADD packages/klevu-core packages/klevu-core

WORKDIR /app/packages/klevu-core
RUN npm install
RUN npm run build

WORKDIR /app/examples/react-klevu-ui
RUN npm install
RUN npm run build

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 3002
CMD ["npm", "run", "serve"]