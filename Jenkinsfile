pipeline {
  agent any

  environment {
    BACKEND_DIR = 'backend'
    FRONTEND_DIR = 'frontend'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh "cd ${BACKEND_DIR} && npm ci"
        sh "cd ${FRONTEND_DIR} && npm ci"
      }
    }

    stage('Backend Tests (Jest + Coverage)') {
      steps {
        sh "cd ${BACKEND_DIR} && npm test"
      }
    }

    stage('Build Frontend') {
      steps {
        sh "cd ${FRONTEND_DIR} && npm run build"
      }
    }

    stage('Build Docker Images') {
      steps {
        sh "docker build -t tastecam-backend:latest ${BACKEND_DIR}"
        sh "docker build -t tastecam-frontend:latest ${FRONTEND_DIR}"
      }
    }

    stage('Docker Compose Up (Smoke)') {
      steps {
        sh "docker compose -f docker/docker-compose.yml up -d --build"
        sh 'sleep 10'
      }
    }
  }

  post {
    always {
      sh "docker ps -a"
    }
  }
}

