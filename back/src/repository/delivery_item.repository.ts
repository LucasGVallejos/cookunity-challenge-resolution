import { Service } from "typedi";
import { BaseAbstractRepository } from "./base/base.abstract.repository";
import { DeliveryItem } from "../delivery_item/delivery_item.entity";
import { Repository } from "typeorm";
import { DeliveryItemRepositoryInterface } from "../delivery_item/interfaces/delivery_item.repository.interface";

@Service('delivery_item-repository')
export class DeliveryItemRepository extends BaseAbstractRepository<DeliveryItem> implements DeliveryItemRepositoryInterface {

    constructor(private readonly deliveryItemsRepository: Repository<DeliveryItem>,
    ) {
        super(deliveryItemsRepository);
    }
}