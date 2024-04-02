#!/bin/bash
cd ./landing

git pull

yarn install

yarn build

cp -rf out/* ../local-build/landing/

cd ..

git add local-build/landing

git commit -m "build landing"

git push