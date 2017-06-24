const mongoose = require('./config/mongoose')
const mongodb = require('./config/mongodb')()

module.exports = mongoose.connect(mongodb.connection.url, mongodb.options, (err) => {
	console.log('entrou')
	if (err) throw err
})
