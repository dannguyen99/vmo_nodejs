import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const { Schema } = mongoose;

const projectTypeSchema = new Schema({
    name: String,
    description: String,
    priority: Number,
    status: Boolean,
    createdAt: Date,
    updatedAt: Date
});

projectTypeSchema.plugin(mongoosePaginate);

const ProjectType = mongoose.model("ProjectType", projectTypeSchema)

export default ProjectType