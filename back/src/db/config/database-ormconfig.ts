import { DataSource, DataSourceOptions } from 'typeorm';
import { Product } from '../../product/product.entity';
import { Delivery } from '../../delivery/delivery.entity';
import { DeliveryItem } from '../../delivery_item/delivery_item.entity';
import dotenv from "dotenv";

//TODO: Create a config module where I can import the ENV variables
dotenv.config();

const {
    POSTGRES_USER,
    POSTGRES_DB,
    POSTGRES_PASSWORD,
} = process.env;

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    entities: [Product, Delivery, DeliveryItem],
    migrations: ['dist/db/migrations/*.js'],
    synchronize: false,
    logging: true,
}

const datasource = new DataSource(dataSourceOptions)
export default datasource;
