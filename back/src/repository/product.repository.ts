import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Repository } from 'typeorm';
import { Product } from '../product/product.entity';
import { ProductRepositoryInterface } from '../product/interfaces/product.repository.interface';
import { Service } from 'typedi';

@Service('product-repository')
export class ProductRepository extends BaseAbstractRepository<Product> implements ProductRepositoryInterface {

    constructor(private readonly productsRepository: Repository<Product>,
    ) {
        super(productsRepository);
    }
}