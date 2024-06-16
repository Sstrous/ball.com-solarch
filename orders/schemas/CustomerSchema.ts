import * as mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
});

export default CustomerSchema;