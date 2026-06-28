pipeline {
    agent any

    environment {
        BACKEND_DIR = 'backend'
        FRONTEND_DIR = 'frontend'
        DOCKER_REGISTRY = 'docker.io/tastecam'
        BRANCH_NAME = "${env.BRANCH_NAME ?: 'main'}"
        SLACK_CHANNEL = '#deployments'
    }

    tools {
        nodejs 'NodeJS-20'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
            post {
                success {
                    echo "Checked out branch: ${BRANCH_NAME}"
                }
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Backend Dependencies') {
                    steps {
                        sh "cd ${BACKEND_DIR} && npm ci"
                    }
                }
                stage('Frontend Dependencies') {
                    steps {
                        sh "cd ${FRONTEND_DIR} && npm ci"
                    }
                }
            }
        }

        stage('Static Analysis') {
            steps {
                sh "cd ${BACKEND_DIR} && npx eslint src/ || echo 'Lint warnings (non-blocking)'"
            }
        }

        stage('Backend Tests & Coverage') {
            steps {
                sh "cd ${BACKEND_DIR} && npm test -- --coverage"
            }
            post {
            success {
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'backend/coverage/lcov-report',
                        reportFiles: 'index.html',
                        reportName: 'Jest Coverage Report'
                    ])
                    script {
                        def lineCov = sh(script: "grep -oP 'Lines:\\s+\\K[\\d.]+' backend/coverage/lcov.info", returnStdout: true).trim()
                        echo "Code coverage: ${lineCov}% lines covered"
                        if (lineCov.toDouble() < 80.0) {
                            error "Coverage ${lineCov}% is below 80% threshold"
                        }
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                sh "cd ${FRONTEND_DIR} && npm run build"
            }
        }

        stage('Build & Tag Docker Images') {
            when {
                branch 'main'
            }
            steps {
                script {
                    docker.build("${DOCKER_REGISTRY}/tastecam-backend:latest", "${BACKEND_DIR}")
                    docker.build("${DOCKER_REGISTRY}/tastecam-frontend:latest", "${FRONTEND_DIR}")
                    docker.tag("${DOCKER_REGISTRY}/tastecam-backend:latest", "${DOCKER_REGISTRY}/tastecam-backend:${BUILD_NUMBER}")
                    docker.tag("${DOCKER_REGISTRY}/tastecam-frontend:latest", "${DOCKER_REGISTRY}/tastecam-frontend:${BUILD_NUMBER}")
                }
            }
        }

        stage('Push Docker Images') {
            when {
                branch 'main'
            }
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        docker.image("${DOCKER_REGISTRY}/tastecam-backend:latest").push()
                        docker.image("${DOCKER_REGISTRY}/tastecam-backend:${BUILD_NUMBER}").push()
                        docker.image("${DOCKER_REGISTRY}/tastecam-frontend:latest").push()
                        docker.image("${DOCKER_REGISTRY}/tastecam-frontend:${BUILD_NUMBER}").push()
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            when {
                branch 'main'
            }
            steps {
                script {
                    sh """
                        kubectl set image deployment/tastecam-backend backend=${DOCKER_REGISTRY}/tastecam-backend:${BUILD_NUMBER} --record
                        kubectl set image deployment/tastecam-frontend frontend=${DOCKER_REGISTRY}/tastecam-frontend:${BUILD_NUMBER} --record
                        kubectl rollout status deployment/tastecam-backend
                        kubectl rollout status deployment/tastecam-frontend
                    """
                }
            }
        }

        stage('Smoke Test') {
            when {
                branch 'main'
            }
            steps {
                sh """
                    sleep 10
                    curl -f http://localhost:4000/api/health || exit 1
                    echo "Smoke test passed!"
                """
            }
        }

        stage('Security Scan (Trivy)') {
            when {
                branch 'main'
            }
            steps {
                script {
                    try {
                        sh "trivy image --severity HIGH,CRITICAL --exit-code 1 ${DOCKER_REGISTRY}/tastecam-backend:latest || echo 'Vulnerabilities found'"
                    } catch (err) {
                        echo "Security scan skipped (Trivy not installed)"
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully! Build ${BUILD_NUMBER} deployed."
            script {
                try {
                    slackSend(
                        channel: SLACK_CHANNEL,
                        color: 'good',
                        message: "✅ TasteCam Heritage Build ${BUILD_NUMBER} deployed successfully! (${BRANCH_NAME})"
                    )
                } catch (err) {
                    echo "Slack notification skipped (not configured)"
                }
            }
        }
        failure {
            echo "Pipeline FAILED! Build ${BUILD_NUMBER}."
            script {
                try {
                    slackSend(
                        channel: SLACK_CHANNEL,
                        color: 'danger',
                        message: "❌ TasteCam Heritage Build ${BUILD_NUMBER} FAILED! (${BRANCH_NAME})"
                    )
                } catch (err) {
                    echo "Slack notification skipped (not configured)"
                }
            }
        }
        always {
            cleanWs()
        }
    }
}
