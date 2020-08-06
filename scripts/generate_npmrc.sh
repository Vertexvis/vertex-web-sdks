#!/bin/bash

set -e

packages=`jq -r '.packages[]' ./lerna.json`
package_directories=($packages)

for package_path in "${package_directories[@]}"; do
  cat > "$package_path/.npmrc" <<EOF
# This file is autogenerated from './scripts/generate_npmrc.sh'. DO NOT EDIT.

@vertexvis:registry=https://registry.npmjs.org/
registry=https://registry.npmjs.org/
EOF
done
