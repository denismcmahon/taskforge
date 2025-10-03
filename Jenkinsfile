pipeline {
    agent any
    tools {
        nodejs "Node 20"
    }
    stages {
        stage('Install backend') {
            steps {
                sh 'npm install --prefix backend'
            }
        }
        stage('Build Backend') {
            steps {
                sh 'npm run build --prefix backend'
            }
        }
        stage('Install Frontend') {
            steps {
                sh 'npm install --prefix frontend'
            }
        }
        stage('Build Frontend') {
            steps {
                sh 'npm run build --prefix frontend'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test --prefix backend || true'
                sh 'npm run test --prefix frontend || true'
            }
        }
    }
}