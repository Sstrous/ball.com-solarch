import * as mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  Id: {
    type: mongoose.SchemaTypes.String,
    unique: true,
    required: true,
  },
  Paid: {
    type: Boolean,
    required: true,
  },

});

export default OrderSchema;