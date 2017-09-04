const _ = require('ramda')


const routes = []

const path_array = url => url.split('?')[0].split('/')

const to_template_url_object = (template, url) => ({template, url})

const template_matches_url = (path_template, url) => {
    const template_path_array = path_array(path_template)
    const url_path_array = path_array(url)

    return template_path_array.length === url_path_array.length &&
    _.zipWith(to_template_url_object, template_path_array, url_path_array)
        .every(x => x.template === x.url || x.template.startsWith(':'))
}

module.exports = {
    add: (route, callback) => routes.push({route: route, callback: callback}),

    dispatch: (req, res) => {
        const { url } = req
        console.log(`Incoming request on ${url}`)

        const route = routes
            .filter(x => template_matches_url(x.route, url))
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

