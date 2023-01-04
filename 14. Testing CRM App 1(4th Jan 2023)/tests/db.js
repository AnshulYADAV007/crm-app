const { MongoMemoryServer } = require("mongodb-memory-server")
const mongoose = require("mongoose")

let mongod;

exports.connect = async () => {
    if (!mongod) {
        mongod = await MongoMemoryServer.create()
        const uri = mongod.getUri()
        const mongooseOpt = {
            useUnifiedTopology: true,
            maxPoolSize: 10
        }
        mongoose.connect(uri, mongooseOpt)
    }
}

exports.closDatabase = async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    if (mongod) await mongod.stop()
}

exports.clearDataBase = async () => {
    const collections = mongoose.connection.collections
    for (const name in collections) {
        const collection = collections[name]
        collection.deleteMany()
    }
}