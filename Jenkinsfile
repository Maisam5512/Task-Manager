// pipeline {
//     agent any

//     stages {
//         stage('Clone Repository') {
//             steps {
//                 git branch: 'main',
//                     url: 'https://github.com/Maisam5512/Task-Manager.git'
//             }
//         }

//         stage('Install Dependencies - Backend') {
//             steps {
//                 dir('backend') {
//                     sh 'npm install'
//                 }
//             }
//         }

//         stage('Install Dependencies - Frontend') {
//             steps {
//                 dir('frontend') {
//                     sh 'npm install'
//                 }
//             }
//         }

//         stage('Run Tests') {
//             steps {
//                 echo "Running Unit Tests..."
//                 dir('backend/tests') {
//                     sh 'echo "Backend Tests Running..."'
//                 }
//                 dir('frontend/tests') {
//                     sh 'echo "Frontend Tests Running..."'
//                 }
//             }
//         }

//         stage('Build Docker Image - Backend') {
//             steps {
//                 dir('backend') {
//                     sh 'docker build -t maisam/taskapp-backend:latest .'
//                 }
//             }
//         }

//         stage('Build Docker Image - Frontend') {
//             steps {
//                 dir('frontend') {
//                     sh 'docker build -t maisam/taskapp-frontend:latest .'
//                 }
//             }
//         }

//         stage('Run Backend Container') {
//             steps {
//                 sh 'docker run -d -p 5000:5000 --name backend maisam/taskapp-backend:latest'
//             }
//         }

//         stage('Run Frontend Container') {
//             steps {
//                 sh 'docker run -d -p 3000:3000 --name frontend maisam/taskapp-frontend:latest'
//             }
//         }
//     }
// }







pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Maisam5512/Task-Manager'
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t maisam/frontend-app:latest .'
                }
            }
        }

        stage('Run Frontend Container') {
            steps {
                sh 'docker stop frontend || true'
                sh 'docker rm frontend || true'
                sh 'docker run -d --name frontend -p 3000:3000 maisam/frontend-app:latest'
            }
        }
    }

    post {
        success {
            echo '🎉 Frontend Build Completed Successfully!'
        }
        failure {
            echo '❌ Build Failed. Check console output.'
        }
    }
}



