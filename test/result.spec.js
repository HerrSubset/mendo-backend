const { assert, expect } = require('chai')
const { Ok, Err } = require('../src/result.js')


describe('The fold method', function() {
    it('uses the succ callback to extract its value from an Ok', function() {
        const res = Ok(3).fold(e => 'error occurred',
                               x => x + 3)
        expect(res).to.equal(6)
    })

    it('uses the err callback to extract its value from an Err', function() {
        const res = Err(3).fold(e => 'error occurred',
                               x => x + 3)
        expect(res).to.equal('error occurred')
    })
})


describe('The map method', function() {
    it('executes the passed method on an Ok', function() {
        const res = Ok(3)
            .map(x => x + 7)
            .fold(e => e,
                  x => x)
        expect(res).to.equal(10)
    })

    it('is not called on Err objects', function() {
        const res = Err('#12345a')
            .map(x => x.slice(10))
            .fold(e => e,
                  x => x)
        expect(res).to.equal('#12345a')
    })
})


describe('The chain method', function() {
    describe('on an Ok object', function() {
        it('passes on the Ok object returned inside the chain callback', function() {
            const res = Ok(3)
                .chain(_ => Ok(20))
                .fold(e => e,
                      x => x)
            expect(res).to.equal(20)
        })

        it('passes on the Err object returned inside the chain callback', function() {
            const res = Ok(3)
                .chain(_ => Ok('ERROR!'))
                .fold(e => e,
                      x => x)
            expect(res).to.equal('ERROR!')
        })
    })

    describe('on an Err object', function() {
        it('ignores the Ok object returned inside the chain callback', function() {
            const res = Err('#abcde4')
                .chain(_ => Ok(20))
                .fold(e => e,
                      x => x)
            expect(res).to.equal('#abcde4')
        })

        it('ignores the Err object returned inside the chain callback', function() {
            const res = Err('#abcde4')
                .chain(_ => Ok('ERROR!'))
                .fold(e => e,
                      x => x)
            expect(res).to.equal('#abcde4')
        })
    })
})
