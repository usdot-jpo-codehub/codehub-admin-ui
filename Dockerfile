FROM node:8.16.1-jessie as buildimage

ARG OSTYPE
ARG CODEBUILD_GIT_BRANCH
ARG SONAR_TOKEN

WORKDIR /app

COPY . .

RUN npm install
RUN npm install -g @vue/cli
RUN sh ./uswds-init.sh

RUN npm run test:coverage

RUN mkdir -p /root/.sonar/sonar-scanner-4.4.0.2170-linux
RUN rm -rf /root/.sonar/sonar-scanner-4.4.0.2170-linux
RUN mkdir -p /root/.sonar/sonar-scanner-4.4.0.2170-linux
RUN curl -sSLo /root/.sonar/sonar-scanner.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.4.0.2170-linux.zip
RUN unzip /root/.sonar/sonar-scanner.zip -d /root/.sonar/
RUN rm /root/.sonar/sonar-scanner.zip
# for runnning local sonarqube
# RUN /root/.sonar/sonar-scanner-4.4.0.2170-linux/bin/sonar-scanner -Dsonar.projectName=codehub-admin-ui -Dsonar.projectKey=usdot-jpo-codehub_codehub-admin-ui -Dsonar.sources=src,public -Dsonar.host.url=http://[replace-with-local-sonarqube-ipaddress:port] -Dsonar.login=[valid token] -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
RUN /root/.sonar/sonar-scanner-4.4.0.2170-linux/bin/sonar-scanner -Dsonar.organization=usdot-jpo-codehub -Dsonar.projectKey=usdot-jpo-codehub_codehub-admin-ui -Dsonar.sources=src,public -Dsonar.host.url=https://sonarcloud.io -Dsonar.login=${SONAR_TOKEN} -Dsonar.branch.name=${CODEBUILD_GIT_BRANCH} -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info


RUN npm run build

FROM nginx:1.14.1

WORKDIR /app

COPY --from=buildimage /app/dist .

COPY --from=buildimage /app/entrypoint.sh .

COPY nginx.template.conf /etc/nginx

CMD ["/app/entrypoint.sh"]
