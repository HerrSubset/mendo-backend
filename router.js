const routes = {}


module.exports = {
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

