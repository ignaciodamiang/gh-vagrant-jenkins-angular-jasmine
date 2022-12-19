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
        sh 'npm install'
      }
    }
    stage('Run tests') {
      steps {
        sh 'ng test --watch=false'
      }
    }
  }
}