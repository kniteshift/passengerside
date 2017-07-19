const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../build/server/server.js').default
const should = chai.should()

chai.use(chaiHttp)

describe('Blobs', (done) => {
  it('should respond with an object that contains rates from lyft and uber')
    chai.request(server)
      .post('/fetch')
      .send({
	      start_lat: 37.756827,
	      start_lng: -122.488822,
	      end_lat: 37.567093, 
	      end_lng: -122.266926
      })
      .end((err, res) => {
        res.shoud.have.status(200)
        res.should.be.json
        res.body.should.be.a('object')
        res.body.should.have.a.property('lyft')
        res.body.should.have.a.property('uber')
        done()
      })
})
