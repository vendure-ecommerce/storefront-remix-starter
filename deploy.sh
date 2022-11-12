#!/bin/bash

# format to use:
# ./deploy.sh <cloud run name> <memory>

export ENV_VARS=$(paste -sd, .env)
gcloud run deploy $1 \
            --image "eu.gcr.io/vhdplus-shop/storefront:latest" \
            --region "europe-west1" \
            --platform "managed" \
            --allow-unauthenticated \
            --project=vhdplus-shop \
            --set-env-vars=$ENV_VARS \
            --memory=$2