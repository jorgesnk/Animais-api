module.exports = (mode) => {
	const dbName = 'Animais'
	const dbInstance = mode === 'PROD' ? `${dbName}_prod` : `${dbName}_local`
	const port = process.env.MONGO_PORT || 27017
	const url = process.env.MONGO_HOST || `mongodb://localhost:${port}/${dbInstance}`
	const connection = {
		mode,
		port,
		url,
	}
	const options = {
		server: {
			poolSize: 5,
			socketOptions: {
				keepAlive: 1,
			},
		},
	}

	return {
		connection,
		options,
	}
}
