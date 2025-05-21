node {
    try {
        stage('Checkout') {
            checkout scm
        }
        
        stage('Setup') {
            env.PATH = "${tool 'Node 20'}/bin:${env.PATH}"
            env.CI = 'false'
        }
        
        stage('Install') {
            bat 'npm install --legacy-peer-deps'
        }
        
        stage('Test') {
            bat 'npm test -- --watchAll=false'
        }
        
        stage('Build') {
            bat 'npm run build'
        }
        
        echo '✅ Pipeline ejecutado correctamente. Build exitoso.'
    } catch (e) {
        echo '❌ Error en alguna etapa del pipeline. Revisar los logs.'
        throw e
    } finally {
        echo '📦 Pipeline finalizado (éxito o fallo).'
    }
}