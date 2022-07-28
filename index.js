const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

try {

  const applicationId = core.getInput('application-id');
  const deployKey = core.getInput('deploy-key');
  console.log(`ApplicationId ${applicationId}!`);
  console.log(`DeployKey ${deployKey}!`);

  axios
  .put('https://api-nws.nickorlow.com', {"serviceId": applicationId, "deployKey": deployKey})
  .then(res => {
    console.log(`statusCode: ${res.status}`);
    console.log(res);
  })
  .catch(error => {
    console.error(error);
  });

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}