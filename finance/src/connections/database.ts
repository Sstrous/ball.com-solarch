import { EventSchema, database } from "../../../libs/ball-com/export";
import CustomerSchema from "../../schemas/CustomerSchema";
import OrdersSchema from "../../schemas/OrderSchema";
import InvoiceSchema from '../../schemas/InvoiceSchema';

function addDatabaseSchemas() {

    // external
    database.getReadConnection().model('Order', OrdersSchema)
    database.getReadConnection().model('Customer', CustomerSchema)
    database.getReadConnection().model('Invoice', InvoiceSchema);

    // self
    database.getWriteConnection().model('Event', EventSchema)
}

export { addDatabaseSchemas }