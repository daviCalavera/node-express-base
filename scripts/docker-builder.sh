#!/bin/sh

#Vars:
VERSION=$(git describe --tags --always --dirty)
CONTAINER="api-template"
IMAGE="api-template-image"
set -ex

function build() {
  docker build \
    -f Dockerfile \
    -t $IMAGE:$VERSION . \
    && echo "Container created successfully!!"
}

function runContainer() {
  docker run -it --rm --name $CONTAINER \
    --env-file config/docker/template.env \
    --publish "8080:80" $IMAGE:$VERSION
}

function runCommand() {
  CONTAINER_EXIST="$(docker ps -a -q -f name=$CONTAINER)"
  if [ ! $CONTAINER_EXIST ]; then
    # Container doesn't exist, run container and command
    runContainer "$1"
  else
    # Container running, run command inside container
    docker exec -it "$CONTAINER" bash -c "$1"
  fi
}

if [ -z "$1" ]; then
  echo "Function name is required";
fi

# Execute function
$1