import {OrderCancelledEvent, OrderCreatedEvent, Publisher, Subjects} from "@cygnetops/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}