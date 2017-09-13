const { spy } = require('sinon')
const { assert, expect } = require('chai')
const routing = require('../src/router.js')

describe('a router object', function() {
    describe('with one route /teams/:id', function() {
        let router = routing.createRouter()
        let callback = spy()
        const res = { statusCode: 0, end: _ => {} }

        beforeEach(function() {
            router = routing.createRouter()
            callback = spy()
            router.add('/teams/:id', callback)
        })

        it('should execute the callback when the url is /teams/heren-c', function() {
            router.dispatch({ url: '/teams/heren-c' }, res)
            expect(callback.calledOnce).to.be.true
        })

        it('should execute the callback when the url is /teams/heren-c/', function() {
            router.dispatch({ url: '/teams/heren-c/' }, res)
            expect(callback.calledOnce).to.be.true
        })

        it('should not execute the callback when the url is /team/heren-c', function() {
            router.dispatch({ url: '/team/heren-c' }, res)
            expect(callback.notCalled).to.be.true
        })

        it('should not execute the callback when the url is /teams/', function() {
            router.dispatch({ url: '/teams/' }, res)
            expect(callback.notCalled).to.be.true
        })

        it('should not execute the callback when the url is /teams', function() {
            router.dispatch({ url: '/teams' }, res)
            expect(callback.notCalled).to.be.true
        })
    })

    describe('with a route /teams/:id and /news', function() {
        let router = routing.createRouter()
        let team_callback = spy()
        let news_callback = spy()
        const res = { statusCode: 0, end: _ => {} }

        beforeEach(function() {
            router = routing.createRouter()
            team_callback = spy()
            news_callback = spy()
            router.add('/teams/:id', team_callback)
            router.add('/news', news_callback)
        })

        it('should execute the team callback when the url is /teams/heren-c', function() {
            router.dispatch({ url: '/teams/heren-c' }, res)
            expect(team_callback.calledOnce).to.be.true
            expect(news_callback.notCalled).to.be.true
        })

        it('should execute the team callback when the url is /teams/heren-c/', function() {
            router.dispatch({ url: '/teams/heren-c/' }, res)
            expect(team_callback.calledOnce).to.be.true
            expect(news_callback.notCalled).to.be.true
        })

        it('should not execute the team callback when the url is /team/heren-c', function() {
            router.dispatch({ url: '/team/heren-c' }, res)
            expect(team_callback.notCalled).to.be.true
            expect(news_callback.notCalled).to.be.true
        })

        it('should not execute the team callback when the url is /teams/', function() {
            router.dispatch({ url: '/teams/' }, res)
            expect(team_callback.notCalled).to.be.true
            expect(news_callback.notCalled).to.be.true
        })

        it('should not execute the team callback when the url is /teams', function() {
            router.dispatch({ url: '/teams' }, res)
            expect(team_callback.notCalled).to.be.true
            expect(news_callback.notCalled).to.be.true
        })

        it('should execute the news callback when the url is /news', function() {
            router.dispatch({ url: '/news' }, res)
            expect(news_callback.calledOnce).to.be.true
            expect(team_callback.notCalled).to.be.true
        })
        
        it('should execute the news callback when the ulr is /news/', function() {
            router.dispatch({ url: '/news/' }, res)
            expect(news_callback.calledOnce).to.be.true
            expect(team_callback.notCalled).to.be.true
        })

        it('should not execute the news callback when the ulr is /news/stuff', function() {
            router.dispatch({ url: '/news/stuff' }, res)
            expect(news_callback.notCalled).to.be.true
            expect(team_callback.notCalled).to.be.true
        })

        it('should not execute any callback on a random url', function() {
            router.dispatch({ url: '/random-stuff-here/' }, res)
            expect(news_callback.notCalled).to.be.true
            expect(team_callback.notCalled).to.be.true
        })
    })
})
