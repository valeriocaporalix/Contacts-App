const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataUploaded = new Schema({
    name: {type: String, required: true},
    surname: {type :String, required: true},
    address: {type: String, required: true},
    phone: {type: Number, required: true},
    email: {type: String, required: true}
});

const Data = mongoose.model("data", DataUploaded);

module.exports = Data;