const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

try {

  const applicationId = core.getInput('application-id');
  const deployKey = core.getInput('deploy-key');
  console.log(`ApplicationId ${applicationId}!`);
  console.log(`DeployKey ${deployKey}!`);

  axios
  .put('https://api-nws.nickorlow.com/service/update', {"serviceId": applicationId, "deployKey": deployKey})
  .then(res => {
    console.log(`Update Starting via NWS..`);
  })
  .catch(error => {
    core.setFailed(error);
  });
} catch (error) {
  core.setFailed(error.message);
}