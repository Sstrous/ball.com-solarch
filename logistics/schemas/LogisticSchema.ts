import * as mongoose from "mongoose";
import { DeliveryStatus } from "../../libs/ball-com/models/interfaces/logistics.interface";

const LogisticSchema = new mongoose.Schema({
  productList: {
    type: mongoose.SchemaTypes.Array,
    required: true,
  },
  customerEmail: {
    type: mongoose.SchemaTypes.String,
    unique: true,
    required: true,
  },
  cancelled: {
    type: mongoose.SchemaTypes.Boolean,
    required: true,
  },
  DeliveryStatus: {
    type: mongoose.SchemaTypes.String,
    enum: DeliveryStatus,
    required: true,
  }
});

export default LogisticSchema;