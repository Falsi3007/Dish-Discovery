const {
    Schema,
    model
} = require("mongoose");

const MySchema = new Schema({
    email: {
        type: String,
        required: true,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
    }
});

const User = model("test", MySchema)

module.exports = User