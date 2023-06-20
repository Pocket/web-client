var fs = require('fs')
const { parse } = require('url')
const dev = process.env.AS_PRODUCTION ? false : true //eslint-disable-line

const pocketLocal = process.env.AS_POCKET_LOCAL ? true : false //eslint-disable-line

const next = require('next')
const app = next({ dev })
const handle = app.getRequestHandler()

function runServer(req, res) {
  const parsedUrl = parse(req.url, true)
  handle(req, res, parsedUrl)
}

if (!pocketLocal) {
  var https = require('https')
  var options = {
    key: fs.readFileSync('./localhost.web-client.getpocket.com-key.pem'),
    cert: fs.readFileSync('./localhost.web-client.getpocket.com.pem')
  }

  app.prepare().then(() => {
    https.createServer(options, runServer).listen(443, (err) => {
      if (err) throw err
      console.info('🌐  Ready at: https://localhost.web-client.getpocket.com')
    })
  })
} else {
  var http = require('http')
  app.prepare().then(() => {
    http.createServer({}, runServer).listen(8976, (err) => {
      if (err) throw err
      console.info('🌐  Ready at: https://web-client.getpocket.local')
      console.info('🌐  Also at: http://localhost:8976')
    })
  })
}
