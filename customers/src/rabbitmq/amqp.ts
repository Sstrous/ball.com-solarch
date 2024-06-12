// Import libs
import config from '../config/config.json';
import Event from '../models/Event';
import * as amqp from 'amqplib';

let channel: amqp.Channel;
let exchangeListeners: { [routingKey: string]: (event: Event) => any } = {};

async function connect(callback: () => void): Promise<void> {
    let connection = await amqp.connect(config.rabbitmq.host, {});
    channel = await connection.createChannel();
    await channel.assertExchange(config.rabbitmq.exchange, 'direct', {durable: true});
    await channel.assertQueue(config.rabbitmq.queue, {durable: true});
    await channel.consume(config.rabbitmq.queue, async msg => {
        if (!msg)
            return;
        try {
            if (exchangeListeners.hasOwnProperty(msg.fields.routingKey)) {
                await exchangeListeners[msg.fields.routingKey](new Event(msg, JSON.parse(msg.content.toString('utf-8'))));
            }
        } catch(err) {
            console.error(err);
        } finally {
            channel.ack(msg);
            callback();
        }
    });
}

async function addExchangeListener(routingKey: string, callback: (event: Event) => any) {
    await channel.bindQueue(config.rabbitmq.queue, config.rabbitmq.exchange, routingKey);
    exchangeListeners[routingKey] = callback;
}

function publish(routingKey: string, obj: object): boolean {
    return channel.publish(config.rabbitmq.exchange, routingKey, Buffer.from(JSON.stringify(obj)));
}

export {
    connect,
    publish,
    addExchangeListener
}