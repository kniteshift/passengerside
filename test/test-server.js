const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../build/server/server.js')
const should = chai.should()

chai.use(chaiHttp)

describe('Blobs', () => {
  it('should respond with an object that contains rates from lyft and uber')
    chai.request(server)
      .get('/fetch')
      .end((err, res) => {
        res.shoud.have.status(200)
        done()
      })
})
