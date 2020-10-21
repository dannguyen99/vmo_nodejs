import mongoose from 'mongoose';
const { Schema } = mongoose;
import mongoosePaginate from 'mongoose-paginate-v2';

const projectSchema = new Schema({
    name: String,
    description: String,
    projectType: {
        type: Schema.Types.ObjectId,
        ref: 'ProjectType'
    },
    projectStatus: {
        type: Schema.Types.ObjectId,
        ref: 'ProjectStatus'
    },
    techStacks: [{
        type: Schema.Types.ObjectId,
        ref: 'TechStack'
    }],
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    employees : [{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    status: Boolean,
    createdAt: Date,
    updatedAt: Date
});

projectSchema.plugin(mongoosePaginate);
const Project = mongoose.model("Project", projectSchema);

export default Project;