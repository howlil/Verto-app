const user = require('./userRoute');
const kriteria = require('./kriteriaRoute')
const detailKriteria = require('./detailKriteriaRoute')
const alternatif = require('./alternatifRoute')
const penilaian = require('./penilaianRoute')

const server ={}

server.user = user
server.kriteria = kriteria
server.detailKriteria= detailKriteria
server.alternatif= alternatif
server.penilaian= penilaian

module.exports = server