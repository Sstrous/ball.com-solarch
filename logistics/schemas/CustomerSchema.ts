import * as mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    address: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
});

export default CustomerSchema;