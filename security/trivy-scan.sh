#!/bin/bash
# 🔐 Trivy Security Scan Script
# Scans Docker image for vulnerabilities

IMAGE=$1
echo "🔍 Running Trivy security scan on: $IMAGE"

# Install Trivy if not present
if ! command -v trivy &> /dev/null; then
    echo "Installing Trivy..."
    apt-get update -y
    apt-get install -y wget apt-transport-https gnupg
    wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | apt-key add -
    echo "deb https://aquasecurity.github.io/trivy-repo/deb generic main" > /etc/apt/sources.list.d/trivy.list
    apt-get update -y
    apt-get install -y trivy
fi

# Run Trivy scan
trivy image \
  --exit-code 0 \
  --severity HIGH,CRITICAL \
  --no-progress \
  --format table \
  "$IMAGE"

echo "✅ Trivy scan completed!"
