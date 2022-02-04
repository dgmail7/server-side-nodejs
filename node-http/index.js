const http = require('http')
const fs = require('fs')
const path = require('path')

const hostname = 'localhost'
const port = 3000

const server = http.createServer((req, res) => {
    console.log('Request for ' + req.url + ' by method ' + req.method)

    if (req.method == 'GET') {
        // method GET
        var fileUrl;
        if (req.url == '/') fileUrl = '/index.html'
        else fileUrl = req.url
        var filePath = path.resolve('./public' + fileUrl)
        const fileExt = path.extname(filePath)
        if (fileExt == '.html') {
            // html file
            fs.open(filePath, 'r', (err, fd) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        res.statusCode = 404
                        res.setHeader('Content-Type', 'text/html')
                        res.end('<html><body><h1>Error 404: ' + fileUrl + ' not found</h1></body></html>')
                        return
                    }
                    throw err
                }
                res.statusCode = 200
                res.setHeader('Content-Type', 'text/html')
                // optional parameter 'emitClose' is true by default
                // the stream will emit a 'close' event after it has been destroyed
                // add fs.close(filePath) will cause error
                fs.createReadStream('', {fd: fd}).pipe(res)
            })
        } else {
            // not html file
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/html')
            res.end('<html><body><h1>Error 404: ' + fileUrl + ' not an HTML file</h1></body></html>')
        }
    } else {
        // not method GET
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html')
        res.end('<html><body><h1>Error 404: ' + req.method + ' not supported</h1></body></html>')
    }
})

server.listen(port, hostname, () => {
    // back quotes: ` `
    console.log(`Server runnning at http://${hostname}:${port}`)
})