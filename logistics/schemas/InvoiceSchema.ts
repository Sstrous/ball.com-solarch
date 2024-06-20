import * as mongoose from "mongoose";
import { PaymentTypes } from "../../libs/ball-com/export";

const InvoiceSchema = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.String,
        unique: true,
        required: true,
    },
    customerName: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    paymentType: {
        type: mongoose.SchemaTypes.String,
        enum: PaymentTypes,
        default: PaymentTypes.Direct,
        required: true,
    },
    paid: {
        type: mongoose.SchemaTypes.Boolean,
        default: false,
        required: true,
    },
});

export default InvoiceSchema;