#!/bin/bash

# Configuration
URL="http://beredskapsplan.192.168.19.13.nip.io/Beredskapsplan/api/intelligence"
LOGFILE="/opt/antigravity/Lokal-Server-setup/healthcheck.log"

timestamp=$(date '+%Y-%m-%d %H:%M:%S')

# Make a request and capture the HTTP status code. Timeout after 20 seconds.
HTTP_STATUS=$(curl -o /dev/null -s -w "%{http_code}" --max-time 20 "$URL")

if [ "$HTTP_STATUS" -ne 200 ]; then
    echo "[$timestamp] WARNING: Beredskapsplan API check failed with status $HTTP_STATUS at $URL. Restarting container..." >> "$LOGFILE"
    cd /opt/antigravity/Lokal-Server-setup && docker compose restart beredskapsplan-app
    echo "[$timestamp] Container restarted successfully." >> "$LOGFILE"
fi
