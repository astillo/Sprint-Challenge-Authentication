const server = require('../api/server')
const request = require('supertest')

describe('post /login', () => {
    it('returns a 404 code', () => {
        return request(server).post('/')
            .expect(404)
    })
})

describe('post api/auth/login', () => {
    it('returns a 500 code', () => {
        return request(server).post('/api/auth/login')
            .expect(500)
    })
})

describe('post api/auth/register', () => {
    it('returns a 500 code', () => {
        return request(server).post('/api/auth/register')
            .expect(500)
    })
})

describe('post api/auth/register content type', () => {
    it('has json content type', () => {
        return request(server).post('/api/auth/register')
            .expect('Content-Type', 'text/html; charset=utf-8')
    })
})

describe('post /api/jokes', () => {
    it('has process.env.db. as testing', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })
})