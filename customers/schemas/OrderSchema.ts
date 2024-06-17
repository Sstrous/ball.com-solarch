import * as mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  productIds: {
    type: mongoose.SchemaTypes.Array,
    required: true,
  },
  email: {
    type: mongoose.SchemaTypes.String,
    unique: true,
    required: true,
  },
  paid: {
    type: Boolean,
    required: true,
  },

});

export default OrderSchema;