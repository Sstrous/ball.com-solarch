import * as mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.String,
        unique: true,
        required: true,
    },
    quantity: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
});

export default ProductSchema;