#!/bin/bash

GIT_HASH=$(git rev-parse "$GITHUB_SHA")
GIT_HASH=${GIT_HASH:0:7}
export GIT_HASH

need_build_web=false
need_build_server=false

web_folder="apps/web"
server_folder="apps/server"

main_script="cicd/index.sh"
web_script="cicd/web.sh"
server_script="cicd/server.sh"

for i in "${CHANGED_FILES[@]}"; do
  if [[ $i =~ $web_folder || $i == $web_script || $i == $main_script ]]; then
    need_build_web=true
  fi
  if [[ $i =~ $server_folder || $i == $server_script || $i == $main_script ]]; then
    need_build_server=true
  fi
done

if [ "$need_build_web" = true ]; then
  echo Start to build web
  ./cicd/web.sh &
fi

if [ "$need_build_server" = true ]; then
  echo Start to build server
  ./cicd/server.sh &
fi

wait