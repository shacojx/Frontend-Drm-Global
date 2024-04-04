#!/bin/bash
cd ./landing

git pull

npm install

npm run build

cp -rf out/* ../local-build/landing/

cd ..

git add local-build/landing

git commit -m "build landing"

git push