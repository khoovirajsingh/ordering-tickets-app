import {Publisher, Subjects, TicketCreatedEvent, TicketUpdatedEvent} from "@cygnetops/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}