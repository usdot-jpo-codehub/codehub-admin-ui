#!/bin/bash
docker build -t codehub-admin-ui:latest .
docker run --rm -d -p 8097:80 -e PROXY_PASS_URL=http://localhost:3007/api codehub-admin-ui:latest
