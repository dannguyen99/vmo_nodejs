import mongoose from 'mongoose';
const { Schema } = mongoose;

const techStackSchema = new Schema({
    name: String,
    description: String,
    status: Boolean,
    createdAt: Date,
    updatedAt: Date
});

const TechStack = mongoose.model("TechStack", techStackSchema)

export default TechStack