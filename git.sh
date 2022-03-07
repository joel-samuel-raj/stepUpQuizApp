#!/bin/sh
git checkout $1
git add .
git commit -m "$2"
git status
git push origin $1
echo "Commited $2 to $1 successfully !"