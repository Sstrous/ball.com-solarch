import * as mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema({
  id: {
    type: mongoose.SchemaTypes.String,
    unique: true,
    required: true,
  },
  productId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  amount: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  date: {
    type: mongoose.SchemaTypes.Date,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
});

export default OrdersSchema;
