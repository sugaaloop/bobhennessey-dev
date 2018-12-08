#!/bin/bash
# deploys to app engine
#
# ./deploy.sh $environment $version_name
# $environment : (dev|prod)
# $tag_name : optional - app engine version name

# environment
promote=" --promote"
if [ $1 == "dev" ]; then
    promote=" --promote"
fi

# version
version=$(date +"%Y%m%dt%H%M%S")
if [ -n "$3"  ]; then
    version=${3//./-}
fi

gcloud app deploy $promote --version $version app.yaml
