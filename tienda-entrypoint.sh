#!/bin/bash
set -x;

/bin/bash /entrypoint.sh mysqld > /dev/null 2>&1 &

cp -R ./.env.sample .env;
npm run build;
npm start;