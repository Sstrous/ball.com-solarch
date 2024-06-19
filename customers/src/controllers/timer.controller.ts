import * as cron from "node-cron";
import * as https from "https";
import * as csv from "csv";
import Config from "../../../libs/ball-com/config/config.json";
import { database, amqp, customerRoutes, Customer } from "../../../libs/ball-com/export";

async function startCron() {
    cron.schedule("0 0 * * *", async () => {
        console.log("Running task every day at midnight");
        await GetData();
      });
  }

async function GetData() {
    https.get(Config.customer_database, (response) => {
        if (response.statusCode !== 200) {
            console.log("Error " + response.statusCode)
          return;
        }
        let totaldata = "";
        response.on("data", (data) => {
          totaldata += data;
        });
        response.on("end", () =>
        csv.parse(
            totaldata,
            {
              columns: true,
              skip_records_with_error: true,
              skip_empty_lines: true,
              delimiter: ',',
            },
            async (err, parsed) => {
                let length = 0
                parsed.forEach((_: any) => length++)
                console.log(length + " customers loaded")
              if (err) {
                console.log(err.message);
                return;
              }
    
              let i = 0;
              for (let line of parsed) {
                i++;
                let customer:Customer = {
                    id: ''+i,
                    name: line['First Name'] + ' ' + line['Last Name'],
                    phone: line['Phone Number'],
                    address: line['Address'],
                    company: line['Company Name']
                }
                
                if (!await database.getModel("Customer").findOne({id: customer.id})) {
                    await database.storeEvent(customerRoutes.created, customer, customer.id);
                    amqp.publish(customerRoutes.created, customer);
                }
              }
            }
          ));
      });
}


export {
    startCron
}