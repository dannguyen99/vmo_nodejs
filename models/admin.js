import mongoose from 'mongoose';
const { Schema } = mongoose;

const adminSchema = new Schema({
    username: String,
    password: String,
    email: String,
    status: Boolean
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;