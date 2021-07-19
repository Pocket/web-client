var https = require('https')
var http = require('http')
var fs = require('fs')
const { parse } = require('url')
const dev = process.env.AS_PRODUCTION ? false : true //eslint-disable-line

const next = require('next')
const app = next({ dev })
const handle = app.getRequestHandler()

var options = {
  key: fs.readFileSync('./localhost.web-client.getpocket.com-key.pem'),
  cert: fs.readFileSync('./localhost.web-client.getpocket.com.pem')
}

function runServer(req, res) {
  const parsedUrl = parse(req.url, true)
  handle(req, res, parsedUrl)
}

app.prepare().then(() => {
  https.createServer(options, runServer).listen(443, (err) => {
    if (err) throw err
    console.log('🔑 — Secure server at https://localhost.web-client.getpocket.com')
  })

  http.createServer(runServer).listen(80, (err) => {
    if (err) throw err
    console.log('😐 — Regular old server on http://localhost.web-client.getpocket.com')
  })
})
