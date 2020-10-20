import mongoose from 'mongoose';
import { response } from '../helper/response.js'


const validObjectId = (req, res, next) => {
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
        next()
    }
    else {
        return res.status(400).json(response('Invalid object id', 'INVALID_OBJECT_ID', [], 400))
    }
}

export default validObjectId;