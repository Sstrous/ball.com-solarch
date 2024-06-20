import * as mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  id: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  company: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  phone: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  address: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

export default CustomerSchema;