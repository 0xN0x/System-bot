#!/bin/bash

if [[ ! $EUID -eq 0 ]]; then
    exec sudo $0 $@ || echo "System Installation must be run as root user"
    exit 1 # Fail Sudo
fi

[[ -z $OS ]] && OS=$(uname -s)
if [[ $OS =~ ^[^Ll][^Ii][^Nn][^Uu][^Xx] ]]; then
    echo "We do not currently support Installation on non-Linux Operating Systems"
    exit 2 # Fail OS Check
else
    if [[ -f /etc/os-release ]]; then
        [[ -z $linuxReleaseName ]] && linuxReleaseName=$(sed -n 's/^NAME=\(.*\)/\1/p' /etc/os-release | tr -d '"')
        [[ -z $OSVersion ]] && OSVersion=$(sed -n 's/^VERSION_ID=\([^.]*\).*/\1/p' /etc/os-release | tr -d '"')
    elif [[ -f /etc/redhat-release ]]; then
        [[ -z $linuxReleaseName ]] && linuxReleaseName=$(cat /etc/redhat-release | awk '{print $1}')
        [[ -z $OSVersion ]] && OSVersion=$(cat /etc/redhat-release | sed s/.*release\ // | sed s/\ .*// | awk -F. '{print $1}')
    elif [[ -f /etc/debian_version ]]; then
        [[ -z $linuxReleaseName ]] && linuxReleaseName='Debian'
        [[ -z $OSVersion ]] && OSVersion=$(cat /etc/debian_version)
    fi
fi
[[ ! -d ./error_logs/ ]] && mkdir -p ./error_logs >/dev/null 2>&1

packetlist="nodejs-legacy|nodejs|npm";

apt-get install

echo " * MySQL Username";
read uname;
echo " * MySQL Password";
read upass;

echo "CREATE DATABASE IF NOT EXISTS systembot;
CREATE TABLE IF NOT EXISTS systembot.guilds (
  ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  g_id VARCHAR(20),
  prefix VARCHAR(20),
  modprefix VARCHAR(20),
  joinlog VARCHAR(20),
  NSFW VARCHAR(500),
  level INT(1),
  welcome VARCHAR(2000) DEFAULT 'Welcome {{user}} !',
  goodbye VARCHAR(2000) DEFAULT 'Goodbye {{user}} ! :sob:'
);" | mysql -u$uname -p$upass

echo " * Setup complete"
echo
echo "You can now start System with node start in the System folder."
