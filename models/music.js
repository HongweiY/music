const db = require('./db')
module.exports = {
    addMusic: async music => await db.q('insert into music(title,singer,time,file_lrc,file,uid) values(?,?,?,?,?,?) ', Object.values(music)),
    async updateMusic  
    
}
 