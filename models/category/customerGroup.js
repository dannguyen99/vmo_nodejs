import mongoose from 'mongoose';
const { Schema } = mongoose;

const customerGroupSchema = new Schema({
    name: String,
    description: String,
    priority:Number,
    status: Boolean,
    createdAt: Date,
    updatedAt: Date
});

const customerGroup = mongoose.model("customerGroup", customerGroupSchema)

export default customerGroup