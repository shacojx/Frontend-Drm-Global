#!/bin/bash
cd ./admin-web-app

# Pull the latest changes from the git repository
git pull

# Install dependencies using Yarn
yarn install

# Build the project using Yarn
yarn build
