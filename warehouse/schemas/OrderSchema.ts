import * as mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  id: {
    type: mongoose.SchemaTypes.String,
    unique: true,
    required: true,
  },
  productList: {
    type: mongoose.SchemaTypes.Array,
    required: true,
  },
  customerName: {
    type: mongoose.SchemaTypes.String,
    unique: true,
    required: true,
  },
  cancelled: {
    type: mongoose.SchemaTypes.Boolean,
    required: true,
  },
});

export default OrderSchema;