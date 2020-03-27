const request = require('supertest')
const app = require('../../src/app')
const connections = require('../../src/database/connections')

describe('ONG', () => {
  beforeEach(async () => {
    await connections.migrate.rollback()
    await connections.migrate.latest()
  })

  afterAll(async () => {
    await connections.destroy()
  })

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "APAD",
        email: "contator@gmail.com",
        whatsapp: "4700000000",
        city: "Rio do Sul",
        uf: "SC"
      })

      expect(response.body).toHaveProperty('id')
      expect(response.body.id).toHaveLength(8)
  })
})