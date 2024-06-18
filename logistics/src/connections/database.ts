import { database, EventSchema } from "../../../libs/ball-com/export";
import LogisticSchema from "../../schemas/LogisticSchema";
import ProductSchema from "../../schemas/InvoiceSchema";
import InvoiceSchema from "../../schemas/InvoiceSchema";

function addDatabaseSchemas() {
    
    //Add schema's for reading database
    database.getReadConnection().model('Logistic', LogisticSchema)
    database.getReadConnection().model('Invoice', InvoiceSchema)

    //Add event schema for writing database
    database.getWriteConnection().model('Event', EventSchema)
}


export { addDatabaseSchemas };