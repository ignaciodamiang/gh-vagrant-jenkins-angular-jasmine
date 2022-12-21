#!/usr/bin/env bash

export DEBIAN_FRONTEND=noninteractive

# Apache y Vagrant folder
apt-get update
apt-get upgrade -y
apt-get install -y apache2
if ! [ -L /var/www ]; then
  rm -rf /var/www
  ln -fs /vagrant /var/www
fi

# Java, Git y Jenkins
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo tee \
    /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
    https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
    /etc/apt/sources.list.d/jenkins.list > /dev/null
apt-get update
apt-get install -y wget apt-transport-https
mkdir -p /etc/apt/keyrings
wget -O - https://packages.adoptium.net/artifactory/api/gpg/key/public | tee /etc/apt/keyrings/adoptium.asc
echo "deb [signed-by=/etc/apt/keyrings/adoptium.asc] https://packages.adoptium.net/artifactory/deb $(awk -F= '/^VERSION_CODENAME/{print$2}' /etc/os-release) main" | tee /etc/apt/sources.list.d/adoptium.list
apt-get update
apt-get install -y temurin-17-jdk
apt-get install -y git jenkins

# Chrome
sudo apt update && sudo apt -y upgrade
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt -y install ./google-chrome-stable_current_amd64.deb
rm -rf google-chrome-stable_current_amd64.deb

# Run /vagrant/scripts/init.py
python3 /vagrant/scripts/init.py

# Install Webhook Relay
curl https://my.webhookrelay.com/webhookrelay/downloads/install-cli.sh | bash
# Login to Webhook Relay with params
relay login -k your-token-key -s your-token-secret
# read .env file in /vagrant
source /vagrant/.env
# Login to Webhook Relay with .env file
relay login -k $WEBHOOK_RELAY_TOKEN -s $WEBHOOK_RELAY_TOKEN_SECRET