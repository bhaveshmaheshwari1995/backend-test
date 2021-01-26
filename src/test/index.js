var expect  = require("chai").expect;
var request = require("request");

describe("Test Cases for Application", function() {

    describe("Test Cases for USER PUT API", function() {
        
        var url = "http://localhost:8001/user/10";
        
        it("returns status 200", function(done) {
            request.put({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     url,
                form:    { "has_depositted":true,"wallet_balance":1000,"number_of_deposits":20}
              },function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        
        it("returns object", function(done) {
            request(url, function(error, response, body) {
                expect(JSON.parse(body)).to.be.an('object');
                done();
            });
        }); 
    });
    
    describe("Test Cases for USER GET API", function() {
        
        var url = "http://localhost:8001/user/10";
        
        it("returns status 200", function(done) {
            request(url, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        
        it("returns object", function(done) {
            request(url, function(error, response, body) {
                expect(body).to.equal('{"has_depositted":"true","wallet_balance":"1000","number_of_deposits":"20"}');
                done();
            });
        });        
    });
    
    describe("Test Cases for validating user", function() {
        
        var url = "http://localhost:8001/checkUser";
        
        it("returns correct response i.e. true", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     url,
                form:    {"expr":"depositted_users AND number_of_deposits > 10 AND wallet_balance > 500 ","user_id":10},
              },function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.equal('{"value":true}');
                done();
            });
        });
        
    });

    describe("Test Cases for USER DELETE API", function() {
        
        var url = "http://localhost:8001/user/10";
        
        it("returns status 200", function(done) {
            request.delete({
                url:     url
            },function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        
        it("returns object", function(done) {
            request(url, function(error, response, body) {
                expect(JSON.parse(body)).to.be.an('object');
                done();
            });
        }); 
    });
    
    
});