# nginx dockerfile
FROM nginx:latest

LABEL eu.suflet.service: "suflet-nginx"
LABEL eu.suflet.description: "Nginx reverse proxy"


RUN apt-get update && \
    apt-get -f install -y

COPY ./configs/nginx/nginx.conf /etc/nginx/nginx.conf.template

EXPOSE 80 443