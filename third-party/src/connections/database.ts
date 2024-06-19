import { database, EventSchema } from "../../../libs/ball-com/export";
import ProductSchema from "../../schemas/ProductSchema";
import WarehouseSchema from "../../schemas/WarehouseSchema";

function addDatabaseSchemas() {
    
    //Add schema's for reading database
    database.getReadConnection().model('Warehouse', WarehouseSchema)
    database.getReadConnection().model('Product', ProductSchema)

    //Add event schema for writing database
    database.getWriteConnection().model('Event', EventSchema)
}


export { addDatabaseSchemas };