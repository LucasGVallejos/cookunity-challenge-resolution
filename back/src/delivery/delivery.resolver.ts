import { Arg, Mutation, Query, Resolver, FieldResolver, Root } from "type-graphql";
import { Delivery } from "./delivery.entity";
import { Inject, Service } from "typedi";
import { DeliveryService } from "./delivery.service";
import { ConfirmDeliveryInput } from "./dtos/confirm-delivery.input";
import { RescheduleDeliveryInput } from "./dtos/reschedule-delivery.input";
import { DeliveryItem } from "../delivery_item/delivery_item.entity";

@Service()
@Resolver(()=> Delivery)
export class DeliveryResolver {
    constructor(@Inject('delivery-service') private readonly deliveryService: DeliveryService) {}

    @Query(()=> [Delivery], {name: 'findAllDeliveries'})
    public async deliveries(): Promise<Delivery[]> {
        return await this.deliveryService.findAllDeliveries();
    }

    @Query(()=> Delivery, {name: 'findDeliveryById'})
    public async delivery(@Arg('id') id: number): Promise<Delivery | null> {
        return await this.deliveryService.findDeliveryById(id);
    }
    
    @Mutation(()=> Delivery, {name: 'confirmDelivery'})
    public async confirmDelivery(@Arg('data') input: ConfirmDeliveryInput) : Promise<Delivery | null> {
        return await this.deliveryService.confirmDelivery(input.idDelivery);
    }

    @Mutation(()=> Delivery, {name: 'rescheduleDelivery'})
    public async rescheduleDelivery(@Arg('data') input: RescheduleDeliveryInput) : Promise<Delivery | null> {
        return await this.deliveryService.rescheduleDelivery(input.idDelivery, input.rescheduledDate);
    }

    @FieldResolver()
    public async items(@Root() delivery: Delivery): Promise<DeliveryItem[]> {
        return await this.deliveryService.findAllItemsForDelivery(delivery.id);
    }
}