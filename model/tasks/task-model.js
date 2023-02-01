import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "task body is required"]
    },
    userId: {
        type: String,
        required: [true, "User ID is required"]
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps:true, 
    toJSON: {virtuals:true}
}
);

const Task = mongoose.model("Task", taskSchema);

export default Task; 