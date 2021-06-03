var https = require('https')
var fs = require('fs')
const path = require('path')
const { parse } = require('url')

const next = require('next')
const port = 443
const app = next({ dev: true })
const handle = app.getRequestHandler()

var options = {
  key: fs.readFileSync('.scripts/certificates/key.pem'),
  cert: fs.readFileSync('.scripts/certificates/cert.pem')
}

app.prepare().then(() => {
  https
    .createServer(options, (req, res) => {
      const parsedUrl = parse(req.url, true)
      handle(req, res, parsedUrl)
    })
    .listen(port, (err) => {
      if (err) throw err
      console.log('🚀 — Ready on https://localhost.web-client.getpocket.com')
    })
})
