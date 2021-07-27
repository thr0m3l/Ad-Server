#!/bin/bash

for i in {0..$1}
do
    curl 138.197.71.14:8080/ 
    sleep $2
done