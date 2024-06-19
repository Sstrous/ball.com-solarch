import * as mongoose from "mongoose";
import { DeliveryStatus } from "../../libs/ball-com/models/interfaces/logistics.interface";

const LogisticSchema = new mongoose.Schema({
  productList: {
    type: mongoose.SchemaTypes.Array,
    required: true,
  },
  name: {
    type: mongoose.SchemaTypes.String,
    unique: true,
    required: true,
  },
  DeliveryStatus: {
    type: mongoose.SchemaTypes.String,
    enum: DeliveryStatus,
    required: true,
  }
});

export default LogisticSchema;