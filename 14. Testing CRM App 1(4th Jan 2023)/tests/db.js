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
        await mongoose.connect(uri, mongooseOpt)
    }
}

exports.closeDatabase = async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    if (mongod) await mongod.stop()
}

exports.clearDataBase = async () => {
    const collections = await mongoose.connection.collections
    for (const name in collections) {
        console.log(name)
        const collection = collections[name]
        await collection.deleteMany()
    }
}