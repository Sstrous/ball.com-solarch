import { database, EventSchema } from "../../../libs/ball-com/export";
import ProductSchema from "../../schemas/ProductSchema";
import WarehouseSchema from "../../schemas/WarehouseSchema";
import CustomerSchema from "../../schemas/CustomerSchema";

function addDatabaseSchemas() {
    
    //Add schema's for reading database
    database.getReadConnection().model('Warehouse', WarehouseSchema)
    database.getReadConnection().model('Product', ProductSchema)
    database.getReadConnection().model('Customer', CustomerSchema)

    //Add event schema for writing database
    database.getWriteConnection().model('Event', EventSchema)
}


export { addDatabaseSchemas };