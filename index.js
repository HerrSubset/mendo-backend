const http = require('http')
const routing = require('./router.js')
const teams = require('./teams.json')
const news = require('./news.json')


/******************************************************************************
* Utilities
******************************************************************************/

const json_response = (res, obj) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(obj))
}

const sluggify = x => 
    x.toLowerCase().replace(/\s/, '-')



/******************************************************************************
* Routes
******************************************************************************/

const router = routing.createRouter()

router.add('/teams', (_, res) => { 
    json_response(res, teams)
})
router.add('/teams/:slug', (_, res, variables) => {
    const team = teams.teams
        .filter(team => sluggify(team.name) === variables.slug)
        .shift()
    
    if (team) { 
        json_response(res, team)
    } else {
        res.setHeader('Content-Type', 'text/plain')
        res.statusCode = 404
        res.end(`No team with slug ${variables.slug}`)
    }
})
router.add('/news', (_, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(news))
})



/******************************************************************************
* Server Setup
******************************************************************************/

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
    router.dispatch(req, res)
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})

