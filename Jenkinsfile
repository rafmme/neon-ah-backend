pipeline {
  agent any
    
  tools {nodejs "NodeJS"}


  environment {
      CI = 'true'
  }
    
  stages {

    stage('Setup Project ENV variables') {
      steps {
        sh 'chmod u+x ./loadEnv.sh'
        sh './loadEnv.sh'
      }
    }
        
    stage('Build: Install Project Dependencies') {
      steps {
        sh 'npm install'
      }
    }
     
    stage('Run Test') {
      steps {
         sh 'npm test'
      }
    }      
  }

  post{
      always{
          echo "** Build Completed **"
      }
      success{
          echo "Result ==> Build was successful"
      }
      failure{
          echo "Result ==> Build Failed"
      }
  }
}
