import * as mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  id: {
    type: mongoose.SchemaTypes.String,
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