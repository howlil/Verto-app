const user = require('./userRoute');
const kriteria = require('./kriteriaRoute')
const server ={}

server.user = user
server.kriteria = kriteria

module.exports = server