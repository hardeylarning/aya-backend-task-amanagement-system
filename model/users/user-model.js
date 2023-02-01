import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Firstname is required"]
    },
    lastname: {
        type: String,
        required: [true, "Lastname is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    }

},
{
    timestamps:true, 
    toJSON: {virtuals:true}
}
);

const User = mongoose.model("User", userSchema);

export default User; 