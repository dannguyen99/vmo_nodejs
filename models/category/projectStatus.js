import mongoose from 'mongoose';
const { Schema } = mongoose;

const projectStatusSchema = new Schema({
    name: String,
    description: String,
    status: Boolean,
    createdAt: Date,
    updatedAt: Date
});

const ProjectStatus = mongoose.model("ProjectStatus", projectStatusSchema)

export default ProjectStatus