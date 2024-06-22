import { database, EventSchema } from "../../../libs/ball-com/export";
import CustomerSchema from "../../schemas/CustomerSchema";

function addDatabaseSchemas() {
    
    //Add schema's for reading database
    database.getReadConnection().model('Customer', CustomerSchema)

    //Add event schema for writing database
    database.getWriteConnection().model('Event', EventSchema)
}


export { addDatabaseSchemas };