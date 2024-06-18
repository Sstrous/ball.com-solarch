import * as mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.String,
        unique: true,
        required: true,
    },
    customerEmail: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    paymentType: {
        type: mongoose.SchemaTypes.String,
        default: "Direct",
        required: true,
    },
    paid: {
        type: mongoose.SchemaTypes.Boolean,
        default: false,
        required: true,
    }
});

export default InvoiceSchema;