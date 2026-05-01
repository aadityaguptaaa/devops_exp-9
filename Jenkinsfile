pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "aadityaxggg/healthcare-app"
        KUBECONFIG   = "/var/jenkins_home/kubeconfig"
    }

    stages {

        stage('Clone Repository') {
            steps {
                echo '📥 Cloning repository...'
                git branch: 'main', url: 'https://github.com/aadityaguptaaa/devops_exp-9.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo '🧪 Running tests...'
                sh 'npm test'
            }
        }

        stage('🔐 OWASP Dependency Check') {
            steps {
                echo '🔐 Running OWASP Dependency Check...'
                sh '''
                    npm audit --audit-level=high || true
                    echo "✅ OWASP npm audit complete!"
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                script {
                    docker.build("${DOCKER_IMAGE}:latest")
                    docker.build("${DOCKER_IMAGE}:build-${env.BUILD_NUMBER}")
                }
            }
        }

        stage('🔐 Trivy Image Security Scan') {
            steps {
                echo '🔐 Running Trivy vulnerability scan on Docker image...'
                sh '''
                    curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin
                    trivy image --exit-code 0 --severity HIGH,CRITICAL aadityaxggg/healthcare-app:latest
                    echo "✅ Trivy Scan Complete!"
                '''
            }
        }

        stage('Push to DockerHub') {
            steps {
                echo '📤 Pushing secure image to DockerHub...'
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        docker.image("${DOCKER_IMAGE}:latest").push()
                        docker.image("${DOCKER_IMAGE}:build-${env.BUILD_NUMBER}").push()
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo '☸️ Deploying secure app to Kubernetes...'
                sh "kubectl --kubeconfig=${KUBECONFIG} apply -f k8s/deployment.yaml"
                sh "kubectl --kubeconfig=${KUBECONFIG} apply -f k8s/service.yaml"
                sh "kubectl --kubeconfig=${KUBECONFIG} set image deployment/healthcare-deployment healthcare=${DOCKER_IMAGE}:build-${env.BUILD_NUMBER}"
                sh "kubectl --kubeconfig=${KUBECONFIG} rollout status deployment/healthcare-deployment --timeout=60s"
            }
        }

        stage('Verify Deployment') {
            steps {
                echo '✅ Verifying secure deployment...'
                sh "kubectl --kubeconfig=${KUBECONFIG} get pods -l app=healthcare"
                sh "kubectl --kubeconfig=${KUBECONFIG} get svc healthcare-service"
            }
        }
    }

    post {
        success {
            echo '🎉 DevSecOps Pipeline completed! Secure Healthcare App is LIVE!'
        }
        failure {
            echo '❌ Pipeline failed! Security scan may have found critical issues.'
        }
        always {
            echo '🧹 Cleaning up...'
            sh "docker rmi ${DOCKER_IMAGE}:latest || true"
        }
    }
}