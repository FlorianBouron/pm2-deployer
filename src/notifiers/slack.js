import Slack from 'node-slack'

export default class SlackNotifier {
  constructor (config) {
    if (config.slack) {
      this.slack = new Slack(config.slack.hook_url)
    } else {
      this.slack = null
    }
  }

  success (app) {
    if (!this.slack) {
      return
    }
    this.slack.send({
        text: 'Application ' + app.name + ' has been sucessfully deployed. It is available at url ' + app.url,
        channel: config.channel,
        username: config.name
    })
  }

  error (app) {
    if (!this.slack) {
      return
    }
    this.slack.send({
        text: 'Error during deploying application ' + app.name,
        channel: config.channel,
        username: config.name
    })
  }


}