#!/bin/bash
#
# Author: Pierre Dahmani
# Created: 16.01.2022
#
# Description: Creates an .env file based on the .env.example file. Makes sure
# the given ENV variables are added into the .env file and starts the server.
# NOTE(pierre): Normally you don't have to touch this file and rather pass env
# variables into your docker run command or your docker-compose file.


echo "Preparing your .env file.."
cp .env.example .env

if [ -n "$IMPRINT_URL" ]; then
    echo "IMPRINT_URL=$IMPRINT_URL" >> .env
fi

if [ -n "$GDPR_URL" ]; then
    echo "GDPR_URL=$GDPR_URL" >> .env
fi

if [ -n "$API_KEY" ]; then
    echo "API_KEY=$API_KEY" >> .env
fi

if [ -n "$BASE_URL" ]; then
    echo "BASE_URL=$BASE_URL" >> .env
fi

if [ -n "$HOST_ADDRESS" ]; then
    echo "HOST_ADDRESS=$HOST_ADDRESS" >> .env
fi

if [ -n "$HOST_PORT" ]; then
    echo "HOST_PORT=$HOST_PORT" >> .env
fi

echo "Preparing .env file done. Starting the server.."
npm run start
