class Product {
    id: number
    name: string
    image: string
    description: string
}

export class DeliveryItems {
    price: number
    product : Product
}

export class Deliveries {
    id: number
    timeExpected: string
    status: string
    hasToBeRescheduled: boolean
    items: [DeliveryItems]
}