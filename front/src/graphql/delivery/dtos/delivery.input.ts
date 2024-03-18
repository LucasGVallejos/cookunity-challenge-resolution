export class RescheduleDeliveryInput {
    idDelivery: number
    rescheduledDate: string

    constructor(_idDelivery: number, _rescheduledDate: string){
        this.idDelivery = _idDelivery
        this.rescheduledDate = _rescheduledDate
    }
}

export class ConfirmDeliveryInput {
    idDelivery: number

    constructor(_idDelivery: number){
        this.idDelivery = _idDelivery
    }
}