import { Inject, Service } from 'typedi';
import { Product } from './product.entity';
import { ProductRepositoryInterface } from './interfaces/product.repository.interface';

@Service('product-service')
export class ProductService {
    constructor(@Inject('product-repository') private readonly productRepository: ProductRepositoryInterface) {}

    async findProductById(idProduct: number): Promise<Product | null> {
        return await this.productRepository.findOneByCondition({ where: { id: idProduct } });
    }

    async findAllProducts(): Promise<Product[]> {
        return await this.productRepository.findAll();
    }
}
