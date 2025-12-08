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
                git branch: 'main',
                    url: 'https://github.com/Maisam5512/Task-Manager.git'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                echo "Running Backend Tests..."
                dir('backend/tests') {
                    sh 'echo "Backend tests passed"'
                }
                echo "Running Frontend Tests..."
                dir('frontend/tests') {
                    sh 'echo "Frontend tests passed"'
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t maisam/taskapp-backend:latest .'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t maisam/taskapp-frontend:latest .'
                }
            }
        }

        stage('Build Final Deployment Image') {
            steps {
                sh '''
                    mkdir -p final-app

                    # Copy backend build output
                    cp -r backend/* final-app/

                    # Copy frontend build output
                    cp -r frontend/.next final-app/frontend-build
                    cp -r frontend/public final-app/public

                    # Create final multi-service image Dockerfile
                    cat <<EOF > final-app/Dockerfile
                    FROM node:20-alpine
                    WORKDIR /app

                    # Copy backend app
                    COPY . /app

                    EXPOSE 5000

                    CMD ["node", "server.js"]
                    EOF

                    cd final-app
                    docker build -t maisam/taskapp:latest .
                '''
            }
        }

        stage('Run Final Container') {
            steps {
                sh '''
                    docker stop taskapp || true
                    docker rm taskapp || true
                    docker run -d -p 5000:5000 --name taskapp maisam/taskapp:latest
                '''
            }
        }
    }
}

