import * as mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  address: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

export default CustomerSchema;