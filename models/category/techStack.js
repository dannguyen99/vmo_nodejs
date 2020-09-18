import mongoose from 'mongoose';
const { Schema } = mongoose;

const techStackSchema = new Schema({
    name: String,
    description: String,
    status: Boolean,
    createdAt: Date,
    updatedAt: Date
});

const techStack = mongoose.model("techStack", techStackSchema)

export default techStack