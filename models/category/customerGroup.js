import mongoose from 'mongoose';
const { Schema } = mongoose;
import mongoosePaginate from 'mongoose-paginate-v2';

const customerGroupSchema = new Schema({
    name: String,
    description: String,
    priority:Number,
    status: Boolean,
    createdAt: Date,
    updatedAt: Date
});

customerGroupSchema.plugin(mongoosePaginate)
const CustomerGroup = mongoose.model("CustomerGroup", customerGroupSchema)

export default CustomerGroup