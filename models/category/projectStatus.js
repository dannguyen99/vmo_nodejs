import mongoose from 'mongoose';
const { Schema } = mongoose;
import mongoosePaginate from 'mongoose-paginate-v2';

const projectStatusSchema = new Schema({
    name: String,
    description: String,
    status: Boolean,
    createdAt: Date,
    updatedAt: Date
});

projectStatusSchema.plugin(mongoosePaginate);
const ProjectStatus = mongoose.model("ProjectStatus", projectStatusSchema);

export default ProjectStatus;