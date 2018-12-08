// Stolen from https://cloud.google.com/cloud-build/docs/configure-third-party-notifications
// ...with love

const IncomingWebhook = require('@slack/client').IncomingWebhook;
const SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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";

const webhook = new IncomingWebhook(SLACK_WEBHOOK_URL);

// subscribe is the main function called by Cloud Functions.
module.exports.subscribe = (data, context, callback) => {
  const build = eventToBuild(data.data);
  

// Skip if the current status is not in the status list.
// Add additional statues to list if you'd like:
// QUEUED, WORKING, SUCCESS, FAILURE,
// INTERNAL_ERROR, TIMEOUT, CANCELLED
  const status = ['SUCCESS', 'FAILURE', 'INTERNAL_ERROR', 'TIMEOUT'];
  if (status.indexOf(build.status) === -1) {
    return callback();
  }

  // Send message to Slack.
  const message = createSlackMessage(build);
  webhook.send(message, callback);
  console.log('data: ', data);
  console.log('build: ', build);
  console.log('message: ', message);
};

// eventToBuild transforms pubsub event message to a build object.
const eventToBuild = (data) => {
  return JSON.parse(new Buffer(data, 'base64').toString());
}

// createSlackMessage create a message from a build object.
const createSlackMessage = (build) => {
  let message = {
   text: `Cloud Build Complete`,
    mrkdwn: true,
    attachments: [
      {
        title: build.projectId,
        title_link: build.logUrl,
        fields: [{
          title: 'Status',
          value: build.status
        }]
      }
    ]
  };
  return message
}