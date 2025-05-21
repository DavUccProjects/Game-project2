pipeline {
  agent any

  environment {
    CI = "false" // Desactiva errores por warnings en React
  }

  tools {
    nodejs 'Node 20'
  }

  stages {
    stage('Checkout del repositorio') {
      steps {
        git url: 'https://github.com/DavUccProjects/Game-project2.git', branch: 'main'
      }
    }

    stage('Instalar dependencias') {
      steps {
        bat 'npm install --legacy-peer-deps'
      }
    }

    stage('Ejecutar pruebas unitarias') {
      steps {
        // Si tu proyecto tiene pruebas configuradas
        bat 'npm test -- --watchAll=false'
      }
    }

    stage('Compilar el proyecto') {
      steps {
        bat 'npm run build'
      }
    }
  }

  post {
    success {
      echo '✅ Pipeline ejecutado correctamente. Build exitoso.'
    }

    failure {
      echo '❌ Error en alguna etapa del pipeline. Revisar los logs.'
    }

    always {
      echo '📦 Pipeline finalizado (éxito o fallo).'
    }
  }
}