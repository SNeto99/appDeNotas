#!/bin/bash

# npm install

if [ "$ENVIRONMENT" = "dev" ]; then
    export DATABASE_HOST="mariadb"
    npm run dev
else
    export DATABASE_HOST="mariadb"
    npm start
fi
