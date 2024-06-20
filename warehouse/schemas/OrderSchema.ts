import * as mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  productList: {
    type: mongoose.SchemaTypes.Array,
    required: true,
  },
  customerId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  cancelled: {
    type: mongoose.SchemaTypes.Boolean,
    required: true,
  }
});

export default OrderSchema;