import * as mongoose from "mongoose";

const WarehouseSchema = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.String,
        unique: true,
        required: true,
    },
    address: {
        type: mongoose.SchemaTypes.String,
        required: true,
    }
});

export default WarehouseSchema;