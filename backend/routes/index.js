const user = require('./userRoute');
const kriteria = require('./kriteriaRoute')
const detailKriteria = require('./detailKriteriaRoute')
const alternatif = require('./alternatifRoute')

const server ={}

server.user = user
server.kriteria = kriteria
server.detailKriteria= detailKriteria
server.alternatif= alternatif

module.exports = server