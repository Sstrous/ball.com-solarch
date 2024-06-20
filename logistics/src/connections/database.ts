import { database, EventSchema } from "../../../libs/ball-com/export";
import LogisticSchema from "../../schemas/LogisticSchema";
import InvoiceSchema from "../../schemas/InvoiceSchema";
import CustomerSchema from "../../schemas/CustomerSchema";

function addDatabaseSchemas() {
    
    //Add schema's for reading database
    database.getReadConnection().model('Logistic', LogisticSchema)
    database.getReadConnection().model('Invoice', InvoiceSchema)
    database.getReadConnection().model('Customer', CustomerSchema)

    //Add event schema for writing database
    database.getWriteConnection().model('Event', EventSchema)
}


export { addDatabaseSchemas };