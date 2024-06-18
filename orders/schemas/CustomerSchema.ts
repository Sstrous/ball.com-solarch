import * as mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  id: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
});

export default CustomerSchema;