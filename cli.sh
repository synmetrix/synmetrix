#!/bin/bash

ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$ROOT_DIR/cli"

if [ ! -d "node_modules" ]; then
  echo "node_modules not found. Running yarn..."
  command -v yarn >/dev/null 2>&1 || { echo "Yarn not found. Please install Yarn."; exit 1; }
  yarn install
fi

./bin/run.js "$@"
