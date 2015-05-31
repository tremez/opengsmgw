#!/bin/bash
apt-get install libudev-dev nodejs npm
sudo npm install
sudo npm -g install pm2
sudo pm2 startup ubuntu
sudo pm2 start server/server.js
sudo pm2 save
