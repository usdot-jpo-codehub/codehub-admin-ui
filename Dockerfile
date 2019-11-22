FROM node:8.16.1-jessie as buildimage

WORKDIR /app

COPY . .

RUN npm install
RUN npm install -g @vue/cli

RUN sh ./uswds-init.sh

RUN npm run build

FROM nginx:1.14.1

WORKDIR /app

COPY --from=buildimage /app/dist .

COPY --from=buildimage /app/entrypoint.sh .

COPY nginx.template.conf /etc/nginx

CMD ["/app/entrypoint.sh"]
