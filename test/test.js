const assert   = require("assert");
const search    = require('../server/routes/search');

const chai 	 = require('chai');
const chaiHttp = require('chai-http');
const should 	 = chai.should();
chai.use(chaiHttp);

const server   = require('../server.js');

describe("search", () => {
	//!\ TEST :
	// - functions
	describe("search functions", () => {
		it("Should have functions: request", () => {
			assert.equal(typeof search.request, 'function');
		});
	});
	//!\ TEST :
	// - implementations
	describe("search implementation", () => {
		//!\ TEST - successful responding:
		// - 200
		it("Should have correct = {status: 200}", (done) => {
			chai.request(server)
            	.post('/api')
            	.send({keyword: ''})
            	.end((err, res) => {
            		res.should.have.status(200);
            		res.body.should.be.a('object');
            		res.body.should.have.property('response');
            		done();
	            });
		});
	});
});

