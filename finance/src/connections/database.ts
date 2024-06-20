import { EventSchema, database } from "../../../libs/ball-com/export";
import CustomerSchema from "../../schemas/CustomerSchema";
import OrdersSchema from "../../schemas/OrderSchema";

function addDatabaseSchemas() {

    database.getReadConnection().model('Order', OrdersSchema)

    database.getReadConnection().model('Customer', CustomerSchema)

    database.getWriteConnection().model('Event', EventSchema)
}

export { addDatabaseSchemas }