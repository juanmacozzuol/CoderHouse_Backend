import { ticketModel } from "../../../models/ticket.model.js";

export default class TicketDao{
    async createTicket(ticket){
        return await ticketModel.create(ticket)
    }
}