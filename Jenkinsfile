pipeline {
  agent any
  tools {
    nodejs 'node-14.18.3'
  }
  options {
    timeout(time: 5, unit: 'MINUTES')
  }
  stages {
    stage('Install dependencies') {
      steps {
        sh 'cd jenkins-tests && npm install'
      }
    }
    stage('Run tests') {
      steps {
        sh 'cd jenkins-tests && ng test --watch=false'
      }
    }
  }
}