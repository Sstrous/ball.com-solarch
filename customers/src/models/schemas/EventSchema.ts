import * as mongoose from "mongoose";
import {SchemaTypes} from "mongoose";

const EventSchema = new mongoose.Schema({

    timestamp: {
        type: SchemaTypes.Number,
        required: true
    },

    type: {
        type: SchemaTypes.String,
        required: true
    },

    data: {
        type: SchemaTypes.String, // json
        required: true
    },

    email: {
        type: SchemaTypes.String,
        required: true,
        unique: true
    }

});

export {
    EventSchema
}