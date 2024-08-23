import groovy.json.*

pipeline {
  agent any

  options {
    ansiColor("xterm")
    skipStagesAfterUnstable()
  }
  environment {
    GCR_REPO = "asia.gcr.io/prj-gke-asia-northeast3-3e7d/cp10-front-cms"
    ENV = "${env.GIT_BRANCH}"
    ENV_FILE_CP10_STG = "REACT_APP_MAIN_API=https://cp10-runningball-stg.axolotl18.com"
    ENV_FILE_CP10_DEV = "REACT_APP_MAIN_API=https://cp10-runningball-dev.axolotl18.com"
    ENV_FILE_CP10 = "REACT_APP_MAIN_API=https://cp10-runningball.axolotl18.com"      
  }

  stages {

    stage("Build DEV") {
      when {
        anyOf {
          expression { triggeredByGCPJenkins() }
          expression { triggeredByPR() }
        }
      }
      steps {
        script {
          println "Building the image cp10"
          addUserToGroup()
          docker.withRegistry('https://asia.gcr.io', 'gcr:prj-gke-asia-northeast3'){
          dockerBuild("${ENV_FILE_CP10_DEV}","${env.GIT_COMMIT}-cp10")
        }                                
       }
      }
    }

    stage("Build Stage") {
      when {
        anyOf {
          expression { triggeredByStage() }
          expression { triggeredByPR() }
        }
      }
      steps {
        script {
          println "Building the image stg cp10"
          addUserToGroup()
          docker.withRegistry('https://asia.gcr.io', 'gcr:prj-gke-asia-northeast3'){
          dockerBuild("${ENV_FILE_CP10_STG}","${env.GIT_COMMIT}-cp10-stg")
        }                  
       }
      }
    }     
    stage("Build PROD") {
      when {
        anyOf {
          expression { triggeredByMaster() }
        }
      }
      steps {
        script {
          println "Building the image cp10"
          addUserToGroup()
          docker.withRegistry('https://asia.gcr.io', 'gcr:prj-gke-asia-northeast3'){
          dockerBuild("${ENV_FILE_CP10}","${env.GIT_COMMIT}-cp10-prod")
        }                           
       }
      }
    }
    stage("Stage Push DEV") {
      when {
        anyOf {
          expression { triggeredByGCPJenkins() }
          expression { triggeredByPR() }
        }
      }
      steps {
        script {
          println "Pushing Image to GCR cp10"
          addUserToGroup()
          docker.withRegistry('https://asia.gcr.io', 'gcr:prj-gke-asia-northeast3'){
          dockerPush("${env.GIT_COMMIT}-cp10")
        }        
       }
      }
    }
    stage("Stage Push Stage") {
      when {
        anyOf {
          expression { triggeredByStage() }
        }
      }
      steps {
        script {
          addUserToGroup()
          println "Pushing Image to GCR cp10"
          docker.withRegistry('https://asia.gcr.io', 'gcr:prj-gke-asia-northeast3'){
          dockerPush("${env.GIT_COMMIT}-cp10-stg")
        }        
       }
      }
    }    
    stage("Stage Push PROD") {
      when {
        anyOf {
          expression { triggeredByMaster() }
        }
      }
      steps {
        script {
          addUserToGroup()
          println "Pushing Image to GCR cp10"
          docker.withRegistry('https://asia.gcr.io', 'gcr:prj-gke-asia-northeast3'){
          dockerPush("${env.GIT_COMMIT}-cp10-prod")
        }                              
       }
      }
    }
    stage("Stage Deploy Dev") {
      when {
        anyOf {
          expression { triggeredByGCPJenkins() }
          expression { triggeredByPR() }
        }
      }
      steps {
        script { 
                        println 'Deploy new version to K8S cp10'
                        gcloudKubeconfig()
                        helmUpgrade("cp10-dev","${env.GIT_COMMIT}-cp10")
                    
        }
      }
    }
    stage("Stage Deploy Stage") {
      when {
        anyOf {
          expression { triggeredByStage() }
        }
      }
      steps {
        script {
                        println 'Deploy new version to K8S cp10'
                        gcloudKubeconfig()
                        helmUpgrade("cp10-stg","${env.GIT_COMMIT}-cp10-stg")
        }
      }
    }    
    stage("Stage Deploy Prod") {
      when {
        anyOf {
          expression { triggeredByMaster() }
        }
      }
      steps {
        script {
                        println 'Deploy new version to K8S cp10'
                        gcloudKubeconfig()
                        helmUpgrade("cp10","${env.GIT_COMMIT}-cp10-prod")
        }
      }
    }
    stage('Cleanup') {
      steps {
        cleanWs()
      }
    }
  }
}

// return true if job is trigger by GitHub push to Master Dev
Boolean triggeredByGCPJenkins() {
  return (env.GIT_BRANCH == "dev")
}
// return true if job is trigger by GitHub push to Master stage
Boolean triggeredByStage() {
  return (env.GIT_BRANCH == "stage")
}
// return true if job is trigger by GitHub push to Master branch
Boolean triggeredByMaster() {
  return (env.GIT_BRANCH == "master")
}
// return true if job is trigger by GitHub push to feature branch which has a PR
Boolean triggeredByPR() {
  return (env.CHANGE_ID ? true : false)
}
void addUserToGroup() {
    try {
      sh("sudo usermod -aG docker devops")
      sh("sudo chmod 666 /var/run/docker.sock")
      sh("gcloud auth configure-docker asia.gcr.io")
      sh("docker system prune --force")
      sh("gcloud container clusters get-credentials gke-asia-northeast3-shared --region asia-northeast3 --project prj-gke-asia-northeast3-3e7d --internal-ip")
    } catch(ex) {
      error("addUserToGroup(): failed to build docker image.\nDetails: ${ex.getMessage()}")
    }
  }
void dockerBuild(String env_properties,String tag) {
    def data = "ESLINT_NO_DEV_ERRORS=true\n${env_properties}"
    sh("rm .env")
    writeFile(file: '.env', text: data)
    try {
      sh("sudo docker build -t $GCR_REPO:${tag} .")
    } catch(ex) {
      error("dockerBuild(): failed to build docker image.\nDetails: ${ex.getMessage()}")
    }
}
void dockerPush(String tag) {
    try {
      sh("sudo docker push $GCR_REPO:${tag}")
    } catch(ex) {
      error("dockerBuild(): failed to push docker image.\nDetails: ${ex.getMessage()}")
    }
  }
void helmUpgrade(String namespace,String tag) {
  String nameSpace = namespace
    try {
      sh("helm upgrade --install powerball-cms -f helm/values-${getNamespace("${nameSpace}")}.yaml --set image.tag=${tag} -n ${getNamespace("${nameSpace}")} helm/")
    } catch(ex) {
      error("helmUpgrade(): failed to deploy helm.\nDetails: ${ex.getMessage()}")
    }
  }
void gcloudKubeconfig() {
    try {
    } catch(ex) {
      error("gcloudKubeconfig(): failed to get kubernetes credentials.\nDetails: ${ex.getMessage()}")
    }
  }
String getNamespace(String namespace) {
  if (!namespace) {
    error("getNamespace(): no argument passed.")
  }

  Map namespaces = [:]
  namespaces["cp10-dev"] = "cp10-dev"
  namespaces["cp10-stg"] = "cp10-stg"
  namespaces["cp10"] = "cp10"   

  String namespaceName = namespaces.get(namespace)
  if (!namespaceName) {
    namespaceName = "Unknown"
  }
  return namespaceName
}
