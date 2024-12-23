FROM nginx:mainline-alpine-slim

COPY ./dist /usr/share/nginx/html/
COPY nginx /etc/nginx/conf.d/
