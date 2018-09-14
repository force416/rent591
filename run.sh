#!/bin/bash

max=1000000
for (( i=1; i <= $max; ++i ))
do
    /usr/local/bin/node ~/workspace/rent591/src/index.js
    sleep 60
done
