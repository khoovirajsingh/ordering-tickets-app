import {TicketCreatedListener} from "../ticket-created-listener";
import {natsWrapper} from "../../../nats-wrapper";
import {TicketCreatedEvent} from "@cygnetops/common";
import {Message} from "node-nats-streaming";
import {Ticket} from "../../../models/ticket";

const setup = async () => {
    const listener = new TicketCreatedListener(natsWrapper.client);
    const data: TicketCreatedEvent['data'] = {
        id: "213", price: 10, title: "fdasf", userId: "234", version: 0
    };
    // @ts-ignore
    const message: Message = {ack: jest.fn()}
    return {listener, data, message};
};

it('creates and saves a ticket', async () => {
    const { listener, data, message } = await setup();
    await listener.onMessage(data, message);

    const ticket = await Ticket.findById(data.id);

    expect(ticket).toBeDefined();
    expect(ticket!.title).toEqual(data.title);
    expect(ticket!.price).toEqual(data.price);
});

it('acks the message', async () => {
    const { data, listener, message } = await setup();

    // call the onMessage function with the data object + message object
    await listener.onMessage(data, message);

    // write assertions to make sure ack function is called
    expect(message.ack).toHaveBeenCalled();
});