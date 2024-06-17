import * as mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.String,
        unique: true,
        required: true,
    },
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    price: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    description: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    quantity: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    sellerEmail: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
});

export default ProductSchema;