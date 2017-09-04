const routes = []


module.exports = {
    add: (route, callback) => routes.push({route: route, callback: callback}),

    dispatch: (req, res) => {
        const { url } = req
        console.log(`Incoming request on ${url}`)

        const route = routes
            .filter(x => x.route === url)
            .shift()

        if (route) {
            route.callback(req, res) 
        } else {
            res.statusCode = 404
            res.end('Oops, 404 not found')
            console.log(`No action found for route ${url}`)
        }
    }
}

