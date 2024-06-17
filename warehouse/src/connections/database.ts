import { database, EventSchema } from "../../../libs/ball-com/export";
import OrdersSchema from "../../schemas/OrderSchema";
import ProductSchema from "../../schemas/ProductSchema";

function addDatabaseSchemas() {
    
    //Add schema's for reading database
    database.getReadConnection().model('Order', OrdersSchema)
    database.getReadConnection().model('Product', ProductSchema)

    //Add event schema for writing database
    database.getWriteConnection().model('Event', EventSchema)
}


export { addDatabaseSchemas };