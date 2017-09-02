const http = require('http')
const teams = require('./teams.json')

const hostname = '127.0.0.1'
const port = 3000


const router = () => {
    const routes = {}
    return {
        add: (route, callback) => routes[route] = callback,
        dispatch: (req) => {
            const { url } = req
            console.log(`Incoming request on ${url}`)
            if (routes[url]) {
                routes[url]() 
            } else {
                console.log('no action for this url')
            }
        }
    }
}

const routerInstance = router();
routerInstance.add('/teams', _ => { console.log('getting teams')})
routerInstance.add('/news', _ => { console.log('getting news') })


const server = http.createServer((req, res) => {
    
    routerInstance.dispatch(req)
    res.setHeader('Content-Type', 'text/plain')
    res.end(JSON.stringify(teams))
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})

