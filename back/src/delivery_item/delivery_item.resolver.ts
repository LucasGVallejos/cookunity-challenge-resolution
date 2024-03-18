import { Arg, Args, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";
import { DeliveryItem } from "./delivery_item.entity";
import { DeliveryItemService } from "./delivery_item.service";
import { Product } from "../product/product.entity";
import { Delivery } from "../delivery/delivery.entity";

@Service()
@Resolver(()=> DeliveryItem)
export class DeliveryItemResolver {
    constructor(@Inject('delivery_item-service') private readonly deliveryItemService: DeliveryItemService) {}

    @Query(()=> [DeliveryItem], {name: 'findAllDeliveriesItems'})
    public async deliveriesItem(): Promise<DeliveryItem[]> {
        return await this.deliveryItemService.findAllDeliveriesItems();
    }

    @Query(()=> [DeliveryItem], {name: 'findAllDeliveriesItemsForDelivery'})
    public async deliveriesItemsForDelivery(@Arg('id') id:number): Promise<DeliveryItem[]>{
        return await this.deliveryItemService.findAllDeliveriesItemsForDelivery(id);
    }

    @FieldResolver()
    public async product(@Root() product: DeliveryItem): Promise<Product | null> {
        return await this.deliveryItemService.findProduct(product);
    }
}