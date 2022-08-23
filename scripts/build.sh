#!/bin/sh

cd ./ui
yarn
yarn build
cd ../

cd ./server
yarn
yarn package

echo "Executables available at ./server/bin/"
