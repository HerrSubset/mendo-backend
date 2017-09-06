const _ = require('ramda')


/******************************************************************************
* Utilities
******************************************************************************/

const path_array = url => url.split('?')[0].split('/')

// hooray for currying
const url_zip = _.zipWith((route_part, url_part) => ({route_part, url_part}))

const route_matches_url = (route, url) => {
    const route_array = path_array(route)
    const url_array = path_array(url)

    return route_array.length === url_array.length &&
        url_zip(route_array, url_array)
        .every(x => x.route_part === x.url_part || x.route_part.startsWith(':'))
}

const extract_variables = (route, url) => 
    url_zip(path_array(route), path_array(url))
        .filter(x => x.route_part.startsWith(':'))
        .reduce((acc, x) => {
            acc[x.route_part.slice(1)] = x.url_part
            return acc
        }, {})



/******************************************************************************
* Router Object
******************************************************************************/

const templates = []

module.exports = {
    add: (route, callback) => templates.push({route, callback}),

    dispatch: (req, res) => {
        const { url } = req
        console.log(`Incoming request on ${url}`)

        const template = templates
            .filter(x => route_matches_url(x.route, url))
            .shift()

        if (template) {
            template.callback(req, res, extract_variables(template.route, url)) 
        } else {
            res.statusCode = 404
            res.end('Oops, 404 not found')
            console.log(`No action found for route ${url}`)
        }
    }
}

