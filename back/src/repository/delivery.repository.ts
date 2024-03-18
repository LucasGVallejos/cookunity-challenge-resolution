import { Service } from "typedi";
import { BaseAbstractRepository } from "./base/base.abstract.repository";
import { Delivery } from "../delivery/delivery.entity";
import { Repository } from "typeorm";
import { DeliveryRepositoryInterface } from "../delivery/interfaces/delivery.repository.interface";

@Service('delivery-repository')
export class DeliveryRepository extends BaseAbstractRepository<Delivery> implements DeliveryRepositoryInterface {

    constructor(private readonly deliveriesRepository: Repository<Delivery>,
    ) {
        super(deliveriesRepository);
    }
}