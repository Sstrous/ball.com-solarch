import * as mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema({
  id: {
    type: mongoose.SchemaTypes.String,
    unique: true,
    required: true,
  },
  productList: {
    type: mongoose.SchemaTypes.Array,
    required: true,
  },
  date: {
    type: mongoose.SchemaTypes.Date,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
});

export default OrdersSchema;
