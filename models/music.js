const db = require('./db')
module.exports = {
    addMusic: async music => await db.q('insert into music(title,singer,time,file_lrc,file,uid) values(?,?,?,?,?,?) ', Object.values(music)),
    updateMusic:async music => await db.q('update music set title = ?,singer= ?,time= ?,file_lrc= ?,file= ?,uid = ? where id = ?', Object.values(music)),
    
}
 