import express from 'express'
import EventEmitter from 'events'
import winston from 'winston'
import bodyParser from 'body-parser'

export default class WebhookCatcher extends EventEmitter {
  constructor (config) {
    super()
    this.app = express()

    this.app.use(bodyParser.json())

    this.app.post('/webhook/bitbucket/:key/:appName', (req, res) => {
      res.send('ok')

      if (req.params.key === config.bitbucket_key && req.body.push) {
        console.log(JSON.stringify(req.body.push))

        for (let app of config.apps) {
          // console.log(app)
          if (app.name === req.params.appName) {
            this.emit('webhook', { app })
          }
        }
      }
    })

    this.app.use('*', (req, res) => {
      res.sendStatus(404)
    })

    this.server = this.app.listen(process.env.PORT, () => {
      winston.info(`listening on port ${this.server.address().port}`)
    })
  }
}
