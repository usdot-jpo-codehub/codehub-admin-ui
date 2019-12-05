#!/bin/bash
envsubst '${PROXY_PASS}' < /etc/nginx/nginx.template.conf > /etc/nginx/nginx.conf
nginx -g 'daemon off;'
