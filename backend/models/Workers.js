const mongoose = require("mongoose")

const workersSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    image: {type: String}

})

const workersModel = mongoose.model("Worker", workersSchema)

module.exports = workersModel