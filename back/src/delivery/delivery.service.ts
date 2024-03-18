import { Inject, Service } from "typedi";
import { Delivery } from "./delivery.entity";
import { DeliveryRepositoryInterface } from "./interfaces/delivery.repository.interface";
import { DeliveryStatus } from "../enums/delivery.status";
import { isHoliday, parseStringToDate } from "../helpers/dateHelper";
import { DeliveryItemService } from "../delivery_item/delivery_item.service";
import { DeliveryItem } from "../delivery_item/delivery_item.entity";
@Service('delivery-service')
export class DeliveryService {
    constructor(
        @Inject('delivery-repository') private readonly deliveryRepository: DeliveryRepositoryInterface,
        @Inject('delivery_item-service') private readonly deliveryItemService: DeliveryItemService
    ) {}

    async findDeliveryById(idDelivery: number): Promise<Delivery | null> {
        return await this.deliveryRepository.findOneByCondition({where: {id: idDelivery}})
    }

    async findAllDeliveries(): Promise<Delivery[]> {
        const deliveries = await this.deliveryRepository.findAll({order: {timeExpected: 'ASC'}});
        return deliveries.map((delivery)=> {
            const date = parseStringToDate(delivery.timeExpected);
            delivery.hasToBeRescheduled = isHoliday(date);
            delivery.timeExpected = date
            return delivery
        })
    }

    async confirmDelivery(idDelivery: number) : Promise<Delivery | null> {
        const delivery = await this.findDeliveryById(idDelivery);
        if(delivery){
            delivery.status = DeliveryStatus.CONFIRMED
            await this.deliveryRepository.update(delivery);
            console.log(`The Delivery ${idDelivery} has been confirmed`)
        }
        return delivery;
    }

    async rescheduleDelivery(idDelivery: number, newTimeExpected: string) : Promise<Delivery | null>{
        const delivery = await this.findDeliveryById(idDelivery);
        if(delivery){
            delivery.timeExpected = newTimeExpected;
            // Update the delivery
            await this.deliveryRepository.update(delivery);

            const items = await this.deliveryItemService.findAllDeliveriesItemsForDelivery(idDelivery)

            // Update prices of associated DeliveryItems
            const updatedItems = await Promise.all(items.map(async (itemDelivery) => {
                const product = await itemDelivery.productConnection;
                if(product){
                    return {
                        ...itemDelivery,
                        price: product.price
                    }
                }
                return itemDelivery
            }));
            
            await this.deliveryItemService.updateDeliveriesItems(updatedItems);
            console.log(`The Delivery ${idDelivery} has been rescheduled`)
        }
        return delivery;
    }

    async findAllItemsForDelivery(idDelivery: number) : Promise<DeliveryItem[]> {
        return await this.deliveryItemService.findAllDeliveriesItemsForDelivery(idDelivery);
    }
}