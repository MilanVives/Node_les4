const http = require ('http')

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello world')
        res.end()
    }
    if (req.url === '/api/courses'){
        res.write('JSON')
        res.end()
    }
})

server.listen(3000);