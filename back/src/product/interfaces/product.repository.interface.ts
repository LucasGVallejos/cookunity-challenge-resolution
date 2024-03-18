import { Product } from '../product.entity';
import { BaseInterfaceRepository } from '../../repository/base/base.interface.repository';

export interface ProductRepositoryInterface extends BaseInterfaceRepository<Product> {
}