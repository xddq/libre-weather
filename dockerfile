# debian docker image for node 14 LTS
FROM node:16-alpine as node-builder
LABEL maintainer="Pierre Dahmani <git@pierrefhapp.dev>"
ENV TZ=Europe/Berlin
# installs dependencies for cypress
# src: https://docs.cypress.io/guides/continuous-integration/introduction
# apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev \
#     libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
WORKDIR /srv/node
# copy app source over
COPY . .
# installs packages and builds the app
RUN npm ci && npm run build
# starts prod server
CMD [ "npm", "run", "start" ]
# CMD ["tail", "-f", "/dev/null"]

