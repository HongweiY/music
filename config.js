const path = require('path');
module.exports = {
    dbConfig: {
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: 'Admin0417',
        database: 'node_music'
    },
    appPort: 8888,
    viewDir: path.resolve('./views'),
    publicDir: path.resolve('./public'),
    uploadDir: path.resolve('./public/upload'),

}