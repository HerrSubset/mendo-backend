const http = require('http')
const router = require('./router.js')
const teams = require('./teams.json')
const news = require('./news.json')

const hostname = '127.0.0.1'
const port = 3000


router.add('/teams', (_, res) => { 
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(teams))
})
router.add('/news', (_, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(news))
})


const server = http.createServer((req, res) => {
    router.dispatch(req, res)
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})

