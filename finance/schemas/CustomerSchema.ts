import * as mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({

  id: {
    type: mongoose.SchemaTypes.ObjectId
  },
  company: {
    type: mongoose.SchemaTypes.String,
    required: false
  },
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  phone: {
    type: mongoose.SchemaTypes.String,
    required: false
  },
  address: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  
});

export default CustomerSchema;