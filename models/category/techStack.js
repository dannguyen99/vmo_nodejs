import mongoose from 'mongoose';
const { Schema } = mongoose;
import mongoosePaginate from 'mongoose-paginate-v2';

const techStackSchema = new Schema({
    name: String,
    description: String,
    status: Boolean,
    createdAt: Date,
    updatedAt: Date
});

techStackSchema.plugin(mongoosePaginate);
const TechStack = mongoose.model("TechStack", techStackSchema);

export default TechStack;