#!/bin/bash
cd ./admin-web-app

git pull

npm install

npm run build

cp -rf build/* ../local-build/cms/

cd ..

git add local-build/cms

git commit -m "build cms"

git push