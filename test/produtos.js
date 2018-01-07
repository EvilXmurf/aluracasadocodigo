var express = require('../config/express')();
var request = require('supertest')(express);
//var database = require('database-cleaner');

describe('#ProdutosController',function(){

    /*beforeEach(function(done){
        var databaseCleaner = new database('mysql');
        databaseCleaner.clean(express.infra.connectionFactory(), function() {
          done();
        });
    });*/

    beforeEach(function(done) {
        var connection = express.infra.connectionFactory();            
        connection.query("delete from produtos", function(ex,result){
            if(!ex){
                done();
            }
        });
        connection.end();
     });

    it('#listagem json',function(done){
        request.get('/produtos')
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        .expect(200,done);
    });

    it('#cadastro de novo produto com dados invalidos', function(done){
        request.post('/produtos')
        .send({titulo: "", descricao: "novo livro"})
        .expect(400, done);
    });

    it('#cadastro de novo produto com dados validos', function(done){
        request.post('/produtos')
        .send({titulo:"titulo",descricao:"novo livro",preco:20.50})
        .expect(302,done);
    });
});

/*var http = require('http');
var assert = require('assert');

describe('#ProdutosController', function(){

    it('listagem json',function(done){
        var configuracoes = {
            hostname: 'localhost',
            port:3000,
            path:'/produtos',
            headers: {
                'Accept' : 'application/json'
            }
        };

        http.get(configuracoes,function(res){
            assert.equal(res.statusCode,200);
            assert.equal(res.headers['content-type'],'application/json; charset=utf-8');
            done();
        });       
    });
});*/