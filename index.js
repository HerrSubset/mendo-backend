const http = require('http')
const teams = require('./teams.json')
const news = require('./news.json')

const hostname = '127.0.0.1'
const port = 3000


const router = () => {
    const routes = {}
    return {
        add: (route, callback) => routes[route] = callback,
        dispatch: (req, res) => {
            const { url } = req
            console.log(`Incoming request on ${url}`)
            if (routes[url]) {
                routes[url](req, res) 
            } else {
                res.statusCode = 404
                res.end('Oops, 404 not found')
                console.log(`No action found for route ${url}`)
            }
        }
    }
}

const routerInstance = router();
routerInstance.add('/teams', (_, res) => { 
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(teams))
})
routerInstance.add('/news', (_, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(news))
})


const server = http.createServer((req, res) => {
    routerInstance.dispatch(req, res)
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})

