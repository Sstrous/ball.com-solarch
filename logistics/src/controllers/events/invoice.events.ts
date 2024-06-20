import { Event } from "../../../../libs/ball-com/export";

async function invoiceCreatedEvent(event: Event) {
    console.log("Invoice created event")
}

async function invoiceUpdatedEvent(event: Event) {
    console.log("Invoice created event")
}

export {
    invoiceCreatedEvent,
    invoiceUpdatedEvent
}