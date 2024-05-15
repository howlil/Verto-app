const user = require('./userRoute');
const kriteria = require('./kriteriaRoute')
const detailKriteria = require('./detailKriteriaRoute')
const alternatif = require('./alternatifRoute')
const penilaian = require('./penilaianRoute')
const analisis = require('./analisisRoute')

const server ={}

server.user = user
server.kriteria = kriteria
server.detailKriteria= detailKriteria
server.alternatif= alternatif
server.penilaian= penilaian
server.analisis= analisis

module.exports = server