@Library('gsp') _

gspPipelineNodejs (
  team: 'webcreditplatform-151442-team',
  nodejsVersion: '10.14.1',

  getVersionFunc: {
    final DEFAULT_TIMESTAMP = new Date().format("yyMMddHHmmss", TimeZone.getTimeZone('UTC'))
	  return "${LS_GIT_BRANCH_DOCKER_SAFE}-${DEFAULT_TIMESTAMP}.${LS_BUILD_NUMBER}"
	},

  buildArtifactsFunc: {
    sh "npm install @angular-devkit/build-angular@0.1100.5"
    sh "npm i @angular/common@11.0.5 @angular/core@11.0.5 @angular/forms@11.0.5 @angular/material@11.0.4 @angular/cli@11.1.2 @schematics/angular@11.0.5 @schematics/update@0.1100.5"
    sh "npm install"
    sh "npm run test"
    sh "npm run build:prod"
    sh "npm run build:prod1"
    sh "npm run build:uat"
    sh "npm run build:dev"
  },
  
  //blackDuckEnabled: true,
  eneableSonarAnalysis: true,
  sonarCustomParameters: [
    "sonar.sources": "src",
    "sonar.tests": "",
    "sonar.exclusions": "**/*.spec.ts,**/karma.conf.js,**/*e2e*/**/*,**/*node_modules*/**/*,**/*.module.ts,**/*-routing.module.ts",
    "sonar.typescript.lvoc.reportPaths": "coverage/lcov.info",
  ],
  releaseBranchPattern: "master|release.*|dev.*",
  buildImageBranchPattern: "master|release.*|dev.*",
  enablePipelineConfigMap: false,
  getUDeployProcessFunc: { return "Deploy" },
  timeoutMinutes: 60,
  disableStages: [
    //"SonarQube Analysis",
    //"Integration Test",
    //"Deploy Dev"
    // "Publish to UCD",
    // "Deploy UCD"
  ]
)
