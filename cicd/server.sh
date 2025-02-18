#!/bin/bash

cd apps/server

doppler secrets download --project server --config prd --format env --no-file > .env

if [ $? -ne 0 ]; then
  echo "Failed to download .env for server from Doppler."
fi

deployment_status=n/a

if flyctl deploy --config deployments/$FLY_ENV.fly.toml \
  --build-arg GIT_HASH_ARG=$GIT_HASH \
  -e SOURCE_VERSION=$GIT_HASH; then
  deployment_status=succeeded
else
  deployment_status=failed
fi

echo "Deployment status: $deployment_status"