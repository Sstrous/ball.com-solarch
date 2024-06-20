import * as mongoose from 'mongoose';
import { PaymentTypes } from '../../libs/ball-com/export';

const InvoiceSchema = new mongoose.Schema({

    id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
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
    paymentType: {
        type: PaymentTypes
    }
});

export default InvoiceSchema;