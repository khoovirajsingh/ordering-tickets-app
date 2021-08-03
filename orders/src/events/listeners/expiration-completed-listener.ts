import {Message} from 'node-nats-streaming';
import {
    Subjects,
    Listener,
    TicketCreatedEvent,
    ExpirationCompleteEvent,
    BadRequestError,
    OrderStatus
} from '@cygnetops/common';
import {queueGroupName} from './queue-group-name';
import {Order} from "../../models/order";

export class ExpirationCompletedListener extends Listener<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
    queueGroupName = queueGroupName;

    async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
        const order = await Order.findById(data.orderId);
        if (!order) throw new BadRequestError("No order found");
        order.set({status: OrderStatus.Cancelled, ticket: null});
        msg.ack();
    }
}