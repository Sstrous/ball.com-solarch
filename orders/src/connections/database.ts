import { database } from "../../../libs/ball-com/export";
import { EventSchema } from "../../../libs/ball-com/models/eventSchema";
import CustomerSchema from "../../schemas/CustomerSchema";
import OrdersSchema from "../../schemas/OrderSchema";

function addDatabaseSchemas() {
    //Add schema's for reading database
    database.getReadConnection().model('Order', OrdersSchema)
    database.getReadConnection().model('Customer', CustomerSchema)

    //Add event schema for writing database
    database.getWriteConnection().model('Event', EventSchema)
}

export { addDatabaseSchemas };