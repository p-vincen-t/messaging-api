#!/bin/bash
echo 'Compiling to javascript in dist folder'
tsc
cd dist/
echo 'Copying over .env and package.json'
echo 'Installing dependencies'
npm install

read -p 'Git Command: ' uservar