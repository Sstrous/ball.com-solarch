import * as mongoose from 'mongoose';
import { PaymentTypes } from '../../libs/ball-com/export';

const InvoiceSchema = new mongoose.Schema({

    id: {
        type: mongoose.SchemaTypes.ObjectId,
    },
    price: {
        type: mongoose.SchemaTypes.Decimal128,
        required: true
    },
    customerId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'Customer'
    },
    orderId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'Order'
    },
    paid: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
        default: false,
    },
    PaymentType: {
        type: String,
        enum: Object.values(PaymentTypes),
        required: true
    },
});

export default InvoiceSchema;