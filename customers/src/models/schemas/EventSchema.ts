import * as mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
timestamp: {
    type: mongoose.SchemaTypes.Date,
    required: true
},

type: {
    type: mongoose.SchemaTypes.String,
    required: true
},

data: {
    type: mongoose.SchemaTypes.String, // json
    required: true
},

customerEmail: {
    type: mongoose.SchemaTypes.String,
    required: true
}
});

export default EventSchema;