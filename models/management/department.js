import mongoose from 'mongoose';
const { Schema } = mongoose;
import mongoosePaginate from 'mongoose-paginate-v2';

const departmentSchema = new Schema({
    name: String,
    description: String,
    techStacks: [{
        type: Schema.Types.ObjectId,
        ref: 'TechStack'
    }],
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }],
    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    status: Boolean,
    createdAt: Date,
    updatedAt: Date
});

departmentSchema.plugin(mongoosePaginate);
const Department = mongoose.model("Department", departmentSchema);

export default Department;