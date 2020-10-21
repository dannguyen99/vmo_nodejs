import mongoose from 'mongoose';
const { Schema } = mongoose;
import mongoosePaginate from 'mongoose-paginate-v2';

const employeeSchema = new Schema({
    name: String,
    dateOfBirth: Date,
    identityNumber: String,
    phoneNumber: String,
    address: String,
    foreignLanguage: [String],
    certificate: [String],
    techStacks: [{
        type: Schema.Types.ObjectId,
        ref: 'TechStack'
    }],
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }],
    status: Boolean,
    createdAt: Date,
    updatedAt: Date
});

employeeSchema.plugin(mongoosePaginate);
const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;