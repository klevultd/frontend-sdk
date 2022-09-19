FROM node:17-alpine

ENV NODE_ENV "development"

WORKDIR /app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ADD . .

RUN rm -f package-lock.json
RUN npm install --force
RUN npm run build

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 3001
CMD ["npm", "run", "serve"]