var mysql  = require('mysql');

function createDBConnection() {

    console.log("NODE_ENV: " + process.env.NODE_ENV);

    if (!process.env.NODE_ENV || process.env.node === 'dev') {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'casadocodigo_nodejs'
        });
    }

    if(process.env.NODE_ENV == 'test') {
        return mysql.createConnection({
                host:'localhost',
                user:'root',
                password:'',
                database:'casadocodigo_nodejs_test'
        });
    }

    if (process.env.NODE_ENV == 'production') {
        var url = process.env.CLEARDB_DATABASE_URL;
        console.log("CLEARDB_DATABASE_URL: " + process.env.CLEARDB_DATABASE_URL);
        var grupos = url.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?/);
        console.log("grupos: " + grupos);

        return mysql.createConnection({
            host:'us-cdbr-iron-east-05.cleardb.net',
            user:'b6fbb63aa71258',
            password:'a0ead42d',
            database:'heroku_1c62c0431c0df35'
        });
    }
}

module.exports = function() {
    return createDBConnection;
}