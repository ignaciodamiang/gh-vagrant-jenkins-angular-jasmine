# Install Webhook Relay
curl https://my.webhookrelay.com/webhookrelay/downloads/install-cli.sh | bash
# read .env file in /vagrant
source /vagrant/.env
# Login to Webhook Relay with .env file
relay login -k $WEBHOOK_RELAY_TOKEN -s $WEBHOOK_RELAY_TOKEN_SECRET
# Create a new bucket
relay forward --bucket github-jenkins http://localhost:8080/github-webhook/
