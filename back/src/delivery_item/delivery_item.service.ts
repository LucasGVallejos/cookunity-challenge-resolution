import { Inject, Service } from "typedi";
import { DeliveryItem } from "./delivery_item.entity";
import { DeliveryItemRepositoryInterface } from "./interfaces/delivery_item.repository.interface";
import { ProductService } from "../product/product.service";
import { Product } from "../product/product.entity";
import { DeliveryService } from "../delivery/delivery.service";
import { Delivery } from "../delivery/delivery.entity";

@Service('delivery_item-service')
export class DeliveryItemService {

    constructor(
        @Inject('delivery_item-repository') private readonly deliveryItemRepository: DeliveryItemRepositoryInterface,
        @Inject('product-service') private readonly productService: ProductService,
    ) {}

    async findAllDeliveriesItemsForDelivery(idDelivery: number) : Promise<DeliveryItem[]> {
        return await this.deliveryItemRepository.findByCondition({
            relations: { deliveryConnection: true , productConnection: true},
            where: { deliveryConnection: { id: idDelivery } },
        });
    }

    async findAllDeliveriesItems() : Promise<DeliveryItem[]> {
        return await this.deliveryItemRepository.findAll();
    }

    async updateDeliveriesItems(items: DeliveryItem[]) : Promise<DeliveryItem[]> {
        return await this.deliveryItemRepository.bulkUpdate(items);
    }

    //#region ResolveProperty methods
    async findProduct(delivery_item: DeliveryItem): Promise<Product | null> {
        return await this.productService.findProductById(delivery_item.productId);
    }

    //#endregion
}