#!/bin/bash

cd apps/web

doppler secrets download --project web --config prd --format env --no-file > .env

if [ $? -ne 0 ]; then
  echo "Failed to download .env for web from Doppler."
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