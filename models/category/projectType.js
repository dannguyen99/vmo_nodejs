import mongoose from 'mongoose';
const { Schema } = mongoose;

const projectTypeSchema = new Schema({
    name: String,
    description: String,
    priority: Number,
    status: Boolean,
    createdAt: Date,
    updatedAt: Date
});

const projectType = mongoose.model("projectType", projectTypeSchema)

export default projectType