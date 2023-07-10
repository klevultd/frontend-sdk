FROM node:17-alpine

ENV NODE_ENV "development"

WORKDIR /app

COPY examples/react/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ADD examples/react examples/react
ADD packages/klevu-core packages/klevu-core

WORKDIR /app/packages/klevu-core
RUN npm install
RUN npm run build

WORKDIR /app/examples/react
RUN npm install
RUN npm run build

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 3001
CMD ["npm", "run", "serve"]