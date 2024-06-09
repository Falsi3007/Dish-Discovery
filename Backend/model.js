const {
    Schema,
    model
} = require("mongoose");

const MySchema = new Schema({
    task: {
        type: String,
        required: true,
        maxlength: 50
    },
    role: {
        type: String,
        required: true,
        maxlength: 50
    }
});

const TaskModel = model("test", MySchema)

module.exports = TaskModel