import { Query, Resolver, Arg } from "type-graphql";
import { Inject, Service } from "typedi";
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Service()
@Resolver(() => Product)
export class ProductResolver {
    constructor(@Inject('product-service') private readonly productService: ProductService) {}

    @Query(() => [Product], { name: 'findAllProducts' })
    public async products(): Promise<Product[]> {
        return await this.productService.findAllProducts();
    }

    @Query(() => Product, { name: 'findProductById' })
    public async product(@Arg('id') id: number): Promise<Product | null> {
        return await this.productService.findProductById(id);
    }
}
