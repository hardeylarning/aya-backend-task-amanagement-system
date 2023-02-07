import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Task is required"]
    },
    userId: {
        type: String,
        required: [true, "User ID is required"]
    },
    status: {
        type: String,
        enum: ["created", "in progress", "completed"],
        default: "created"
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
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