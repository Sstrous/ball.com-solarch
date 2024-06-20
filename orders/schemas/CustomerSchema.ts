import * as mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  id: {
    type: mongoose.SchemaTypes.String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export default CustomerSchema;
