#!/bin/bash
for i in {0..20}
do
    touch $i.txt
    echo "Haha Vodox $i" > $i.txt
done