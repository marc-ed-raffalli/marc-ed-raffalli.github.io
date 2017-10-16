#!/usr/bin/env bash

# TODO: refactor to include node_modules deps in build

VENDORS=assets/vendors

mkdir -p ${VENDORS}/{bootstrap,ionicons,ionicons/css,jquery,popper}

cp    node_modules/bootstrap/dist/{css/bootstrap.min.css,js/bootstrap.min.js} ${VENDORS}/bootstrap/
cp    node_modules/jquery/dist/jquery.slim.min.js                             ${VENDORS}/jquery/
cp    node_modules/popper.js/dist/umd/popper.min.js                           ${VENDORS}/popper/
cp    node_modules/ionicons/dist/css/ionicons.min.css                         ${VENDORS}/ionicons/css/
cp -R node_modules/ionicons/dist/fonts                                        ${VENDORS}/ionicons/
