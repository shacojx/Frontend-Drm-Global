#!/bin/bash
cd ./web-app

git pull

npm install

npm run build

cp -rf build/* ../local-build/customer/

cd ..

git add local-build/customer

git commit -m "build customer"

git push