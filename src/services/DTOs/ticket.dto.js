export default class TicketDto{
    constructor(ticket){
        this.code = ticket.code,
        this.amount = ticket.amount,
        this.date_time = ticket.purchase_datetime
    }
}