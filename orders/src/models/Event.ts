import {Message} from "amqplib";

export default class Event {
    constructor(public message: Message, public data: any) {}
}