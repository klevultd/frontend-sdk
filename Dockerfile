FROM node:17-alpine

ENV NODE_ENV "development"

WORKDIR /app

COPY examples/react/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ADD . .

RUN rm -f package-lock.json
RUN rm -f examples/react/package-lock.json
RUN npm install
RUN npm run build

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 3001
CMD ["npm", "run", "example"]