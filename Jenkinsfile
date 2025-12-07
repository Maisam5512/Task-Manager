pipeline {
  agent any
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Backend: Install') { steps { dir('backend') { sh 'npm ci' } } }
    stage('Frontend: Install & Build') { steps { dir('frontend') { sh 'npm ci && npm run build' } } }
  }
  post { always { echo 'Done' } }
}