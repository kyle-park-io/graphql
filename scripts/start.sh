#!/bin/bash
cd ..
pm2 start dist/src/main.js --name api
