import request from "supertest";
import {app} from "../../app";
import mongoose from "mongoose";
import {Ticket} from "../../models/ticket";
import {Order} from "../../models/order";
import {OrderStatus} from "@cygnetops/common";

it('returns an error if the ticket does not exist', async () => {
    const ticketId = mongoose.Types.ObjectId();
    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({
            ticketId
        })
        .expect(404);
});

it('returns an error if the ticket is already reserved', async () => {
    const ticket = Ticket.build({
        price: 20, title: "concert"
    });
    await ticket.save();
    const order = Order.build({
        expiresAt:new Date(), status: OrderStatus.Created, ticket, userId: "asdfasgasdfgl"
    });
    await order.save();
    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({
            ticketId: ticket.id
        })
        .expect(400);
});

it('reserves a ticket', async () => {
    const ticket = Ticket.build({
        price: 20, title: "concert"
    });
    await ticket.save();
    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({
            ticketId: ticket.id
        })
        .expect(201);
});