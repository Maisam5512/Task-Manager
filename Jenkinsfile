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







// pipeline {
//     agent any

//     stages {

//         stage('Clone Repository') {
//             steps {
//                 git branch: 'main',
//                 url: 'https://github.com/Maisam5512/Task-Manager'
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 dir('frontend') {
//                     sh 'npm ci'
//                 }
//             }
//         }

//         stage('Run Tests') {
//             steps {
//                 dir('frontend/tests') {
//                     sh 'node sample.test.js'
//                 }
//             }
//         }

//         stage('Build Docker Image') {
//             steps {
//                 dir('frontend') {
//                     sh 'docker build -t maisam/taskapp-frontend:latest .'
//                 }
//             }
//         }

//         stage('Run Docker Container') {
//             steps {
//                 sh 'docker stop taskapp-frontend || true'
//                 sh 'docker rm taskapp-frontend || true'
//                 sh 'docker run -d --name taskapp-frontend -p 3000:3000 maisam/taskapp-frontend:latest'
//             }
//         }
//     }

//     post {
//         success {
//             echo 'Build completed successfully!'
//         }
//         failure {
//             echo 'Build failed — check logs.'
//         }
//     }
// }




pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', credentialsId: 'github-https-creds', url: 'https://github.com/Maisam5512/Task-Manager'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t maisam12/frontend-app:latest .'
                }
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker rm -f frontend-container || true'
                sh 'docker run -d --name frontend-container -p 3000:3000 maisam12/frontend-app:latest'
            }
        }
    }
}





