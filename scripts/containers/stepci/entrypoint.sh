#!/bin/sh

set +x

EXECUTION_COMMAND="stepci run $1"

REG=".+=.+"
for i in $(env)
do
    if [[ $i =~ $REG ]]; then
        EXECUTION_COMMAND="$EXECUTION_COMMAND -e $i"
    fi
done

eval $EXECUTION_COMMAND