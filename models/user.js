const db = require('./db')
module.exports = {
    getUsers: async () => await db.q('select * from users', []),
    checkUsername: async username => await db.q('select 1 from users where username = ?', username),
    register: async (...user) => await db.q('insert into users (username,password,email) values(?,?,?)', user),
    login: async username => await db.q('select * from users where username = ?', username)


}