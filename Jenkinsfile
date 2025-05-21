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
            dir('game-project') {
                bat 'npm install --legacy-peer-deps'
            }
        }

        stage('Test') {
            dir('game-project') {
                bat 'npm test -- --watchAll=false'
            }
        }

        stage('Build') {
            dir('game-project') {
                bat 'npm run build'
            }
        }

        stage('Deploy to Vercel') {
            withCredentials([string(credentialsId: 'VERCEL_TOKEN', variable: 'VERCEL_TOKEN')]) {
                dir('game-project') {
                    // Aquí va el deploy, usando el token
                    bat 'npx vercel --prod --token %VERCEL_TOKEN%'
                }
            }
        }

        echo '✅ Pipeline ejecutado correctamente. Build exitoso.'
    } catch (e) {
        echo '❌ Error en alguna etapa del pipeline. Revisar los logs.'
        throw e
    } finally {
        echo '📦 Pipeline finalizado (éxito o fallo).'
    }
}
