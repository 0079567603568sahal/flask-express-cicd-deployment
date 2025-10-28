🚀 CI/CD Deployment Assignment
This project demonstrates the deployment of a Flask backend and an Express frontend on an Amazon EC2 instance, along with a Jenkins CI/CD pipeline to automate the deployment process.

📘 Part 1: Deploy Flask and Express on a Single EC2 Instance
🎯 Objective
Deploy both the Flask backend and the Express frontend on a single Amazon EC2 instance.

⚙️ Steps
1️⃣ Provisioning the EC2 Instance
Launched an EC2 instance on AWS (Ubuntu 22.04 LTS, free-tier eligible).
Installed required dependencies:
sudo apt update -y
sudo apt install python3 python3-pip -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git
sudo npm install -g pm2
2️⃣ Application Setup

Cloned the repository:

git clone https://github.com//flask-express-cicd-deployment.git

Navigated to each folder and installed dependencies:

Flask Backend
cd terraform-aws-flask-express-deployment/flask-backend pip3 install -r requirements.txt

Express Frontend
cd ../express-frontend npm install

3️⃣ Configure Applications

Flask backend runs on port 5000

Express frontend runs on port 3000

4️⃣ Run Applications Using PM2 pm2 start app.py --name flask-backend --interpreter python3 pm2 start index.js --name express-frontend pm2 save pm2 startup

5️⃣ Verify Deployment

Flask accessible at: 👉 http://:5000 Output:

{"message": "Hello from Flask backend!"}

Express accessible at: 👉 http://:3000 Output:

Express Frontend Hello from Flask backend!

✅ Deliverables

Running EC2 instance with both applications accessible via public IP.

Process managed using PM2.

Backend and frontend running on different ports.

Example architecture:

      ┌────────────────────────────┐
      │        AWS EC2             │
      │                            │
      │  ┌──────────────┐          │
      │  │ Flask Backend│:5000     │
      │  └──────────────┘          │
      │  ┌──────────────┐          │
      │  │ Express Front│:3000     │
      │  └──────────────┘          │
      │                            │
      └────────────────────────────┘
🧩 Part 2: Implement CI/CD Pipeline Using Jenkins 🎯 Objective

Automate the deployment of Flask and Express applications using Jenkins.

⚙️ Steps 1️⃣ Install Jenkins

Installed Jenkins on the same EC2 instance:

curl -fsSL https://pkg.jenkins.io/debian/jenkins.io-2023.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null sudo apt update -y sudo apt install jenkins -y sudo systemctl enable jenkins sudo systemctl start jenkins

Installed essential plugins:

Git Plugin

NodeJS Plugin

Python Plugin

Pipeline Plugin

2️⃣ Configure Jenkins Pipelines

Created two Jenkins pipelines:

Flask-Backend-CI-CD

Express-Frontend-CI-CD

Each pipeline pulls the latest code from GitHub and automates the deployment.

🧠 Pipeline Stages ✅ Flask Pipeline (flask-backend/Jenkinsfile) pipeline { agent any stages { stage('Checkout Code') { steps { git branch: 'main', url: 'https://github.com//flask-express-cicd-deployment.git' } } stage('Install Dependencies') { steps { dir('terraform-aws-flask-express-deployment/flask-backend') { sh ''' echo "Installing Flask dependencies..." python3 -m pip install --break-system-packages -r requirements.txt ''' } } } stage('Run Flask Server') { steps { dir('terraform-aws-flask-express-deployment/flask-backend') { sh ''' echo "Starting Flask backend using PM2..." pm2 delete flask-backend || true pm2 start app.py --name flask-backend --interpreter python3 pm2 save ''' } } } } post { success { echo '✅ Flask backend deployed successfully!' } failure { echo '❌ Deployment failed. Check Jenkins console for errors.' } } }

✅ Express Pipeline (express-frontend/Jenkinsfile) pipeline { agent any stages { stage('Checkout Code') { steps { git branch: 'main', url: 'https://github.com//flask-express-cicd-deployment.git' } } stage('Install Dependencies') { steps { dir('terraform-aws-flask-express-deployment/express-frontend') { sh ''' echo "Installing Express dependencies..." npm install ''' } } } stage('Run Express Server') { steps { dir('terraform-aws-flask-express-deployment/express-frontend') { sh ''' echo "Starting Express frontend using PM2..." pm2 delete express-frontend || true pm2 start index.js --name express-frontend pm2 save ''' } } } } post { success { echo '✅ Express frontend deployed successfully!' } failure { echo '❌ Deployment failed. Check Jenkins console for errors.' } } }

🔁 Triggering the Pipeline

Configured GitHub Webhooks to trigger Jenkins builds automatically on every push to the main branch.

⚡ Optional Enhancements

Added environment variables in Jenkins for sensitive data (e.g., API keys).

Configured PM2 to auto-restart on instance reboot:

pm2 startup pm2 save

Dockerized both apps for consistent environment setup.

✅ Final Deliverables Component Description Status Flask Backend Flask app running on port 5000 ✅ Running Express Frontend Express app running on port 3000 ✅ Running Jenkins Pipeline Automated CI/CD for both Flask & Express ✅ Configured EC2 Instance Hosts Jenkins, Flask, and Express ✅ Active GitHub Integration Automatically triggers builds on commit ✅ Working Evidence Screenshots of Jenkins builds, Docker PS, and browser access ✅ Verified 🖼️ Screenshots (Evidence)

✅ Jenkins Successful Build

✅ Flask Running on Port 5000

✅ Express Frontend Running on Port 3000

✅ Docker Containers Up

✅ PM2 Process List Showing Both Apps
